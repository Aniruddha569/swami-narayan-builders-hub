import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const newsItems = [
  "🔥 नवीन N.A. प्लॉटस् नाशिक-दिंडोरी रोड लगत उपलब्ध! त्वरा करा!",
  "🏡 स्वामी राज हाइट्स — बुकिंग सुरू! अल्प दरात आलिशान फ्लॅट्स!",
  "✅ सर्व प्रकल्प RERA रजिस्टर्ड — विश्वासार्ह गुंतवणूक!",
  "📈 भविष्यातील गुंतवणुकीसाठी सर्वोत्तम संधी — शैक्षणिक झोन!",
  "🏗️ 10+ वर्षांचा अनुभव — 500+ खुश कुटुंबे!",
  "📞 संपर्क करा: 9890401000 | 9767421121",
];

const NewsTicker = () => {
  const combinedText = newsItems.join("   •   ");

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden py-2.5 relative">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-primary text-cream px-3 py-1 rounded-md text-xs font-bold shrink-0 z-10">
          <Megaphone className="w-3.5 h-3.5" />
          बातम्या
        </div>
        <div className="overflow-hidden ml-3 flex-1">
          <motion.div
            className="whitespace-nowrap text-sm font-medium"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            <span>{combinedText}   •   {combinedText}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
