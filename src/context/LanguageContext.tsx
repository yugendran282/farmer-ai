import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultEn?: string, defaultTa?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    brand_name: 'Agniva',
    brand_tagline: 'Farmer AI',
    nav_home: 'Home',
    nav_dashboard: 'Farmer Dashboard',
    nav_recommendation: 'Crop Advisor',
    nav_disease: 'Disease Scanner',
    nav_assistant: 'AI Advisory',
    nav_weather: 'Weather & Prices',
    nav_records: 'Farm Records',
    nav_login: 'Farmer Login / Register',
    nav_logout: 'Logout',

    hero_badge: 'Agniva • Next-Gen Farmer AI Platform',
    hero_title_p1: 'Smart Decisions for',
    hero_title_p2: 'Every Harvest.',
    hero_subtitle: 'Data-driven crop recommendations, real-time APMC mandi prices, instant leaf disease diagnosis, and hyper-local weather alerts in one unified mobile platform.',
    btn_open_dashboard: 'Open Farmer Dashboard',
    btn_explore_features: 'Explore Capabilities',
    btn_how_it_works: 'How It Works',

    stat_active_farmers: 'Verified Crops',
    stat_mandi_coverage: 'Mandi Coverage',
    stat_ai_models: 'Intelligence Modules',
    stat_accuracy: 'Tamil & English',

    feat_overview_title: 'Core Agricultural Capabilities',
    feat_overview_subtitle: 'Practical, high-impact digital tools designed specifically for smallholders and commercial growers.',

    card_crop_advisor_title: 'AI Crop Soil Recommendation',
    card_crop_advisor_desc: 'Analyzes your regional soil N-P-K levels, pH texture, and seasonal water availability to rank ideal crops with expected yields.',
    card_disease_scanner_title: 'Plant Disease Diagnostic Scanner',
    card_disease_scanner_desc: 'Instantly identifies leaf symptoms, fungal blights, and pest damage with organic and chemical treatment advice.',
    card_assistant_title: 'FARMERS AI Advisory Q&A',
    card_assistant_desc: 'Ask direct questions on pest management, fertilizer calculation, drip scheduling, and biological cultivation in English or Tamil.',
    card_weather_mandi_title: 'Real-Time Weather & Mandi Prices',
    card_weather_mandi_desc: 'Live temperature, rainfall forecast, and APMC benchmark market prices across South Indian hubs with transparent day changes.',
    card_records_title: 'Farm Field Logs & Reminders',
    card_records_desc: 'Track farm expenses, log harvest outputs, and set automated reminders for irrigation, fertilization, and spraying.',

    dash_title: 'Farmer Control Center',
    dash_greeting_morning: 'Good morning',
    dash_greeting_afternoon: 'Good afternoon',
    dash_greeting_evening: 'Good evening',
    dash_welcome_sub: 'Here is your farm overview, live market snapshot, and scheduled field actions.',
    dash_btn_new_record: 'New Field Log',
    dash_btn_new_reminder: 'Add Reminder',
    dash_guest_banner_title: 'You are viewing Demo Farmer Mode',
    dash_guest_banner_desc: 'Sign in with Supabase to sync your real acreage, save custom crop plans, and protect your private farm records.',
    dash_guest_btn: 'Sign In to Sync Farm Data',

    metric_crops_available: 'Tracked Crops',
    metric_live_temp: 'Current Weather',
    metric_pending_reminders: 'Pending Tasks',
    metric_farm_acreage: 'Registered Acreage',

    tab_overview: 'Overview',
    tab_market_prices: 'Mandi Prices',
    tab_advisory: 'Advisory Tools',
    tab_reminders: 'Reminders & Logs',

    loading_data: 'Loading agricultural data...',
    empty_crops_title: 'No crops found',
    empty_crops_desc: 'Crops data is currently unavailable. Please refresh or check database connectivity.',
    retry_btn: 'Retry',

    btn_get_started: 'Get Started',
    btn_save: 'Save Record',
    btn_cancel: 'Cancel',
    btn_send: 'Send',
    btn_submit: 'Submit',
    btn_close: 'Close',
    lang_toggle: 'Language',

    // Dedicated Authentication Tokens
    auth_login_welcome: 'Welcome back',
    auth_login_sub: 'Sign in to continue your farming journey with Agniva.',
    auth_register_title: 'Join Agniva',
    auth_register_sub: 'Create your farmer account to sync land acreage, save field records, and receive tailored intelligence.',
    auth_email_lbl: 'Email address',
    auth_email_placeholder: 'farmer@example.com',
    auth_password_lbl: 'Password',
    auth_confirm_password_lbl: 'Confirm password',
    auth_password_placeholder: '••••••••',
    auth_fullname_lbl: 'Full name',
    auth_fullname_placeholder: 'Ramesh Kumar',
    auth_phone_lbl: 'Mobile phone number',
    auth_phone_placeholder: '9876543210',
    auth_district_lbl: 'District / Taluk',
    auth_state_lbl: 'State',
    auth_acreage_lbl: 'Land acreage (Acres)',
    auth_show_password: 'Show password',
    auth_hide_password: 'Hide password',
    auth_remember_me: 'Remember me on this device',
    auth_forgot_password: 'Forgot password?',
    auth_forgot_info: 'Contact support or check your email verification link.',
    auth_btn_signin: 'Sign In',
    auth_btn_signing_in: 'Signing in to Agniva...',
    auth_btn_register: 'Create Account',
    auth_btn_registering: 'Creating your account...',
    auth_switch_to_reg: 'New to Agniva? Create an account.',
    auth_switch_to_login: 'Already have an account? Sign in.',
    auth_back_home: 'Back to Home',
    auth_err_pass_match: 'Passwords do not match. Please verify both fields.',
    auth_err_pass_len: 'Password must be at least 6 characters long.',
    auth_err_email_invalid: 'Please enter a valid email address.',
    auth_err_name_req: 'Full name is required.',
  },
  ta: {
    brand_name: 'அக்னிவா',
    brand_tagline: 'விவசாயி AI',
    nav_home: 'முகப்பு',
    nav_dashboard: 'விவசாயி டாஷ்போர்டு',
    nav_recommendation: 'பயிர் வழிகாட்டி',
    nav_disease: 'நோய் கண்டறிதல்',
    nav_assistant: 'AI ஆலோசனை',
    nav_weather: 'வானிலை & சந்தை',
    nav_records: 'பண்ணை பதிவுகள்',
    nav_login: 'உள்நுழைவு / பதிவு',
    nav_logout: 'வெளியேறு',

    hero_badge: 'அக்னிவா • நவீன வேளாண் AI தளம்',
    hero_title_p1: 'ஒவ்வொரு அறுவடைக்கும்',
    hero_title_p2: 'சரியான முடிவுகள்.',
    hero_subtitle: 'மண் பரிசோதனை சார்ந்த பயிர் பரிந்துரைகள், நேரலை APMC சந்தை விலைகள், பயிர் நோய் கண்டறிதல் மற்றும் உள்ளூர் வானிலை எச்சரிக்கைகள் அனைத்தும் ஒரே மொபைல் தளத்தில்.',
    btn_open_dashboard: 'விவசாயி டாஷ்போர்டு திறக்க',
    btn_explore_features: 'அம்சங்களை பார்க்க',
    btn_how_it_works: 'இது செயல்படும் விதம்',

    stat_active_farmers: 'கண்காணிக்கப்படும் பயிர்கள்',
    stat_mandi_coverage: 'சந்தை கவரேஜ்',
    stat_ai_models: 'AI தொகுதிகள்',
    stat_accuracy: 'தமிழ் & ஆங்கிலம்',

    feat_overview_title: 'முக்கிய வேளாண்மை அம்சங்கள்',
    feat_overview_subtitle: 'சிறு மற்றும் வணிக விவசாயிகளுக்காக பிரத்யேகமாக உருவாக்கப்பட்ட நம்பகமான டிஜிட்டல் கருவிகள்.',

    card_crop_advisor_title: 'மண் மற்றும் பயிர் பரிந்துரை',
    card_crop_advisor_desc: 'உங்கள் மண்ணின் N-P-K அளவுகள், pH காரத்தன்மை மற்றும் பாசன வசதியை பகுப்பாய்வு செய்து உகந்த பயிர்களை பரிந்துரைக்கிறது.',
    card_disease_scanner_title: 'பயிர் நோய் கண்டறியும் ஸ்கேனர்',
    card_disease_scanner_desc: 'இலையின் புகைப்படத்தை கொண்டு பூச்சி, பூஞ்சாண நோய்களை உடனடியாக கண்டறிந்து இயற்கை மற்றும் ரசாயன தீர்வுகளை வழங்குகிறது.',
    card_assistant_title: 'விவசாயி AI ஆலோசனைக் குழு',
    card_assistant_desc: 'உர கணக்கீடு, சொட்டு நீர் மேலாண்மை மற்றும் பூச்சி கட்டுப்பாடு குறித்த கேள்விகளை தமிழ் அல்லது ஆங்கிலத்தில் கேளுங்கள்.',
    card_weather_mandi_title: 'நேரலை வானிலை & சந்தை விலைகள்',
    card_weather_mandi_desc: 'உள்ளூர் நேரலை வெப்பநிலை, மழைப்பொழிவு முன்னறிவிப்பு மற்றும் தென்னிந்திய APMC சந்தை விலை மாற்றங்கள்.',
    card_records_title: 'பண்ணை பதிவுகள் & நினைவூட்டல்',
    card_records_desc: 'செலவுகளை கண்காணிக்கவும், மகசூலை பதிவு செய்யவும், நீர் பாசனம் மற்றும் மருந்து தெளிப்பிற்கான நினைவூட்டல்களை அமைக்கவும்.',

    dash_title: 'விவசாயி கட்டுப்பாட்டு மையம்',
    dash_greeting_morning: 'காலை வணக்கம்',
    dash_greeting_afternoon: 'மதிய வணக்கம்',
    dash_greeting_evening: 'மாலை வணக்கம்',
    dash_welcome_sub: 'உங்கள் பண்ணை நிலவரம், நேரலை சந்தை விலை மற்றும் திட்டமிடப்பட்ட பணிகள் இங்கே.',
    dash_btn_new_record: 'புதிய பதிவு',
    dash_btn_new_reminder: 'நினைவூட்டல் சேர்க்க',
    dash_guest_banner_title: 'நீங்கள் டெமோ முறையில் பார்க்கிறீர்கள்',
    dash_guest_banner_desc: 'உங்கள் உண்மையான நில அளவை இணைக்கவும், பண்ணை பதிவுகளை பாதுகாப்பாக சேமிக்கவும் Supabase மூலம் உள்நுழையவும்.',
    dash_guest_btn: 'உள்நுழையவும்',

    metric_crops_available: 'பதிவான பயிர்கள்',
    metric_live_temp: 'நேரலை வானிலை',
    metric_pending_reminders: 'நிலுவை பணிகள்',
    metric_farm_acreage: 'பதிவு செய்த நிலம்',

    tab_overview: 'மேலோட்டம்',
    tab_market_prices: 'சந்தை விலைகள்',
    tab_advisory: 'ஆலோசனை கருவிகள்',
    tab_reminders: 'நினைவூட்டல்கள் & பதிவுகள்',

    loading_data: 'வேளாண் தகவல்கள் ஏற்றப்படுகின்றன...',
    empty_crops_title: 'பயிர் விவரங்கள் கிடைக்கவில்லை',
    empty_crops_desc: 'பயிர் தகவல்களை பெறுவதில் தாமதம். தயவுசெய்து பக்கத்தை புதுப்பிக்கவும்.',
    retry_btn: 'மீண்டும் முயற்சிக்கவும்',

    btn_get_started: 'தொடங்கவும்',
    btn_save: 'சேமிக்க',
    btn_cancel: 'ரத்து செய்',
    btn_send: 'அனுப்பு',
    btn_submit: 'சமர்ப்பி',
    btn_close: 'மூடு',
    lang_toggle: 'மொழி',

    // Dedicated Authentication Tokens (Tamil)
    auth_login_welcome: 'நல்வரவு',
    auth_login_sub: 'அக்னிவாவுடன் உங்கள் விவசாயப் பயணத்தைத் தொடர உள்நுழையவும்.',
    auth_register_title: 'அக்னிவாவில் இணையுங்கள்',
    auth_register_sub: 'உங்கள் நிலத்தை இணைக்கவும், பண்ணை பதிவுகளைச் சேமிக்கவும் புதிய கணக்கை உருவாக்கவும்.',
    auth_email_lbl: 'மின்னஞ்சல் முகவரி',
    auth_email_placeholder: 'farmer@example.com',
    auth_password_lbl: 'கடவுச்சொல்',
    auth_confirm_password_lbl: 'கடவுச்சொல்லை உறுதிசெய்க',
    auth_password_placeholder: '••••••••',
    auth_fullname_lbl: 'முழு பெயர்',
    auth_fullname_placeholder: 'ரமேஷ் குமார்',
    auth_phone_lbl: 'கைபேசி எண்',
    auth_phone_placeholder: '9876543210',
    auth_district_lbl: 'மாவட்டம் / தாலுகா',
    auth_state_lbl: 'மாநிலம்',
    auth_acreage_lbl: 'நிலப்பரப்பு (ஏக்கர்)',
    auth_show_password: 'கடவுச்சொல்லை காட்டு',
    auth_hide_password: 'கடவுச்சொல்லை மறை',
    auth_remember_me: 'என்னை நினைவில் கொள்',
    auth_forgot_password: 'கடவுச்சொல் மறந்ததா?',
    auth_forgot_info: 'உதவி மையத்தைத் தொடர்பு கொள்ளவும் அல்லது உங்கள் மின்னஞ்சல் சரிபார்ப்பு இணைப்பைச் சரிபார்க்கவும்.',
    auth_btn_signin: 'உள்நுழையவும்',
    auth_btn_signing_in: 'உள்நுழைகிறது...',
    auth_btn_register: 'கணக்கை உருவாக்கு',
    auth_btn_registering: 'கணக்கு உருவாகிறது...',
    auth_switch_to_reg: 'அக்னிவாவிற்கு புதியவரா? கணக்கை உருவாக்குங்கள்.',
    auth_switch_to_login: 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்.',
    auth_back_home: 'முகப்பிற்குத் திரும்பு',
    auth_err_pass_match: 'கடவுச்சொற்கள் பொருந்தவில்லை. மீண்டும் சரிபார்க்கவும்.',
    auth_err_pass_len: 'கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துகள் இருக்க வேண்டும்.',
    auth_err_email_invalid: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
    auth_err_name_req: 'முழு பெயர் தேவை.',
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
