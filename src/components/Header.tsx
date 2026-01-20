import { Phone, Mail, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6 flex-wrap">
            <a href="tel:9890401000" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>9890401000</span>
            </a>
            <a href="mailto:swaminarayanbuilders@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">swaminarayanbuilders@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center shadow-gold">
              <span className="text-primary font-display font-bold text-xl">SN</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                Swami Narayan
              </h1>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">Developers</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-gold font-medium transition-colors">Home</a>
            <a href="#about" className="text-foreground hover:text-gold font-medium transition-colors">About</a>
            <a href="#vision" className="text-foreground hover:text-gold font-medium transition-colors">Vision</a>
            <a href="#contact" className="text-foreground hover:text-gold font-medium transition-colors">Contact</a>
            <Button variant="hero" size="lg">
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#home" className="text-foreground hover:text-gold font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#about" className="text-foreground hover:text-gold font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#vision" className="text-foreground hover:text-gold font-medium py-2" onClick={() => setIsMenuOpen(false)}>Vision</a>
              <a href="#contact" className="text-foreground hover:text-gold font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <Button variant="hero" className="w-full">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
