import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultEn?: string, defaultTa?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_recommendation: 'Crop Advisor',
    nav_disease: 'Disease Scanner',
    nav_assistant: 'FARMERS AI',
    nav_weather: 'Weather & Markets',
    nav_records: 'Records & Reminders',
    nav_dashboard: 'My Dashboard',
    nav_login: 'Farmer Login / Register',
    nav_logout: 'Logout',
    hero_badge: 'Unified AI Agricultural Intelligence',
    hero_title: 'Empowering Farmers with AI-Driven Agricultural Intelligence',
    hero_subtitle: 'Data-driven crop recommendations, instant plant disease diagnosis, smart irrigation alerts, and direct market access.',
    btn_get_started: 'Get Started',
    btn_explore: 'Explore Features',
    btn_how_it_works: 'How it Works',
    btn_partner: 'Partner Program',
    btn_save: 'Save Record',
    btn_cancel: 'Cancel',
    btn_send: 'Send',
    btn_submit: 'Submit',
    btn_close: 'Close',
    crop_rec_title: 'AI Soil & Crop Recommendation Engine',
    crop_rec_subtitle: 'Enter your soil N-P-K parameters, pH, and local field conditions for data-backed crop suggestions.',
    disease_title: 'Plant Disease Diagnostic Scanner',
    disease_subtitle: 'Upload a photo of your affected leaf or crop for instant disease identification and treatment options.',
    assistant_title: 'FARMERS AI Advisory Assistant',
    assistant_subtitle: 'Ask questions about pest control, fertilizer calculation, organic farming, or weather precautions.',
    weather_title: 'Real-Time Weather & APMC Market Mandi Prices',
    weather_subtitle: 'Live hyper-local weather forecast and verified market prices.',
    records_title: 'Farm Management Records & Reminders',
    records_subtitle: 'Track your expenses, crop cycles, irrigation schedules, and task reminders.',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Common queries regarding FARMERS AI, soil testing, market connectivity, and crop advisory.',
    cta_title: 'Ready to Transform Your Farming with AI?',
    cta_subtitle: 'Join thousands of farmers optimizing yields, reducing input costs, and accessing verified local buyers.',
    lang_toggle: 'Language',
  },
  ta: {
    nav_home: 'முகப்பு',
    nav_recommendation: 'பயிர் வழிகாட்டி',
    nav_disease: 'நோய் கண்டறிதல்',
    nav_assistant: 'விவசாயி AI',
    nav_weather: 'வானிலை & சந்தை',
    nav_records: 'பதிவுகள் & நினைவூட்டல்',
    nav_dashboard: 'என் டாஷ்போர்டு',
    nav_login: 'உள்நுழைவு / பதிவு',
    nav_logout: 'வெளியேறு',
    hero_badge: 'ஒருங்கிணைந்த வேளாண் செயற்கை நுண்ணறிவு',
    hero_title: 'செயற்கை நுண்ணறிவுடன் விவசாயிகளுக்கு நவீன உதவிகள்',
    hero_subtitle: 'மண் பரிசோதனை சார்ந்த பயிர் பரிந்துரைகள், தாவர நோய் கண்டறிதல், பாசன எச்சரிக்கைகள் மற்றும் நேரடி சந்தை தகவல்கள்.',
    btn_get_started: 'தொடங்கவும்',
    btn_explore: 'அம்சங்களை பார்க்க',
    btn_how_it_works: 'இது செயல்படும் விதம்',
    btn_partner: 'பங்குதாரர் திட்டம்',
    btn_save: 'பதிவை சேமிக்க',
    btn_cancel: 'ரத்து செய்',
    btn_send: 'அனுப்பு',
    btn_submit: 'சமர்ப்பி',
    btn_close: 'மூடு',
    crop_rec_title: 'மண் மற்றும் பயிர் பரிந்துரை இயந்திரம்',
    crop_rec_subtitle: 'உங்கள் மண்ணின் N-P-K அளவுகள் மற்றும் pH மதிப்பை வழங்கி பொருத்தமான பயிர்களை அறியவும்.',
    disease_title: 'பயிர் நோய் கண்டறியும் ஸ்கேனர்',
    disease_subtitle: 'பாதிக்கப்பட்ட இலையின் புகைப்படத்தைப் பதிவேற்றி நோயையும் அதற்கான தீர்வையும் அறியவும்.',
    assistant_title: 'விவசாயி AI ஆலோசனைக் குழு',
    assistant_subtitle: 'பூச்சி கட்டுப்பாடு, உர மேலாண்மை மற்றும் இயற்கை விவசாயம் பற்றிய கேள்விகளைக் கேட்கவும்.',
    weather_title: 'நேரலை வானிலை & சந்தை விலைகள்',
    weather_subtitle: 'உள்ளூர் நேரலை வானிலை மற்றும் சரிபார்க்கப்பட்ட APMC சந்தை விலை விவரங்கள்.',
    records_title: 'விவசாய பதிவுகள் & நினைவூட்டல்கள்',
    records_subtitle: 'உங்கள் செலவுகள், நீர் பாசன அட்டவணை மற்றும் விவசாயப் பணிகளைப் பதிவு செய்யவும்.',
    faq_title: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    faq_subtitle: 'மண் பரிசோதனை, சந்தை தொடர்பு மற்றும் பயிர் வழிகாட்டுதல் பற்றிய பொதுவான கேள்விகள்.',
    cta_title: 'செயற்கை நுண்ணறிவுடன் உங்கள் விவசாயத்தை மேம்படுத்தத் தயாரா?',
    cta_subtitle: 'மகசூலை அதிகரிக்கவும், செலவைக் குறைக்கவும் பல ஆயிரம் விவசாயிகளுடன் இணையுங்கள்.',
    lang_toggle: 'மொழி',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('farmer_ai_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('farmer_ai_lang', lang);
  };

  const t = (key: string, defaultEn?: string, defaultTa?: string): string => {
    if (language === 'ta') {
      return translations['ta']?.[key] || defaultTa || translations['en']?.[key] || defaultEn || key;
    }
    return translations['en']?.[key] || defaultEn || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
