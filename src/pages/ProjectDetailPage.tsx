import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Building, MapPin, ArrowLeft, Home, Maximize, IndianRupee, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  location: string;
  description: string | null;
  status: string;
  images: string[];
}

interface Flat {
  id: string;
  flat_number: string;
  floor_number: number | null;
  configuration: string;
  carpet_area: number | null;
  price: number | null;
  status: string;
  amenities: string[] | null;
}

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filterConfig, setFilterConfig] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    const [projectRes, flatsRes] = await Promise.all([
      supabase.from("projects").select("*").eq("id", id).maybeSingle(),
      supabase.from("flats").select("*").eq("project_id", id).order("floor_number", { ascending: true }).order("flat_number", { ascending: true })
    ]);

    if (projectRes.data) {
      setProject(projectRes.data);
      setSelectedImage(projectRes.data.images?.[0] || null);
    }
    if (flatsRes.data) {
      setFlats(flatsRes.data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "sold":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "reserved":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "sold":
        return "bg-red-100 text-red-800 border-red-200";
      case "reserved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "On Request";
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const configurations = [...new Set(flats.map(f => f.configuration))];
  
  const filteredFlats = flats.filter(flat => {
    const matchesConfig = filterConfig === "all" || flat.configuration === filterConfig;
    const matchesStatus = filterStatus === "all" || flat.status === filterStatus;
    return matchesConfig && matchesStatus;
  });

  const stats = {
    total: flats.length,
    available: flats.filter(f => f.status === "available").length,
    sold: flats.filter(f => f.status === "sold").length,
    reserved: flats.filter(f => f.status === "reserved").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <Building className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg mb-4">Project not found</p>
          <Link to="/projects" className="text-gold hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                {selectedImage ? (
                  <img src={selectedImage} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === img ? "border-gold" : "border-transparent hover:border-gold/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div>
              <Badge className={`mb-4 capitalize ${
                project.status === "completed" ? "bg-green-100 text-green-800" :
                project.status === "ongoing" ? "bg-yellow-100 text-yellow-800" :
                "bg-blue-100 text-blue-800"
              }`}>
                {project.status}
              </Badge>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-lg">{project.location}</span>
              </div>
              {project.description && (
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
              )}

              {/* Quick Stats */}
              {flats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Flats</p>
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
            </div>
          </div>

          {/* Flats Section */}
          {flats.length > 0 ? (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Flat Availability
                </h2>
                <div className="flex flex-wrap gap-3">
                  <select
                    value={filterConfig}
                    onChange={(e) => setFilterConfig(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Configurations</option>
                    {configurations.map(config => (
                      <option key={config} value={config}>{config}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFlats.map((flat) => (
                  <div
                    key={flat.id}
                    className={`bg-card border rounded-xl p-5 transition-all hover:shadow-md ${
                      flat.status === "available" ? "border-green-200 hover:border-green-400" :
                      flat.status === "sold" ? "border-red-200 opacity-75" :
                      "border-yellow-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{flat.flat_number}</h3>
                        {flat.floor_number !== null && (
                          <p className="text-sm text-muted-foreground">Floor {flat.floor_number}</p>
                        )}
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(flat.status)}`}>
                        {getStatusIcon(flat.status)}
                        {flat.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Home className="w-4 h-4 text-gold" />
                        <span className="text-foreground font-medium">{flat.configuration}</span>
                      </div>
                      {flat.carpet_area && (
                        <div className="flex items-center gap-2 text-sm">
                          <Maximize className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{flat.carpet_area} sq.ft</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="w-4 h-4 text-gold" />
                        <span className="text-foreground font-bold">{formatPrice(flat.price)}</span>
                      </div>
                    </div>

                    {flat.amenities && flat.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {flat.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {amenity}
                          </span>
                        ))}
                        {flat.amenities.length > 3 && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            +{flat.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFlats.length === 0 && (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">No flats match your filters.</p>
                </div>
              )}
            </section>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Flat details coming soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
