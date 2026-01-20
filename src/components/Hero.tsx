import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-building.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold font-medium tracking-widest uppercase mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Since 2015 • Nashik, Maharashtra
          </p>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Turning Land into{" "}
            <span className="text-gradient-gold">Landmarks</span>
          </h1>
          
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Quality residential and commercial projects with a strong focus on durability, 
            transparency, and customer satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/projects">
              <Button variant="hero" size="xl">
                Explore Our Projects
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link to="/about" className="text-cream/60 hover:text-cream transition-colors">
          <ChevronDown className="w-8 h-8" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
