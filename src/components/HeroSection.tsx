import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/agriculture-hero.jpg";
import dashboardIllustration from "@/assets/dashboard-illustration.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              🌾 <span className="text-harvest">KrishiDwar</span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-white mb-6 font-medium">
              डिजिटल कृषि प्लेटफॉर्म
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              भारतीय किसानों के लिए संपूर्ण डिजिटल समाधान - फसल सुझाव, मौसम की जानकारी, 
              बीज बैंक और सरकारी योजनाओं की पूरी जानकारी
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onGetStarted}
                className="hover-glow"
              >
                शुरू करें / Get Started
              </Button>
              <Button 
                variant="earth" 
                size="xl"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                और जानें / Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
              किसानों के लिए बनाया गया
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              12+ भारतीय भाषाओं में उपलब्ध, आधुनिक तकनीक के साथ पारंपरिक कृषि का सही मेल
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-lift shadow-soft bg-white/80 backdrop-blur-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-earth">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-crop">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <img 
              src={dashboardIllustration} 
              alt="KrishiDwar Dashboard" 
              className="w-32 h-32 mx-auto mb-8 rounded-2xl shadow-medium"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              आज ही शुरू करें अपनी डिजिटल कृषि यात्रा
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              हजारों किसान पहले से ही KrishiDwar का उपयोग करके अपनी फसल की पैदावार बढ़ा रहे हैं
            </p>
            <Button 
              variant="farmer" 
              size="xl" 
              onClick={onGetStarted}
              className="hover-glow text-lg px-12 py-4"
            >
              मुफ्त में शुरू करें / Start Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🌦️",
    title: "मौसम की सटीक जानकारी",
    description: "अपने क्षेत्र के लिए सटीक मौसम पूर्वानुमान और कृषि सलाह प्राप्त करें"
  },
  {
    icon: "🌾",
    title: "स्मार्ट फसल सुझाव",
    description: "मिट्टी, पानी और मौसम के आधार पर सबसे अच्छी फसल का चुनाव करें"
  },
  {
    icon: "🌱",
    title: "बीज बैंक",
    description: "उच्च गुणवत्ता वाले बीजों की जानकारी और उपलब्धता की पूरी सूची"
  },
  {
    icon: "📚",
    title: "सीखने का केंद्र",
    description: "आधुनिक कृषि तकनीकों और बेहतर फसल उत्पादन के तरीके सीखें"
  },
  {
    icon: "👥",
    title: "किसान समुदाय",
    description: "अन्य किसानों से जुड़ें, अनुभव साझा करें और सवाल पूछें"
  },
  {
    icon: "🏛️",
    title: "सरकारी योजनाएं",
    description: "सभी कृषि संबंधी सरकारी योजनाओं की जानकारी और आवेदन प्रक्रिया"
  }
];