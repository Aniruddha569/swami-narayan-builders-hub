import { Button } from "./ui/button";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent font-semibold px-5 py-2 rounded-full text-sm mb-6"
          >
            <MapPin className="w-4 h-4" />
            २०१५ पासून • नाशिक, महाराष्ट्र
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 leading-tight"
          >
            स्वामी नारायण डेव्हलपर्स
            <br />
            <span className="text-gradient-gold">तुमच्या स्वप्नांचे घर</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-cream/80 text-base md:text-lg max-w-2xl mx-auto mb-3"
          >
            श्री. नितीन सुधाकर भामरे यांच्या नेतृत्वाखाली, नाशिकमध्ये दर्जेदार
            निवासी आणि व्यावसायिक प्रकल्प — विश्वास, पारदर्शकता आणि उत्कृष्टतेसह.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 text-cream/60 text-sm mb-8"
          >
            <span className="flex items-center gap-1.5">
              ✅ RERA रजिस्टर्ड
            </span>
            <span className="w-1 h-1 bg-cream/30 rounded-full" />
            <span className="flex items-center gap-1.5">
              🏗️ 25+ प्रकल्प पूर्ण
            </span>
            <span className="w-1 h-1 bg-cream/30 rounded-full" />
            <span className="flex items-center gap-1.5">
              👨‍👩‍👧‍👦 500+ खुश कुटुंबे
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/projects">
              <Button variant="hero" size="lg">
                प्रकल्प पहा
              </Button>
            </Link>
            <a href="tel:9890401000">
              <Button variant="heroOutline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                संपर्क करा
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-cream/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
