import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Home,
  Save,
  Building
} from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface Flat {
  id: string;
  project_id: string;
  flat_number: string;
  floor_number: number | null;
  configuration: string;
  carpet_area: number | null;
  price: number | null;
  status: string;
  amenities: string[] | null;
}

interface FlatForm {
  flat_number: string;
  floor_number: string;
  configuration: string;
  carpet_area: string;
  price: string;
  status: string;
  amenities: string;
}

const initialForm: FlatForm = {
  flat_number: "",
  floor_number: "",
  configuration: "2 BHK",
  carpet_area: "",
  price: "",
  status: "available",
  amenities: "",
};

const FlatManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingFlat, setEditingFlat] = useState<string | null>(null);
  const [form, setForm] = useState<FlatForm>(initialForm);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchFlats();
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("id, name")
      .order("created_at", { ascending: false });
    if (data) {
      setProjects(data);
      if (data.length > 0) {
        setSelectedProject(data[0].id);
      }
    }
  };

  const fetchFlats = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("flats")
      .select("*")
      .eq("project_id", selectedProject)
      .order("floor_number", { ascending: true })
      .order("flat_number", { ascending: true });
    if (data) setFlats(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const flatData = {
      project_id: selectedProject,
      flat_number: form.flat_number,
      floor_number: form.floor_number ? parseInt(form.floor_number) : null,
      configuration: form.configuration,
      carpet_area: form.carpet_area ? parseFloat(form.carpet_area) : null,
      price: form.price ? parseFloat(form.price) : null,
      status: form.status,
      amenities: form.amenities ? form.amenities.split(",").map(a => a.trim()).filter(Boolean) : null,
    };

    let error;
    if (editingFlat) {
      const result = await supabase.from("flats").update(flatData).eq("id", editingFlat);
      error = result.error;
    } else {
      const result = await supabase.from("flats").insert(flatData);
      error = result.error;
    }

    if (error) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to save flat", 
        variant: "destructive" 
      });
    } else {
      toast({ 
        title: "Success", 
        description: editingFlat ? "Flat updated successfully" : "Flat added successfully" 
      });
      resetForm();
      fetchFlats();
    }
  };

  const handleEdit = (flat: Flat) => {
    setForm({
      flat_number: flat.flat_number,
      floor_number: flat.floor_number?.toString() || "",
      configuration: flat.configuration,
      carpet_area: flat.carpet_area?.toString() || "",
      price: flat.price?.toString() || "",
      status: flat.status,
      amenities: flat.amenities?.join(", ") || "",
    });
    setEditingFlat(flat.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flat?")) return;
    
    const { error } = await supabase.from("flats").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted", description: "Flat deleted successfully" });
      fetchFlats();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from("flats").update({ status }).eq("id", id);
    if (!error) {
      toast({ title: "Updated", description: `Status changed to ${status}` });
      fetchFlats();
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingFlat(null);
    setShowForm(false);
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "-";
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "sold": return "bg-red-100 text-red-800";
      case "reserved": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: flats.length,
    available: flats.filter(f => f.status === "available").length,
    sold: flats.filter(f => f.status === "sold").length,
    reserved: flats.filter(f => f.status === "reserved").length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Manage Flats</h2>
        <div className="flex gap-3">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <Button variant="hero" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Flat
          </Button>
        </div>
      </div>

      {/* Stats */}
      {flats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.available}</p>
            <p className="text-sm text-green-600">Available</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{stats.sold}</p>
            <p className="text-sm text-red-600">Sold</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.reserved}</p>
            <p className="text-sm text-yellow-600">Reserved</p>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-card p-6 rounded-2xl border border-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              {editingFlat ? "Edit Flat" : "Add New Flat"}
            </h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Flat Number *</label>
                <Input
                  value={form.flat_number}
                  onChange={(e) => setForm({ ...form, flat_number: e.target.value })}
                  placeholder="e.g., A-101"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Floor Number</label>
                <Input
                  type="number"
                  value={form.floor_number}
                  onChange={(e) => setForm({ ...form, floor_number: e.target.value })}
                  placeholder="e.g., 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Configuration *</label>
                <select
                  value={form.configuration}
                  onChange={(e) => setForm({ ...form, configuration: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="1 RK">1 RK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Shop">Shop</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Carpet Area (sq.ft)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.carpet_area}
                  onChange={(e) => setForm({ ...form, carpet_area: e.target.value })}
                  placeholder="e.g., 650"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price (₹)</label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g., 4500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Amenities (comma separated)</label>
              <Input
                value={form.amenities}
                onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                placeholder="e.g., Balcony, Parking, Garden View"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="hero">
                <Save className="w-4 h-4 mr-2" />
                {editingFlat ? "Update Flat" : "Add Flat"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Flats List */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Create a project first to add flats.</p>
        </div>
      ) : loading ? (
        <p className="text-muted-foreground text-center py-10">Loading flats...</p>
      ) : flats.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No flats added yet for this project.</p>
          <p className="text-sm text-muted-foreground mt-1">Click "Add Flat" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 text-sm font-medium text-foreground">Flat No.</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Floor</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Type</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Area</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Price</th>
                <th className="text-left p-3 text-sm font-medium text-foreground">Status</th>
                <th className="text-right p-3 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
                <tr key={flat.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-3 font-medium text-foreground">{flat.flat_number}</td>
                  <td className="p-3 text-muted-foreground">{flat.floor_number ?? "-"}</td>
                  <td className="p-3 text-foreground">{flat.configuration}</td>
                  <td className="p-3 text-muted-foreground">{flat.carpet_area ? `${flat.carpet_area} sq.ft` : "-"}</td>
                  <td className="p-3 font-medium text-foreground">{formatPrice(flat.price)}</td>
                  <td className="p-3">
                    <select
                      value={flat.status}
                      onChange={(e) => handleStatusChange(flat.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(flat.status)}`}
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(flat)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(flat.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlatManagement;
