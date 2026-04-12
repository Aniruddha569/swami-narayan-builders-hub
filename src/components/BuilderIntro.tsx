import { motion } from "framer-motion";
import { Award, Building, Users, Handshake } from "lucide-react";
import awardCeremony from "@/assets/plots/award-ceremony.jpeg";

const highlights = [
  { icon: Building, label: "25+ प्रकल्प पूर्ण", desc: "निवासी आणि व्यावसायिक" },
  { icon: Users, label: "500+ खुश कुटुंबे", desc: "विश्वासू ग्राहक" },
  { icon: Award, label: "10+ वर्षांचा अनुभव", desc: "2015 पासून कार्यरत" },
  { icon: Handshake, label: "पारदर्शक व्यवहार", desc: "RERA रजिस्टर्ड" },
];

const BuilderIntro = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={awardCeremony}
                alt="Swami Narayan Developers Award Ceremony"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
              🏆 २०१५ पासून कार्यरत
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-medium tracking-widest uppercase mb-3 text-sm">
              आमच्याबद्दल
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              स्वामी नारायण डेव्हलपर्स
            </h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              श्री. नितीन सुधाकर भामरे यांनी २०१५ मध्ये स्थापन केलेली स्वामी नारायण डेव्हलपर्स ही नाशिकमधील एक अग्रणी बांधकाम कंपनी आहे.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              दर्जेदार बांधकाम, वेळेवर डिलिव्हरी आणि ग्राहकांचा विश्वास — या तीन स्तंभांवर आमचा व्यवसाय उभा आहे. आम्ही रेसिडेन्शियल, कमर्शिअल आणि N.A. प्लॉट प्रकल्पांमध्ये विशेष कार्यरत आहोत.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50"
                >
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <h.icon className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{h.label}</p>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuilderIntro;
