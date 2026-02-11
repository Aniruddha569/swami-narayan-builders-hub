import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import swamiRowHouse from "@/assets/ongoing/swami-row-house.jpeg";
import swamiSamarthaBunglow from "@/assets/ongoing/swami-samartha-bunglow.jpeg";
import rowHouseConstruction from "@/assets/ongoing/row-house-construction.jpeg";
import buildingFrame from "@/assets/ongoing/building-frame.jpeg";
import buildingPlastering from "@/assets/ongoing/building-plastering.jpeg";
import towerConstruction from "@/assets/ongoing/tower-construction.jpeg";
import towerScaffolding from "@/assets/ongoing/tower-scaffolding.jpeg";
import buildingFacade from "@/assets/ongoing/building-facade.jpeg";

const ongoingProjects = [
  { src: swamiRowHouse, title: "Swami Row House", description: "Premium row house project" },
  { src: swamiSamarthaBunglow, title: "Swami Samartha Twin Bunglow", description: "Luxurious twin bungalow" },
  { src: rowHouseConstruction, title: "Row House - Under Construction", description: "Progress update" },
  { src: buildingFrame, title: "Commercial Complex - Structure", description: "Structural work in progress" },
  { src: buildingPlastering, title: "Row House - Plastering Phase", description: "Finishing stage" },
  { src: towerConstruction, title: "Residential Tower", description: "Multi-storey construction" },
  { src: towerScaffolding, title: "High-Rise Development", description: "Scaffolding & finishing" },
  { src: buildingFacade, title: "Residential Building", description: "Facade work in progress" },
];

const OngoingProjects = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">
            Work In Progress
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ongoing Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our ongoing developments and construction progress
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {ongoingProjects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-cream text-sm font-semibold truncate">{project.title}</h3>
                <p className="text-cream/70 text-xs truncate">{project.description}</p>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-gold/90 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  Ongoing
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View All Projects
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
