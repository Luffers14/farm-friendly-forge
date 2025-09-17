import { createContext, useContext, useState, ReactNode } from "react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
];

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  hi: {
    // Header
    greeting_morning: "सुप्रभात",
    greeting_afternoon: "नमस्ते", 
    greeting_evening: "शुभ संध्या",
    have_a_good_day: "आज का दिन शुभ हो",
    logout: "लॉगआउट",
    
    // Navigation
    dashboard: "डैशबोर्ड",
    weather: "मौसम",
    crop_suggestions: "फसल सुझाव",
    learn: "सीखें",
    community: "समुदाय",
    schemes: "योजनाएं",
    seed_bank: "बीज बैंक",
    
    // Dashboard
    todays_weather: "आज का मौसम",
    temperature: "तापमान",
    humidity: "नमी",
    wind: "हवा",
    rainfall: "बारिश",
    advice: "सलाह",
    weather_advice: "फसल की सिंचाई के लिए अच्छा समय है। आज खाद डालने की सलाह दी जाती है।",
    daily_streak: "दिन की लकीर",
    total_trades: "कुल व्यापार",
    points: "पॉइंट्स",
    quick_actions: "त्वरित कार्य",
    crop_recommendation: "फसल की सिफारिश",
    view_seed_bank: "बीज बैंक देखें",
    learn_new_techniques: "नई तकनीक सीखें",
    
    // Seed Bank
    seed_marketplace: "बीज बाज़ार",
    buy_seeds: "बीज खरीदें",
    sell_seeds: "बीज बेचें",
    my_listings: "मेरी सूची",
    seed_name: "बीज का नाम",
    variety: "किस्म",
    price_per_kg: "प्रति किलो मूल्य",
    available_quantity: "उपलब्ध मात्रा",
    seller: "विक्रेता",
    location: "स्थान",
    quality_grade: "गुणवत्ता श्रेणी",
    contact_seller: "विक्रेता से संपर्क करें",
    add_to_cart: "कार्ट में डालें",
    post_listing: "सूची जोड़ें",
    high_quality: "उच्च गुणवत्ता",
    medium_quality: "मध्यम गुणवत्ता",
    organic_certified: "जैविक प्रमाणित",
    
    // Forms
    phone_number: "फोन नंबर",
    enter_phone: "अपना फोन नंबर दर्ज करें",
    send_otp: "OTP भेजें",
    enter_otp: "OTP दर्ज करें",
    verify_login: "सत्यापित करें और लॉगिन करें",
    
    // Language selector
    choose_language: "भाषा चुनें / Choose Language",
    get_agri_info: "अपनी पसंदीदा भाषा में कृषि की जानकारी प्राप्त करें",
    you_selected: "आपने चुना:",
    continue: "जारी रखें / Continue",
    
    // Seed Bank Form
    seed_type: "बीज प्रकार",
    description: "विवरण",
    selling_price: "बिक्री मूल्य",
    quantity_kg: "मात्रा (किलो में)",
    contact_info: "संपर्क जानकारी",
    post_for_sale: "बिक्री के लिए पोस्ट करें",
  },
  en: {
    // Header
    greeting_morning: "Good Morning",
    greeting_afternoon: "Good Afternoon",
    greeting_evening: "Good Evening", 
    have_a_good_day: "Have a great day",
    logout: "Logout",
    
    // Navigation
    dashboard: "Dashboard",
    weather: "Weather",
    crop_suggestions: "Crop Suggestions",
    learn: "Learn",
    community: "Community", 
    schemes: "Schemes",
    seed_bank: "Seed Bank",
    
    // Dashboard
    todays_weather: "Today's Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind",
    rainfall: "Rainfall",
    advice: "Advice",
    weather_advice: "Good time for crop irrigation. Fertilizer application is recommended today.",
    daily_streak: "Daily Streak",
    total_trades: "Total Trades",
    points: "Points",
    quick_actions: "Quick Actions",
    crop_recommendation: "Crop Recommendation",
    view_seed_bank: "View Seed Bank",
    learn_new_techniques: "Learn New Techniques",
    
    // Seed Bank
    seed_marketplace: "Seed Marketplace",
    buy_seeds: "Buy Seeds",
    sell_seeds: "Sell Seeds",
    my_listings: "My Listings",
    seed_name: "Seed Name",
    variety: "Variety",
    price_per_kg: "Price per KG",
    available_quantity: "Available Quantity",
    seller: "Seller",
    location: "Location",
    quality_grade: "Quality Grade",
    contact_seller: "Contact Seller",
    add_to_cart: "Add to Cart",
    post_listing: "Post Listing",
    high_quality: "High Quality",
    medium_quality: "Medium Quality", 
    organic_certified: "Organic Certified",
    
    // Forms
    phone_number: "Phone Number",
    enter_phone: "Enter your phone number",
    send_otp: "Send OTP",
    enter_otp: "Enter OTP",
    verify_login: "Verify & Login",
    
    // Language selector
    choose_language: "Choose Language / भाषा चुनें",
    get_agri_info: "Get agriculture information in your preferred language",
    you_selected: "You selected:",
    continue: "Continue / जारी रखें",
    
    // Seed Bank Form
    seed_type: "Seed Type",
    description: "Description",
    selling_price: "Selling Price",
    quantity_kg: "Quantity (in KG)",
    contact_info: "Contact Information",
    post_for_sale: "Post for Sale",
  }
};

// Add basic translations for other languages (using Hindi as fallback)
languages.forEach(lang => {
  if (!translations[lang.code]) {
    translations[lang.code] = translations.hi;
  }
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Default to Hindi

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.hi[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}