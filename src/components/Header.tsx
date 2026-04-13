import { Phone, Mail, Clock, Menu, X, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/vision", label: t("nav.vision") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/reviews", label: t("nav.reviews") },
    { href: "/emi-calculator", label: t("nav.emi") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href: string) => location.pathname === href;

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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-gold">
              <img src={logo} alt="Swami Narayan Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                Swami Narayan
              </h1>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">Developers</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium text-sm transition-colors ${
                  isActive(link.href) ? "text-gold" : "text-foreground hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to={user ? "/admin" : "/auth"}>
              <Button variant="hero" size="sm">
                {user ? (
                  <>
                    <User className="w-4 h-4 mr-1" />
                    {t("nav.dashboard")}
                  </>
                ) : (
                  t("nav.login")
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium py-2 ${
                    isActive(link.href) ? "text-gold" : "text-foreground hover:text-gold"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to={user ? "/admin" : "/auth"} onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  {user ? t("nav.dashboard") : t("nav.login")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
