import { Shield, Clock, BadgeCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t("why.f1.title"), description: t("why.f1.desc") },
    { icon: Clock, title: t("why.f2.title"), description: t("why.f2.desc") },
    { icon: BadgeCheck, title: t("why.f3.title"), description: t("why.f3.desc") },
    { icon: HeartHandshake, title: t("why.f4.title"), description: t("why.f4.desc") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">{t("why.subtitle")}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t("why.title")}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/10 rounded-full mb-4">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
