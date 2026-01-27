import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MessageSquare, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  X,
  Upload,
  Home,
  LayoutGrid
} from "lucide-react";
import FlatManagement from "@/components/admin/FlatManagement";

interface Project {
  id: string;
  name: string;
  location: string;
  description: string | null;
  status: string;
  images: string[];
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  is_approved: boolean;
  created_at: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

type Tab = "projects" | "flats" | "reviews" | "enquiries";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    location: "",
    description: "",
    status: "ongoing",
    images: [] as string[],
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, activeTab]);

  const fetchData = async () => {
    if (activeTab === "projects") {
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (data) setProjects(data);
    } else if (activeTab === "reviews") {
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (data) setReviews(data);
    } else if (activeTab === "enquiries") {
      const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
      if (data) setEnquiries(data);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error } = await supabase.storage.from("project-images").upload(fileName, file);

      if (!error) {
        const { data } = supabase.storage.from("project-images").getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }
    }

    setProjectForm({ ...projectForm, images: [...projectForm.images, ...uploadedUrls] });
    setUploading(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from("projects").insert({
      name: projectForm.name,
      location: projectForm.location,
      description: projectForm.description || null,
      status: projectForm.status,
      images: projectForm.images,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to add project", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project added successfully" });
      setProjectForm({ name: "", location: "", description: "", status: "ongoing", images: [] });
      setShowProjectForm(false);
      fetchData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted", description: "Project deleted successfully" });
      fetchData();
    }
  };

  const handleApproveReview = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
    if (!error) {
      toast({ title: approved ? "Approved" : "Rejected", description: `Review ${approved ? "approved" : "rejected"}` });
      fetchData();
    }
  };

  const handleDeleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted", description: "Review deleted successfully" });
      fetchData();
    }
  };

  const handleMarkEnquiryRead = async (id: string) => {
    await supabase.from("enquiries").update({ is_read: true }).eq("id", id);
    fetchData();
  };

  const handleDeleteEnquiry = async (id: string) => {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted", description: "Enquiry deleted successfully" });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">You don't have admin access.</p>
          <p className="text-sm text-muted-foreground mb-4">Contact the administrator to get admin access.</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center shadow-gold">
              <span className="text-primary font-display font-bold">SN</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Swami Narayan Developers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
              activeTab === "projects" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="hidden sm:inline">Projects</span>
          </button>
          <button
            onClick={() => setActiveTab("flats")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
              activeTab === "flats" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="hidden sm:inline">Flats</span>
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
              activeTab === "reviews" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="hidden sm:inline">Reviews</span>
            {reviews.filter(r => !r.is_approved).length > 0 && (
              <span className="bg-gold text-primary text-xs rounded-full px-2 py-0.5">
                {reviews.filter(r => !r.is_approved).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
              activeTab === "enquiries" ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">Enquiries</span>
            {enquiries.filter(e => !e.is_read).length > 0 && (
              <span className="bg-gold text-primary text-xs rounded-full px-2 py-0.5">
                {enquiries.filter(e => !e.is_read).length}
              </span>
            )}
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">Manage Projects</h2>
              <Button variant="hero" onClick={() => setShowProjectForm(!showProjectForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {showProjectForm && (
              <div className="bg-card p-6 rounded-2xl border border-border mb-8">
                <h3 className="font-semibold text-foreground mb-4">Add New Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Project Name</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                      <input
                        type="text"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                      <select
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Images</label>
                      <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>{uploading ? "Uploading..." : "Upload Images"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                  {projectForm.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {projectForm.images.map((url, index) => (
                        <img key={index} src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button type="submit" variant="hero">Save Project</Button>
                    <Button type="button" variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            )}

            {projects.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No projects yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-card p-4 rounded-xl border border-border">
                    {project.images.length > 0 && (
                      <img src={project.images[0]} alt={project.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    )}
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gold/20 text-gold capitalize">
                      {project.status}
                    </span>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flats Tab */}
        {activeTab === "flats" && <FlatManagement />}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Manage Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className={`bg-card p-4 rounded-xl border ${review.is_approved ? "border-border" : "border-gold"}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{review.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${review.is_approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {review.is_approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.email}</p>
                        <div className="flex gap-0.5 my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= review.rating ? "text-gold" : "text-muted"}>★</span>
                          ))}
                        </div>
                        <p className="text-foreground">{review.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        {!review.is_approved && (
                          <Button variant="outline" size="sm" onClick={() => handleApproveReview(review.id, true)}>
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                        {review.is_approved && (
                          <Button variant="outline" size="sm" onClick={() => handleApproveReview(review.id, false)}>
                            <X className="w-4 h-4 text-yellow-600" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Customer Enquiries</h2>
            {enquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-10">No enquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enquiry) => (
                  <div 
                    key={enquiry.id} 
                    className={`bg-card p-4 rounded-xl border ${enquiry.is_read ? "border-border" : "border-gold"}`}
                    onClick={() => !enquiry.is_read && handleMarkEnquiryRead(enquiry.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{enquiry.name}</h3>
                          {!enquiry.is_read && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gold text-primary">New</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{enquiry.email}</p>
                        {enquiry.phone && <p className="text-sm text-muted-foreground">{enquiry.phone}</p>}
                        <p className="text-foreground mt-2">{enquiry.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteEnquiry(enquiry.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
