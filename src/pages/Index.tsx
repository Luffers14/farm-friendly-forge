import { useState } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HeroSection } from "@/components/HeroSection";
import { AuthForm } from "@/components/AuthForm";
import { MainDashboard } from "@/components/MainDashboard";

type AppState = "language" | "hero" | "auth" | "dashboard";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("language");
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
    setCurrentState("hero");
  };

  const handleGetStarted = () => {
    setCurrentState("auth");
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentState("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentState("language");
    setSelectedLanguage(null);
  };

  return (
    <main>
      {currentState === "language" && (
        <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      )}
      
      {currentState === "hero" && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentState === "auth" && (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
      
      {currentState === "dashboard" && (
        <MainDashboard onLogout={handleLogout} />
      )}
    </main>
  );
};

export default Index;
