import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-cream/80 max-w-xl mx-auto mb-8">
          Contact us today for a free consultation and site visit
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:9890401000">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto group">
              Get In Touch
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
