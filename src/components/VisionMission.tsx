import { Eye, Target, CheckCircle } from "lucide-react";

const missionPoints = [
  "To provide quality construction at affordable prices",
  "To follow honest and transparent business practices",
  "To ensure timely project completion",
  "To build long-lasting relationships with customers through trust and satisfaction",
];

const VisionMission = () => {
  return (
    <section id="vision" className="py-20 lg:py-28 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase mb-4">
            Our Purpose
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
            Vision & Mission
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Vision Card */}
          <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-3xl p-8 lg:p-10 hover:bg-cream/10 transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-gold">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
              Our Vision
            </h3>
            <p className="text-cream/80 text-lg leading-relaxed">
              To become a reliable and respected name in the real estate industry by 
              delivering high-quality construction projects that meet modern living 
              standards while maintaining trust and integrity.
            </p>
          </div>
          
          {/* Mission Card */}
          <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-3xl p-8 lg:p-10 hover:bg-cream/10 transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-gold">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
              Our Mission
            </h3>
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-cream/80 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
