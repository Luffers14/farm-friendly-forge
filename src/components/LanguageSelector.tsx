import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
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

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-strong">
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-crop mb-2">🌾 KrishiDwar</h1>
            <p className="text-lg text-muted-foreground">डिजिटल कृषि प्लेटफॉर्म</p>
          </div>
          <h2 className="text-2xl font-semibold mb-2">भाषा चुनें / Choose Language</h2>
          <p className="text-muted-foreground">अपनी पसंदीदा भाषा में कृषि की जानकारी प्राप्त करें</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage?.code === language.code ? "farmer" : "outline"}
              className="h-16 flex-col gap-1 text-sm font-medium hover-lift"
              onClick={() => handleLanguageSelect(language)}
            >
              <span className="text-xl">{language.flag}</span>
              <span>{language.name}</span>
            </Button>
          ))}
        </div>

        {selectedLanguage && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              आपने चुना: {selectedLanguage.name}
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="px-12"
              onClick={() => onLanguageSelect(selectedLanguage)}
            >
              जारी रखें / Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}