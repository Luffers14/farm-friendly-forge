import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage, languages } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  onLanguageSelect: (language: any) => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const { setCurrentLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
    setCurrentLanguage(language);
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