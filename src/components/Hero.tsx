import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-building.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold font-medium tracking-widest uppercase mb-3 text-sm animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Since 2015 • Nashik, Maharashtra
          </p>
          
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream mb-5 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Building Dreams,{" "}
            <span className="text-gradient-gold">Creating Homes</span>
          </h1>
          
          <p className="text-cream/80 text-base md:text-lg max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Quality residential and commercial projects built with trust, 
            transparency, and commitment to excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/projects">
              <Button variant="hero" size="lg">
                Explore Projects
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-cream/50" />
      </div>
    </section>
  );
};

export default Hero;
