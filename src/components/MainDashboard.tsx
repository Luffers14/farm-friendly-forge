import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  TrendingUp,
  Users,
  Leaf,
  BookOpen,
  Building2,
  Sprout,
  BarChart3,
  Bell
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SeedBank } from "@/components/SeedBank";

interface MainDashboardProps {
  farmerName?: string;
  onLogout: () => void;
}

export function MainDashboard({ farmerName = "किसान भाई", onLogout }: MainDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { t, currentLanguage } = useLanguage();

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting_morning");
    if (hour < 17) return t("greeting_afternoon");
    return t("greeting_evening");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-crop">🌾 KrishiDwar</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {currentLanguage.code === 'en' ? 'Digital Agriculture Platform' : 'डिजिटल कृषि प्लेटफॉर्म'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
              </Button>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{getCurrentGreeting()}, {farmerName}</p>
                <p className="text-xs text-muted-foreground">{t("have_a_good_day")}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 shadow-soft">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "farmer" : "ghost"}
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{t(item.label)}</span>
                  </Button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeSection === "dashboard" && <DashboardContent />}
            {activeSection === "weather" && <WeatherContent />}
            {activeSection === "crops" && <CropRecommendationContent />}
            {activeSection === "learning" && <LearningContent />}
            {activeSection === "community" && <CommunityContent />}
            {activeSection === "schemes" && <SchemesContent />}
            {activeSection === "seed-bank" && <SeedBank />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      {/* Weather Card */}
      <Card className="p-6 bg-gradient-earth shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{t("todays_weather")}</h3>
          <Badge variant="secondary">दिल्ली, भारत</Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold">28°C</p>
              <p className="text-sm text-muted-foreground">{t("temperature")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-sky-blue" />
            <div>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-sm text-muted-foreground">{t("humidity")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">12 km/h</p>
              <p className="text-sm text-muted-foreground">{t("wind")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-sky-blue" />
            <div>
              <p className="text-2xl font-bold">2.5mm</p>
              <p className="text-sm text-muted-foreground">{t("rainfall")}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-card/50 rounded-lg">
          <p className="text-sm">
            <strong>{t("advice")}:</strong> {t("weather_advice")}
          </p>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-crop/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-crop" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">{t("daily_streak")}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-harvest/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-harvest" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{t("total_trades")}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover-lift">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-earth/10 rounded-lg">
              <Users className="w-6 h-6 text-earth" />
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{t("points")}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t("quick_actions")}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="farmer" className="h-16 flex-col gap-2">
            <Leaf className="w-6 h-6" />
            {t("crop_recommendation")}
          </Button>
          <Button variant="earth" className="h-16 flex-col gap-2">
            <Sprout className="w-6 h-6" />
            {t("view_seed_bank")}
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            {t("learn_new_techniques")}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function WeatherContent() {
  const { t, currentLanguage } = useLanguage();
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {currentLanguage.code === 'en' ? 'Detailed Weather Information' : 'मौसम की विस्तृत जानकारी'}
      </h3>
      <p className="text-muted-foreground">
        {currentLanguage.code === 'en' ? 'Detailed weather information will be displayed here...' : 'विस्तृत मौसम की जानकारी यहां दिखाई जाएगी...'}
      </p>
    </Card>
  );
}

function CropRecommendationContent() {
  const { t, currentLanguage } = useLanguage();
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {currentLanguage.code === 'en' ? 'Smart Crop Recommendations' : 'स्मार्ट फसल सिफारिश'}
      </h3>
      <p className="text-muted-foreground">
        {currentLanguage.code === 'en' ? 'Crop recommendation system will be here...' : 'फसल सिफारिश सिस्टम यहां होगा...'}
      </p>
    </Card>
  );
}

function LearningContent() {
  const { t, currentLanguage } = useLanguage();
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {currentLanguage.code === 'en' ? 'Learning Center' : 'सीखने का केंद्र'}
      </h3>
      <p className="text-muted-foreground">
        {currentLanguage.code === 'en' ? 'Agriculture learning materials will be available here...' : 'कृषि शिक्षा सामग्री यहां उपलब्ध होगी...'}
      </p>
    </Card>
  );
}

function CommunityContent() {
  const { t, currentLanguage } = useLanguage();
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {currentLanguage.code === 'en' ? 'Farmer Community' : 'किसान समुदाय'}
      </h3>
      <p className="text-muted-foreground">
        {currentLanguage.code === 'en' ? 'Community discussions and Q&A will be here...' : 'समुदाय चर्चा और सवाल-जवाब यहां होगा...'}
      </p>
    </Card>
  );
}

function SchemesContent() {
  const { t, currentLanguage } = useLanguage();
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {currentLanguage.code === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
      </h3>
      <p className="text-muted-foreground">
        {currentLanguage.code === 'en' ? 'Information about government schemes will be available here...' : 'सरकारी योजनाओं की जानकारी यहां मिलेगी...'}
      </p>
    </Card>
  );
}

const navigationItems = [
  { id: "dashboard", label: "dashboard", icon: BarChart3 },
  { id: "weather", label: "weather", icon: Cloud },
  { id: "crops", label: "crop_suggestions", icon: Leaf },
  { id: "seed-bank", label: "seed_bank", icon: Sprout },
  { id: "learning", label: "learn", icon: BookOpen },
  { id: "community", label: "community", icon: Users },
  { id: "schemes", label: "schemes", icon: Building2 },
];