import { createContext, useContext, useState } from "react";

const translations = {
  // Header
  "nav.home": { mr: "मुख्यपृष्ठ", hi: "होम", en: "Home" },
  "nav.about": { mr: "आमच्याबद्दल", hi: "हमारे बारे में", en: "About" },
  "nav.vision": { mr: "दृष्टी", hi: "दृष्टि", en: "Vision" },
  "nav.projects": { mr: "प्रकल्प", hi: "प्रोजेक्ट्स", en: "Projects" },
  "nav.reviews": { mr: "पुनरावलोकने", hi: "समीक्षाएं", en: "Reviews" },
  "nav.contact": { mr: "संपर्क", hi: "संपर्क", en: "Contact" },
  "nav.emi": { mr: "EMI कॅल्क्युलेटर", hi: "EMI कैलकुलेटर", en: "EMI Calculator" },
  "nav.login": { mr: "लॉगिन", hi: "लॉगिन", en: "Login" },
  "nav.dashboard": { mr: "डॅशबोर्ड", hi: "डैशबोर्ड", en: "Dashboard" },

  // Hero
  "hero.badge": { mr: "२०१५ पासून • नाशिक, महाराष्ट्र", hi: "2015 से • नासिक, महाराष्ट्र", en: "Since 2015 • Nashik, Maharashtra" },
  "hero.title": { mr: "स्वामी नारायण डेव्हलपर्स", hi: "स्वामी नारायण डेवलपर्स", en: "Swami Narayan Developers" },
  "hero.subtitle": { mr: "तुमच्या स्वप्नांचे घर", hi: "आपके सपनों का घर", en: "Your Dream Home" },
  "hero.desc": { mr: "श्री. नितीन सुधाकर भामरे यांच्या नेतृत्वाखाली, नाशिकमध्ये दर्जेदार प्रकल्प विकसित केले", hi: "श्री. नितीन सुधाकर भामरे के नेतृत्व में, नासिक में गुणवत्तापूर्ण परियोजनाएं विकसित की गई", en: "Under the leadership of Mr. Nitin Sudhakar Bhamre, quality projects developed in Nashik" },
  "hero.rera": { mr: "RERA रजिस्टर्ड", hi: "RERA पंजीकृत", en: "RERA Registered" },
  "hero.projects_done": { mr: "25+ प्रकल्प पूर्ण", hi: "25+ प्रोजेक्ट पूर्ण", en: "25+ Projects Completed" },
  "hero.families": { mr: "500+ खुश कुटुंबे", hi: "500+ खुश परिवार", en: "500+ Happy Families" },
  "hero.view_projects": { mr: "प्रकल्प पहा", hi: "प्रोजेक्ट्स देखें", en: "View Projects" },
  "hero.contact_us": { mr: "संपर्क करा", hi: "संपर्क करें", en: "Contact Us" },

  // News ticker
  "news.label": { mr: "बातम्या", hi: "समाचार", en: "News" },

  // Builder Intro
  "builder.subtitle": { mr: "आमच्याबद्दल", hi: "हमारे बारे में", en: "About Us" },
  "builder.title": { mr: "स्वामी नारायण डेव्हलपर्स", hi: "स्वामी नारायण डेवलपर्स", en: "Swami Narayan Developers" },
  "builder.p1": { mr: "श्री. नितीन सुधाकर भामरे यांनी २०१५ मध्ये स्थापन केलेली स्वामी नारायण डेव्हलपर्स, नाशिक आणि समीप भागात विश्वसनीय रिअल एस्टेट सेवा प्रदान करते.", hi: "श्री. नितीन सुधाकर भामरे द्वारा 2015 में स्थापित स्वामी नारायण डेवलपर्स, नासिक और आसपास के क्षेत्र में विश्वसनीय रियल एस्टेट सेवाएं प्रदान करता है।", en: "Swami Narayan Developers, established by Mr. Nitin Sudhakar Bhamre in 2015, provides reliable real estate services in Nashik and surrounding areas." },
  "builder.p2": { mr: "दर्जेदार बांधकाम, वेळेवर डिलिव्हरी आणि ग्राहकांचा विश्वास — या तीनही गोष्टींवर आमचा विश्वास आहे.", hi: "गुणवत्तापूर्ण निर्माण, समय पर डिलीवरी और ग्राहक विश्वास - ये तीनों चीजें हमारी प्रतिबद्धता हैं।", en: "Quality construction, timely delivery, and customer trust - these are our commitments." },
  "builder.since": { mr: "🏆 २०१५ पासून कार्यरत", hi: "🏆 2015 से कार्यरत", en: "🏆 Active Since 2015" },
  "builder.h1": { mr: "25+ प्रकल्प पूर्ण", hi: "25+ प्रोजेक्ट पूर्ण", en: "25+ Projects Done" },
  "builder.h1d": { mr: "निवासी आणि व्यावसायिक", hi: "आवासीय और व्यावसायिक", en: "Residential & Commercial" },
  "builder.h2": { mr: "500+ खुश कुटुंबे", hi: "500+ खुश परिवार", en: "500+ Happy Families" },
  "builder.h2d": { mr: "विश्वासू ग्राहक", hi: "विश्वसनीय ग्राहक", en: "Trusted Clients" },
  "builder.h3": { mr: "10+ वर्षांचा अनुभव", hi: "10+ वर्षों का अनुभव", en: "10+ Years Experience" },
  "builder.h3d": { mr: "2015 पासून कार्यरत", hi: "2015 से कार्यरत", en: "Active since 2015" },
  "builder.h4": { mr: "पारदर्शक व्यवहार", hi: "पारदर्शी व्यवहार", en: "Transparent Dealings" },
  "builder.h4d": { mr: "RERA रजिस्टर्ड", hi: "RERA पंजीकृत", en: "RERA Registered" },

  // Plot Promotion
  "plot.limited": { mr: "🔥 मर्यादित प्लॉट्स उपलब्ध!", hi: "🔥 सीमित प्लॉट उपलब्ध!", en: "🔥 Limited Plots Available!" },
  "plot.title": { mr: "नाशिक दिंडोरी रोड लगत भव्य N.A. प्लॉटस्", hi: "नासिक दिंडोरी रोड के पास भव्य N.A. प्लॉट्स", en: "Magnificent N.A. Plots near Nashik Dindori Road" },
  "plot.subtitle": { mr: "कमर्शिअल आणि रेसिडेन्शियल प्लॉटस् | बंगलो प्लॉटस्", hi: "कमर्शियल और आवासीय प्लॉट्स | बंगलो प्लॉट्स", en: "Commercial & Residential Plots | Bungalow Plots" },
  "plot.hurry": { mr: "एवढ्या अल्प दरात नाशिकच्या जवळपास कोठेच प्लॉट उपलब्ध नाही — त्वरित बुक करा!", hi: "इतने कम दाम में नासिक के पास कहीं भी प्लॉट उपलब्ध नहीं है — तुरंत बुक करें!", en: "No plots available near Nashik at such low prices - Book now!" },
  "plot.size_label": { mr: "वारा पासून प्लॉट साईज", hi: "वारा से प्लॉट साइज़", en: "Plot Size from Vara" },
  "plot.road_label": { mr: "लेआउट रोड साईज", hi: "लेआउट रोड साइज़", en: "Layout Road Size" },
  "plot.progress": { mr: "प्रोजेक्ट प्रगती", hi: "प्रोजेक्ट प्���गति", en: "Project Progress" },
  "plot.location_adv": { mr: "प्रोजेक्टचे स्थानिक फायदे", hi: "प्रोजेक्ट के स्थानीय लाभ", en: "Location Advantages" },
  "plot.nearby_note": { mr: "शाळा, कॉलेज, हॉस्पिटल, पेट्रोल पंप, शॉपिंग मॉल्स, रिक्षा स्टँड, बस स्टॉप, बँक - सर्व काही जवळपास!", hi: "स्कूल, कॉलेज, अस्पताल, पेट्रोल पंप, शॉपिंग मॉल, ऑटो स्टैंड, बस स्टॉप, बैंक - सब कुछ पास!", en: "Schools, colleges, hospitals, petrol pumps, shopping malls, auto stands, bus stops, banks - everything nearby!" },
  "plot.why_buy": { mr: "💡 का घ्यावा हा प्लॉट?", hi: "💡 यह प्लॉट क्यों लें?", en: "💡 Why Buy This Plot?" },
  "plot.invest": { mr: "🌟 आज गुंतवणूक करा, उद्या नफा मिळवा!", hi: "🌟 आज निवेश करें, कल मुनाफा कमाएं!", en: "🌟 Invest Today, Profit Tomorrow!" },
  "plot.contact_btn": { mr: "संपर्क करा — 9767421121", hi: "संपर्क करें — 9767421121", en: "Contact — 9767421121" },

  // Stats
  "stats.experience": { mr: "वर्षांचा अनुभव", hi: "वर्षों का अनुभव", en: "Years Experience" },
  "stats.projects": { mr: "प्रकल्प पूर्ण", hi: "प्रोजेक्ट पूर्ण", en: "Projects Completed" },
  "stats.families": { mr: "खुश कुटुंबे", hi: "खुश परिवार", en: "Happy Families" },
  "stats.awards": { mr: "पुरस्कार", hi: "पुरस्कार", en: "Awards Won" },

  // Why Choose Us
  "why.subtitle": { mr: "आम्हीच का?", hi: "हमें ही क्यों?", en: "Why Us" },
  "why.title": { mr: "स्वामी नारायण का निवडावे", hi: "स्वामी नारायण को क्यों चुनें", en: "Why Choose Swami Narayan" },
  "why.f1.title": { mr: "दर्जेदार बांधकाम", hi: "गुणवत्तापूर्ण निर्माण", en: "Quality Construction" },
  "why.f1.desc": { mr: "प्रत्येक प्रकल्पात उत्कृष्ट साहित्य आणि कुशल कारागीरी", hi: "हर प्रोजेक्ट में उत्तम सामग्री और कुशल कारीगरी", en: "Premium materials and skilled craftsmanship in every project" },
  "why.f2.title": { mr: "वेळेवर डिलिव्हरी", hi: "समय पर डिलीवरी", en: "Timely Delivery" },
  "why.f2.desc": { mr: "आम्ही मुदतीचे पालन करतो आणि प्रत्येक वेळी वेळेवर डिलिव्हरी देतो", hi: "हम समय सीमा का पालन करते हैं और हमेशा समय पर डिलीवरी देते हैं", en: "We maintain deadlines and always deliver on time" },
  "why.f3.title": { mr: "RERA रजिस्टर्ड", hi: "RERA पंजीकृत", en: "RERA Registered" },
  "why.f3.desc": { mr: "सर्व प्रकल्प RERA नियमांनुसार पूर्णपणे अनुपालित", hi: "सभी प्रोजेक्ट RERA नियमों के अनुसार पूरी तरह अनुरूप", en: "All projects fully compliant with RERA regulations" },
  "why.f4.title": { mr: "पारदर्शक व्यवहार", hi: "पारदर्शी व्यवहार", en: "Transparent Dealings" },
  "why.f4.desc": { mr: "स्पष्ट संवाद आणि प्रामाणिक व्यावसायिक पद्धती", hi: "स्पष्ट संचार और ईमानदार व्यावसायिक प्रथाएं", en: "Clear communication and honest business practices" },

  // Ongoing Projects
  "ongoing.subtitle": { mr: "सुरू असलेले काम", hi: "चल रहा काम", en: "Work In Progress" },
  "ongoing.title": { mr: "सुरू असलेले प्रकल्प", hi: "चल रहे प्रोजेक्ट्स", en: "Ongoing Projects" },
  "ongoing.desc": { mr: "आमच्या सुरू असलेल्या विकास आणि बांधकाम प्रगतीची झलक", hi: "हमारी चल रही विकास और निर्माण प्रगति की झलक", en: "A glimpse of our ongoing development and construction progress" },
  "ongoing.badge": { mr: "सुरू", hi: "चालू", en: "Ongoing" },
  "ongoing.view_all": { mr: "सर्व प्रकल्प पहा", hi: "सभी प्रोजेक्ट देखें", en: "View All Projects" },

  // Gallery
  "gallery.subtitle": { mr: "आमचे काम", hi: "हमारा काम", en: "Our Work" },
  "gallery.title": { mr: "प्रकल्प गॅलरी", hi: "प्रोजेक्ट गैलरी", en: "Project Gallery" },
  "gallery.desc": { mr: "आमचे पूर्ण झालेले प्रकल्प आणि सुरू असलेले विकास एक्सप्लोर करा", hi: "हमारी पूर्ण परियोजनाओं और चल रहे विकास को देखें", en: "Explore our completed projects and ongoing developments" },

  // CTA
  "cta.title": { mr: "तुमचे स्वप्नातील घर शोधायला तयार आहात?", hi: "अपने सपनों का घर खोजने के लिए तैयार हैं?", en: "Ready to find your dream home?" },
  "cta.desc": { mr: "आजच मोफत सल्ला आणि साइट भेटीसाठी संपर्क करा", hi: "आज ही मुफ्त परामर्श और साइट पर जाने के लिए संपर्क करें", en: "Contact us today for free consultation and site visit" },
  "cta.call": { mr: "आता कॉल करा", hi: "अभी कॉल करें", en: "Call Now" },
  "cta.touch": { mr: "संपर्कात राहा", hi: "संपर्क करें", en: "Get In Touch" },

  // Footer
  "footer.desc": { mr: "२०१५ पासून जमिनीचे लँडमार्क बनवत आहोत. आम्ही टिकाऊपणा, पारदर्शकता आणि ग्राहक संतुष्टीमध्ये विश्वास करतो.", hi: "2015 से हम भूमि को लैंडमार्क में बदल रहे हैं। हम स्थिरता, पारदर्शिता और ग्राहक संतुष्टि में विश्वास करते हैं।", en: "Turning land into landmarks since 2015. We believe in sustainability, transparency, and customer satisfaction." },
  "footer.tagline": { mr: "\"जमिनीचे लँडमार्क बनवतो\"", hi: "\"ज़मीन को लैंडमार्क में बदलते हैं\"", en: "\"Turning Land Into Landmarks\"" },
  "footer.quick_links": { mr: "जलद दुवे", hi: "त्वरित लिंक", en: "Quick Links" },
  "footer.contact_info": { mr: "संपर्क माहिती", hi: "संपर्क जानकारी", en: "Contact Info" },
  "footer.rights": { mr: "सर्व हक्क राखीव.", hi: "सर्वाधिकार सुरक्षित।", en: "All rights reserved." },

  // EMI Calculator
  "emi.subtitle": { mr: "गृहकर्ज कॅल्क्युलेटर", hi: "गृह ऋण कैलकुलेटर", en: "Home Loan Calculator" },
  "emi.title": { mr: "EMI कॅल्क्युलेटर", hi: "EMI कैलकुलेटर", en: "EMI Calculator" },
  "emi.desc": { mr: "तुमच्या स्वप्नातील घरासाठी मासिक हप्ता जाणून घ्या", hi: "अपने सपनों के घर के लिए मासिक किस्त जानें", en: "Calculate monthly installment for your dream home" },
  "emi.loan_amount": { mr: "कर्जाची रक्कम (₹)", hi: "ऋण राशि (₹)", en: "Loan Amount (₹)" },
  "emi.interest": { mr: "व्याज दर (% प्रति वर्ष)", hi: "ब्याज दर (% प्रति वर्ष)", en: "Interest Rate (% p.a.)" },
  "emi.tenure": { mr: "कर्ज कालावधी (वर्षे)", hi: "ऋण अवधि (वर्ष)", en: "Loan Tenure (Years)" },
  "emi.monthly": { mr: "तुमचा मासिक हप्ता (EMI)", hi: "आपकी मासिक किस्त (EMI)", en: "Your Monthly EMI" },
  "emi.principal": { mr: "मूळ रक्कम", hi: "मूल राशि", en: "Principal Amount" },
  "emi.total_interest": { mr: "एकूण व्याज", hi: "कुल ब्याज", en: "Total Interest" },
  "emi.total_amount": { mr: "एकूण रक्कम", hi: "कुल राशि", en: "Total Amount" },
  "emi.principal_pct": { mr: "मूळ रक्कम", hi: "मूल राशि", en: "Principal" },
  "emi.interest_pct": { mr: "व्याज", hi: "ब्याज", en: "Interest" },

  // Video section
  "video.subtitle": { mr: "व्हिडिओ", hi: "वीडियो", en: "Video" },
  "video.title": { mr: "आमचा प्रकल्प व्हिडिओ पहा", hi: "हमारा प्रोजेक्ट वीडियो देखें", en: "Watch Our Project Video" },
  "video.desc": { mr: "स्वामी नारायण डेव्हलपर्सच्या प्रकल्पांची व्हिडिओ टूर", hi: "स्वामी नारायण डेवलपर्स की परियोजनाओं का वीडियो टूर", en: "Video tour of Swami Narayan Developers' projects" },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("mr");

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};