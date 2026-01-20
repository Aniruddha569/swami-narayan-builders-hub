import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    details: "Swami Krupa Heights, Shop No. 2, Nisarg Nagar, Dindori Road, Nashik – 422004, Maharashtra",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: "9890401000",
    href: "tel:9890401000",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: "swaminarayanbuilders@gmail.com",
    href: "mailto:swaminarayanbuilders@gmail.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to start your dream project? Reach out to us and let's build something amazing together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mb-4 shadow-gold">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.href ? (
                  <a 
                    href={info.href}
                    className="text-muted-foreground hover:text-gold transition-colors break-all"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.details}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-md">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    placeholder="+91 98904 01000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button variant="hero" size="xl" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
