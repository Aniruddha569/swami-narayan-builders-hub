import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-gold">
                <img src={logo} alt="Swami Narayan Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-cream">Swami Narayan</h3>
                <p className="text-sm text-cream/60 tracking-wider uppercase">Developers</p>
              </div>
            </div>
            <p className="text-cream/70 max-w-md mb-6 leading-relaxed">{t("footer.desc")}</p>
            <p className="text-gold font-display text-lg italic">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t("footer.quick_links")}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-cream/70 hover:text-gold transition-colors">{t("nav.home")}</Link></li>
              <li><Link to="/about" className="text-cream/70 hover:text-gold transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/vision" className="text-cream/70 hover:text-gold transition-colors">{t("nav.vision")}</Link></li>
              <li><Link to="/projects" className="text-cream/70 hover:text-gold transition-colors">{t("nav.projects")}</Link></li>
              <li><Link to="/reviews" className="text-cream/70 hover:text-gold transition-colors">{t("nav.reviews")}</Link></li>
              <li><Link to="/emi-calculator" className="text-cream/70 hover:text-gold transition-colors">{t("nav.emi")}</Link></li>
              <li><Link to="/contact" className="text-cream/70 hover:text-gold transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{t("footer.contact_info")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">Swami Krupa Heights, Shop No. 2, Nisarg Nagar, Dindori Road, Nashik – 422004</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:9890401000" className="text-cream/70 text-sm hover:text-gold transition-colors">9890401000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:swaminarayanbuilders@gmail.com" className="text-cream/70 text-sm hover:text-gold transition-colors break-all">swaminarayanbuilders@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="text-cream/50 text-sm">© {currentYear} Swami Narayan Developers. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
