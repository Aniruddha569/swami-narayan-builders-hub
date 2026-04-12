import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `तुम्ही "स्वामी नारायण डेव्हलपर्स" या नाशिकमधील बांधकाम कंपनीचे AI प्रॉपर्टी सहाय्यक आहात.

कंपनी माहिती:
- स्थापना: 2015, संस्थापक: श्री. नितीन सुधाकर भामरे
- स्थान: नाशिक, महाराष्ट्र
- 25+ प्रकल्प पूर्ण, 500+ खुश कुटुंबे, 10+ वर्षांचा अनुभव
- सर्व प्रकल्प RERA रजिस्टर्ड

सध्याचे प्रकल्प:
- नाशिक-दिंडोरी रोड लगत N.A. प्लॉटस् (कमर्शिअल आणि रेसिडेन्शियल)
- प्लॉट साईज: 232 वारा पासून
- लेआउट रोड: 18 मीटर आणि 9 मीटर
- Amenities: ट्री प्लांटेशन, सेपरेट सातबारा, WBM रोड, ग्रीन जिम, प्लॉट डीमार्केशन, स्ट्रीट लाईट, रोड टच

जवळपासची ठिकाणे:
- रिलायन्स लाईफ सायन्स: 9.5 किमी
- नाशिक एअरपोर्ट: 10 किमी
- महाराष्ट्र आरोग्य विज्ञान विद्यापीठ: 50 मीटर
- दिल्ली पब्लिक स्कूल: 1.5 किमी
- ग्लोबल स्कूल: 50 मीटर
- क्रोमा मॉल: 1.5 किमी
- अक्राळे MIDC: 3 किमी

संपर्क: 9890401000 / 9767421121 (सौ. रुपाली एन भामरे)

नियम:
1. मराठी मध्ये उत्तर द्या (इंग्रजी मिश्रित चालेल)
2. कंपनीच्या प्रकल्पांबद्दल माहिती द्या
3. EMI, गुंतवणूक, लोकेशन फायदे यावर मार्गदर्शन करा
4. विनम्र आणि व्यावसायिक राहा
5. अचूक माहिती द्या, अज्ञात असल्यास सांगा
6. उत्तरे संक्षिप्त ठेवा (2-3 परिच्छेद)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
