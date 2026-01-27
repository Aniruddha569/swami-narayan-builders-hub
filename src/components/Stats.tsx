import { Building, Users, Award, Calendar } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: Building,
    value: "25+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: "500+",
    label: "Happy Families",
  },
  {
    icon: Award,
    value: "15+",
    label: "Awards Won",
  },
];

const Stats = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-full mb-3">
                <stat.icon className="w-6 h-6 text-gold" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-cream mb-1">
                {stat.value}
              </div>
              <div className="text-cream/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
