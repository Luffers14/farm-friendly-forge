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

interface MainDashboardProps {
  farmerName?: string;
  onLogout: () => void;
}

export function MainDashboard({ farmerName = "किसान भाई", onLogout }: MainDashboardProps) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "सुप्रभात";
    if (hour < 17) return "नमस्ते";
    return "शुभ संध्या";
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
                डिजिटल कृषि प्लेटफॉर्म
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
              </Button>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{getCurrentGreeting()}, {farmerName}</p>
                <p className="text-xs text-muted-foreground">आज का दिन शुभ हो</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                लॉगआउट
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
                    <span className="hidden sm:inline">{item.label}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Weather Card */}
      <Card className="p-6 bg-gradient-earth shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">आज का मौसम</h3>
          <Badge variant="secondary">दिल्ली, भारत</Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold">28°C</p>
              <p className="text-sm text-muted-foreground">तापमान</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-sky-blue" />
            <div>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-sm text-muted-foreground">नमी</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">12 km/h</p>
              <p className="text-sm text-muted-foreground">हवा</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-sky-blue" />
            <div>
              <p className="text-2xl font-bold">2.5mm</p>
              <p className="text-sm text-muted-foreground">बारिश</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-card/50 rounded-lg">
          <p className="text-sm">
            <strong>सलाह:</strong> फसल की सिंचाई के लिए अच्छा समय है। आज खाद डालने की सलाह दी जाती है।
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
              <p className="text-sm text-muted-foreground">दिन की लकीर</p>
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
              <p className="text-sm text-muted-foreground">कुल व्यापार</p>
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
              <p className="text-sm text-muted-foreground">पॉइंट्स</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">त्वरित कार्य</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="farmer" className="h-16 flex-col gap-2">
            <Leaf className="w-6 h-6" />
            फसल की सिफारिश
          </Button>
          <Button variant="earth" className="h-16 flex-col gap-2">
            <Sprout className="w-6 h-6" />
            बीज बैंक देखें
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            नई तकनीक सीखें
          </Button>
        </div>
      </Card>
    </div>
  );
}

function WeatherContent() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">मौसम की विस्तृत जानकारी</h3>
      <p className="text-muted-foreground">विस्तृत मौसम की जानकारी यहां दिखाई जाएगी...</p>
    </Card>
  );
}

function CropRecommendationContent() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">स्मार्ट फसल सिफारिश</h3>
      <p className="text-muted-foreground">फसल सिफारिश सिस्टम यहां होगा...</p>
    </Card>
  );
}

function LearningContent() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">सीखने का केंद्र</h3>
      <p className="text-muted-foreground">कृषि शिक्षा सामग्री यहां उपलब्ध होगी...</p>
    </Card>
  );
}

function CommunityContent() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">किसान समुदाय</h3>
      <p className="text-muted-foreground">समुदाय चर्चा और सवाल-जवाब यहां होगा...</p>
    </Card>
  );
}

function SchemesContent() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold mb-6">सरकारी योजनाएं</h3>
      <p className="text-muted-foreground">सरकारी योजनाओं की जानकारी यहां मिलेगी...</p>
    </Card>
  );
}

const navigationItems = [
  { id: "dashboard", label: "डैशबोर्ड", icon: BarChart3 },
  { id: "weather", label: "मौसम", icon: Cloud },
  { id: "crops", label: "फसल सुझाव", icon: Leaf },
  { id: "learning", label: "सीखें", icon: BookOpen },
  { id: "community", label: "समुदाय", icon: Users },
  { id: "schemes", label: "योजनाएं", icon: Building2 },
];