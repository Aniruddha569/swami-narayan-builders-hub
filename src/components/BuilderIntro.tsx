import { motion } from "framer-motion";
import { Award, Building, Users, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import awardCeremony from "@/assets/plots/award-ceremony.jpeg";

const BuilderIntro = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Building, label: t("builder.h1"), desc: t("builder.h1d") },
    { icon: Users, label: t("builder.h2"), desc: t("builder.h2d") },
    { icon: Award, label: t("builder.h3"), desc: t("builder.h3d") },
    { icon: Handshake, label: t("builder.h4"), desc: t("builder.h4d") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={awardCeremony} alt="Swami Narayan Developers Award Ceremony" className="w-full h-80 md:h-96 object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
              {t("builder.since")}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-accent font-medium tracking-widest uppercase mb-3 text-sm">{t("builder.subtitle")}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("builder.title")}</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">{t("builder.p1")}</p>
            <p className="text-muted-foreground mb-6 leading-relaxed">{t("builder.p2")}</p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <h.icon className="w-4 h-4 text-accent" />
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
