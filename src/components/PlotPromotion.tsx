import { MapPin, Phone, TreePine, CheckCircle, Dumbbell, Lightbulb, Car, TrendingUp, Shield, Landmark } from "lucide-react";
import { Button } from "./ui/button";

import swamiRajHeights from "@/assets/plots/swami-raj-heights.jpeg";
import buildingConstruction from "@/assets/plots/building-construction.jpeg";
import buildingProgress from "@/assets/plots/building-progress.jpeg";
import scaffoldingWork from "@/assets/plots/scaffolding-work.jpeg";
import foundationRebar from "@/assets/plots/foundation-rebar.jpeg";
import brickWork from "@/assets/plots/brick-work.jpeg";
import columnRebar from "@/assets/plots/column-rebar.jpeg";
import siteWork from "@/assets/plots/site-work.jpeg";
import awardCeremony from "@/assets/plots/award-ceremony.jpeg";

const sitePhotos = [
  { src: swamiRajHeights, alt: "Swami Raj Heights Render" },
  { src: buildingConstruction, alt: "Building Construction" },
  { src: buildingProgress, alt: "Building Progress" },
  { src: scaffoldingWork, alt: "Scaffolding Work" },
  { src: foundationRebar, alt: "Foundation Rebar" },
  { src: brickWork, alt: "Brick Work" },
  { src: columnRebar, alt: "Column Rebar" },
  { src: siteWork, alt: "Site Work" },
  { src: awardCeremony, alt: "Award Ceremony" },
];

const nearbyLocations = [
  { name: "रिलायन्स लाईफ सायन्स कंपनी", distance: "9.5 किमी" },
  { name: "नाशिक एअरपोर्ट", distance: "10 किमी" },
  { name: "महाराष्ट्र आरोग्य विज्ञान विद्यापीठ", distance: "50 मीटर" },
  { name: "दिल्ली पब्लिक स्कूल कॉलेज", distance: "1.5 किमी" },
  { name: "आयुर्वेद कॉलेज आणि हॉस्पिटल", distance: "2.5 किमी" },
  { name: "ग्लोबल स्कूल", distance: "50 मीटर" },
  { name: "क्रोमा मॉल", distance: "1.5 किमी" },
  { name: "अक्राळे M.I.D.C.", distance: "3 किमी" },
];

const amenities = [
  { icon: TreePine, text: "ट्री प्लांटेशन" },
  { icon: CheckCircle, text: "सेपरेट सातबारा" },
  { icon: Car, text: "नऊ मीटर WBM रोड" },
  { icon: Dumbbell, text: "ग्रीन जिम" },
  { icon: Shield, text: "प्लॉट डीमार्केशन" },
  { icon: Lightbulb, text: "स्ट्रीट लाईट" },
  { icon: Landmark, text: "रोड टच" },
];

const PlotPromotion = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 md:p-12 lg:p-16 mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20 opacity-90" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <span className="inline-block bg-accent text-accent-foreground font-bold px-4 py-1.5 rounded-full text-sm mb-6 animate-pulse">
              🔥 मर्यादित प्लॉट्स उपलब्ध!
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              नाशिक दिंडोरी रोड लगत भव्य N.A. प्लॉटस्
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-2">
              कमर्शिअल आणि रेसिडेन्शियल प्लॉटस् | बंगलो प्लॉटस्
            </p>
            <p className="text-cream/80 text-base md:text-lg mb-6">
              एवढ्या अल्प दरात नाशिकच्या जवळपास कोठेच प्लॉट उपलब्ध नाही — त्वरा करा, प्लॉट घ्या!
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
              <div className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-xl px-5 py-3">
                <span className="text-accent font-bold text-lg">232+</span>
                <p className="text-cream/80 text-xs">वारा पासून प्लॉट साईज</p>
              </div>
              <div className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-xl px-5 py-3">
                <span className="text-accent font-bold text-lg">18 मी & 9 मी</span>
                <p className="text-cream/80 text-xs">लेआउट रोड साईज</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            प्रोजेक्ट प्रगती
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            {sitePhotos.map((photo, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Location Advantages */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-accent" />
              <h3 className="font-display text-xl font-bold text-foreground">
                प्रोजेक्टचे स्थानिक फायदे
              </h3>
            </div>
            <div className="space-y-3">
              {nearbyLocations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-foreground text-sm">{loc.name}</span>
                  <span className="text-accent font-semibold text-sm whitespace-nowrap ml-3">
                    {loc.distance}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-muted-foreground text-xs">
              शाळा, कॉलेज, हॉस्पिटल, पेट्रोल पंप, शॉपिंग मॉल्स, रिक्षा स्टँड, बस स्टॉप — सर्व हाकेच्या अंतरावर!
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              ✨ Amenities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <a.icon className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground text-sm font-medium">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Invest CTA */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-3xl p-8 md:p-12 border border-accent/20">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            💡 का घ्यावा हा प्लॉट?
          </h3>
          <div className="space-y-3 text-left max-w-xl mx-auto mb-8">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <p className="text-foreground text-sm">गुंतवणुकीसाठी उत्तम — भविष्यात किंमत वाढीची हमी! 📈</p>
            </div>
            <div className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <p className="text-foreground text-sm">नैसर्गिक सौंदर्याने नटलेली प्रशस्त जागा — निवांत आणि सुरक्षित वातावरण! 🌿</p>
            </div>
            <div className="flex items-start gap-3">
              <Car className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <p className="text-foreground text-sm">मुख्य रस्त्यालगत — सहज प्रवेशयोग्य, संपूर्ण सुरक्षित! 🚗</p>
            </div>
          </div>
          <p className="text-accent font-bold text-lg mb-6">
            🌟 आज गुंतवणूक करा, उद्या नफा मिळवा!
          </p>
          <a href="tel:9767421121">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-bold px-8">
              <Phone className="w-5 h-5 mr-2" />
              संपर्क करा — 9767421121
            </Button>
          </a>
          <p className="text-muted-foreground text-xs mt-3">सौ. रुपाली एन भामरे</p>
        </div>
      </div>
    </section>
  );
};

export default PlotPromotion;
