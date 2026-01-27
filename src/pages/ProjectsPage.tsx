import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Building, MapPin, Home, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  description: string | null;
  status: string;
  images: string[];
  created_at: string;
}

interface FlatStats {
  project_id: string;
  total: number;
  available: number;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [flatStats, setFlatStats] = useState<Record<string, FlatStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data: projectsData, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && projectsData) {
      setProjects(projectsData);
      
      // Fetch flat stats for each project
      const { data: flatsData } = await supabase
        .from("flats")
        .select("project_id, status");
      
      if (flatsData) {
        const stats: Record<string, FlatStats> = {};
        flatsData.forEach(flat => {
          if (!stats[flat.project_id]) {
            stats[flat.project_id] = { project_id: flat.project_id, total: 0, available: 0 };
          }
          stats[flat.project_id].total++;
          if (flat.status === "available") {
            stats[flat.project_id].available++;
          }
        });
        setFlatStats(stats);
      }
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-widest uppercase mb-4">
                Our Work
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Our Projects
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our portfolio of quality residential and commercial developments.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No projects available yet.</p>
                <p className="text-muted-foreground">Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project) => {
                  const stats = flatStats[project.id];
                  return (
                    <Link
                      to={`/projects/${project.id}`}
                      key={project.id}
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {project.images.length > 0 ? (
                        <img
                          src={project.images[0]}
                          alt={project.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <Building className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-display font-bold text-xl text-foreground group-hover:text-gold transition-colors">
                            {project.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                        {project.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {project.description}
                          </p>
                        )}
                        
                        {/* Flat Availability Info */}
                        {stats && stats.total > 0 && (
                          <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-1.5">
                              <Home className="w-4 h-4 text-gold" />
                              <span className="text-sm text-foreground font-medium">{stats.total} Flats</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                              <span className="text-sm text-muted-foreground">{stats.available} Available</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-gold text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
