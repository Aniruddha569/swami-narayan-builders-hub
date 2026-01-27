import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import swamikrupaHeights from "@/assets/gallery/swamikrupa-heights.jpeg";
import buildingRender1 from "@/assets/gallery/building-render-1.jpeg";

const projects = [
  {
    id: 1,
    name: "Swamikrupa Heights",
    location: "Nashik",
    status: "completed",
    image: swamikrupaHeights,
    description: "Premium 2 & 3 BHK apartments with modern amenities",
  },
  {
    id: 2,
    name: "Swami Raj Heights",
    location: "Nashik",
    status: "ongoing",
    image: buildingRender1,
    description: "Commercial & residential mixed-use development",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">
            Featured
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quality construction with attention to every detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    project.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects">
            <Button variant="outline" size="lg" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
