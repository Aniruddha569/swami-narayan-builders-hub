import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const langs: { code: Language; label: string; short: string }[] = [
  { code: "mr", label: "मराठी", short: "म" },
  { code: "hi", label: "हिंदी", short: "हि" },
  { code: "en", label: "English", short: "EN" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-secondary/80 rounded-full p-0.5">
      <Globe className="w-3.5 h-3.5 text-muted-foreground ml-2" />
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            language === l.code
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
