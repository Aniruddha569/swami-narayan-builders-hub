import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const newsItemsByLang = {
  mr: [
    "🔥 नवीन N.A. प्लॉटस् नाशिक-दिंडोरी रोड लगत उपलब्ध! त्वरा करा!",
    "🏡 स्वामी राज हाइट्स — बुकिंग सुरू! अल्प दरात आलिशान फ्लॅट्स!",
    "✅ सर्व प्रकल्प RERA रजिस्टर्ड — विश्वासार्ह गुंतवणूक!",
    "📈 भविष्यातील गुंतवणुकीसाठी सर्वोत्तम संधी — शैक्षणिक झोन!",
    "🏗️ 10+ वर्षांचा अनुभव — 500+ खुश कुटुंबे!",
    "📞 संपर्क करा: 9890401000 | 9767421121",
  ],
  hi: [
    "🔥 नए N.A. प्लॉट्स नासिक-दिंडोरी रोड के पास उपलब्ध! जल्दी करें!",
    "🏡 स्वामी राज हाइट्स — बुकिंग शुरू! कम कीमत में शानदार फ्लैट्स!",
    "✅ सभी प्रोजेक्ट RERA पंजीकृत — विश्वसनीय निवेश!",
    "📈 भविष्य के निवेश के लिए सर्वोत्तम अवसर — शैक्षणिक ज़ोन!",
    "🏗️ 10+ वर्षों का अनुभव — 500+ खुश परिवार!",
    "📞 संपर्क करें: 9890401000 | 9767421121",
  ],
  en: [
    "🔥 New N.A. Plots available near Nashik-Dindori Road! Hurry!",
    "🏡 Swami Raj Heights — Booking open! Affordable luxury flats!",
    "✅ All projects RERA Registered — Trusted investment!",
    "📈 Best opportunity for future investment — Educational zone!",
    "🏗️ 10+ years of experience — 500+ happy families!",
    "📞 Contact: 9890401000 | 9767421121",
  ],
};

const NewsTicker = () => {
  const { language, t } = useLanguage();
  const newsItems = newsItemsByLang[language];
  const combinedText = newsItems.join("   •   ");

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden py-2.5 relative">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-primary text-cream px-3 py-1 rounded-md text-xs font-bold shrink-0 z-10">
          <Megaphone className="w-3.5 h-3.5" />
          {t("news.label")}
        </div>
        <div className="overflow-hidden ml-3 flex-1">
          <motion.div
            key={language}
            className="whitespace-nowrap text-sm font-medium"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
          >
            <span>{combinedText}   •   {combinedText}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
