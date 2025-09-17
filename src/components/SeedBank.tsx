import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Sprout, 
  ShoppingCart, 
  Plus, 
  Star,
  MapPin,
  Phone,
  User
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Seed {
  id: string;
  name: string;
  variety: string;
  price: number;
  quantity: number;
  seller: string;
  location: string;
  quality: string;
  image?: string;
  description?: string;
  contact?: string;
}

const sampleSeeds: Seed[] = [
  {
    id: "1",
    name: "गेहूं",
    variety: "HD-2967",
    price: 25,
    quantity: 500,
    seller: "राम प्रसाद",
    location: "पंजाब",
    quality: "high_quality",
    description: "उच्च गुणवत्ता वाला गेहूं बीज",
    contact: "+91 98765 43210"
  },
  {
    id: "2", 
    name: "धान",
    variety: "बासमती-1121",
    price: 80,
    quantity: 200,
    seller: "सुरेश कुमार",
    location: "हरियाणा",
    quality: "organic_certified",
    description: "जैविक प्रमाणित बासमती धान",
    contact: "+91 98765 43211"
  },
  {
    id: "3",
    name: "मक्का",
    variety: "हाइब्रिड-30",
    price: 35,
    quantity: 300,
    seller: "विकास शर्मा",
    location: "उत्तर प्रदेश",
    quality: "medium_quality",
    description: "हाइब्रिड मक्का बीज",
    contact: "+91 98765 43212"
  }
];

export function SeedBank() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("buy");
  const [seeds] = useState<Seed[]>(sampleSeeds);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case "high_quality": return "bg-crop text-white";
      case "organic_certified": return "bg-harvest text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8 text-crop" />
            <h2 className="text-2xl font-semibold">{t("seed_marketplace")}</h2>
          </div>
          
          <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="farmer" className="gap-2">
                <Plus className="w-4 h-4" />
                {t("post_listing")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t("sell_seeds")}</DialogTitle>
              </DialogHeader>
              <SeedPostForm onClose={() => setIsPostDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy">{t("buy_seeds")}</TabsTrigger>
            <TabsTrigger value="sell">{t("sell_seeds")}</TabsTrigger>
            <TabsTrigger value="my-listings">{t("my_listings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-6">
            <SeedMarketplace seeds={seeds} />
          </TabsContent>

          <TabsContent value="sell" className="mt-6">
            <div className="text-center py-12">
              <Sprout className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("sell_seeds")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("post_listing")} {t("post_for_sale")}
              </p>
              <Button 
                variant="farmer" 
                onClick={() => setIsPostDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("post_listing")}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="my-listings" className="mt-6">
            <div className="text-center py-12">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("my_listings")}</h3>
              <p className="text-muted-foreground">
                आपकी कोई सूची नहीं है। पहली सूची जोड़ें।
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function SeedMarketplace({ seeds }: { seeds: Seed[] }) {
  const { t } = useLanguage();

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case "high_quality": return "bg-crop text-white";
      case "organic_certified": return "bg-harvest text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {seeds.map((seed) => (
        <Card key={seed.id} className="p-4 hover-lift">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{seed.name}</h3>
                <p className="text-sm text-muted-foreground">{seed.variety}</p>
              </div>
              <Badge className={`${getQualityBadgeColor(seed.quality)} text-xs`}>
                {t(seed.quality)}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t("price_per_kg")}:</span>
                <span className="font-semibold">₹{seed.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t("available_quantity")}:</span>
                <span>{seed.quantity} kg</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{seed.seller}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{seed.location}</span>
              </div>
            </div>

            {seed.description && (
              <p className="text-sm text-muted-foreground">{seed.description}</p>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-1" />
                {t("contact_seller")}
              </Button>
              <Button variant="farmer" size="sm" className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-1" />
                {t("add_to_cart")}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SeedPostForm({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    seedName: "",
    variety: "",
    price: "",
    quantity: "",
    description: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save to backend
    console.log("Posting seed listing:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seedName">{t("seed_name")}</Label>
        <Input
          id="seedName"
          value={formData.seedName}
          onChange={(e) => setFormData({...formData, seedName: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="variety">{t("variety")}</Label>
        <Input
          id="variety"
          value={formData.variety}
          onChange={(e) => setFormData({...formData, variety: e.target.value})}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{t("selling_price")} (₹/kg)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">{t("quantity_kg")}</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t("description")}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">{t("contact_info")}</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => setFormData({...formData, contact: e.target.value})}
          placeholder="+91 XXXXX XXXXX"
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          रद्द करें
        </Button>
        <Button type="submit" variant="farmer" className="flex-1">
          {t("post_for_sale")}
        </Button>
      </div>
    </form>
  );
}