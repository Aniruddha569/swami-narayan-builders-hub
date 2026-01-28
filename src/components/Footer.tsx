import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-gold">
                <img src={logo} alt="Swami Narayan Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-cream">
                  Swami Narayan
                </h3>
                <p className="text-sm text-cream/60 tracking-wider uppercase">Developers</p>
              </div>
            </div>
            <p className="text-cream/70 max-w-md mb-6 leading-relaxed">
              Turning Land into Landmarks since 2015. We build quality residential 
              and commercial projects with a focus on durability, transparency, 
              and customer satisfaction.
            </p>
            <p className="text-gold font-display text-lg italic">
              "Turning Land into Landmarks"
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-cream/70 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/70 hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/vision" className="text-cream/70 hover:text-gold transition-colors">Vision & Mission</Link>
              </li>
              <li>
                <Link to="/projects" className="text-cream/70 hover:text-gold transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-cream/70 hover:text-gold transition-colors">Reviews</Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/70 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Swami Krupa Heights, Shop No. 2, Nisarg Nagar, Dindori Road, Nashik – 422004
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:9890401000" className="text-cream/70 text-sm hover:text-gold transition-colors">
                  9890401000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:swaminarayanbuilders@gmail.com" className="text-cream/70 text-sm hover:text-gold transition-colors break-all">
                  swaminarayanbuilders@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="text-cream/50 text-sm">
            © {currentYear} Swami Narayan Developers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
