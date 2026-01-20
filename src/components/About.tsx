import { Award, Users, Building, Calendar } from "lucide-react";

const stats = [
  { icon: Calendar, value: "2015", label: "Established" },
  { icon: Building, value: "10+", label: "Projects" },
  { icon: Users, value: "500+", label: "Happy Families" },
  { icon: Award, value: "100%", label: "Quality Focus" },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <p className="text-gold font-medium tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Building Dreams,{" "}
              <span className="text-gradient-gold">Creating Value</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Swami Narayan Builders is a trusted real estate and construction company 
              founded by <strong className="text-foreground">Mr. Nitin Sudhakar Bhamare</strong>. 
              The company is known for delivering quality residential and commercial projects 
              with a strong focus on durability, transparency, and customer satisfaction.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              With a belief in ethical practices and timely project completion, 
              Swami Narayan Builders aims to create spaces that offer comfort, 
              safety, and long-term value for all our customers.
            </p>
            
            {/* Signature */}
            <div className="flex items-center gap-4 border-l-4 border-gold pl-4">
              <div>
                <p className="font-display font-bold text-foreground text-lg">
                  Mr. Nitin Sudhakar Bhamare
                </p>
                <p className="text-muted-foreground">Founder & Builder</p>
              </div>
            </div>
          </div>
          
          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-border group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-gold">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
