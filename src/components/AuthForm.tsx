import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [village, setVillage] = useState("");
  const [landSize, setLandSize] = useState("");

  const handleSendOTP = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true);
      // In real app, send OTP via SMS
      console.log("OTP sent to:", mobileNumber);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent && otp.length === 6) {
      onAuthSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-crop mb-2">🌾 KrishiDwar</h1>
          <h2 className="text-2xl font-semibold mb-2">
            {isLogin ? "स्वागत है / Welcome" : "खाता बनाएं / Register"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin 
              ? "वापस आने के लिए धन्यवाद, किसान भाई!"
              : "अपना खाता बनाएं और शुरू करें"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="farmerName">किसान का नाम / Farmer Name</Label>
                <Input
                  id="farmerName"
                  type="text"
                  placeholder="अपना नाम दर्ज करें"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">गांव / Village</Label>
                  <Input
                    id="village"
                    type="text"
                    placeholder="गांव का नाम"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landSize">जमीन (एकड़) / Land (Acres)</Label>
                  <Input
                    id="landSize"
                    type="number"
                    placeholder="5"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="mobile">मोबाइल नंबर / Mobile Number</Label>
            <div className="flex gap-2">
              <Input
                id="mobile"
                type="tel"
                placeholder="9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
                required
                className="h-12"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSendOTP}
                disabled={mobileNumber.length !== 10 || otpSent}
                className="whitespace-nowrap"
              >
                {otpSent ? "भेजा गया" : "OTP भेजें"}
              </Button>
            </div>
          </div>

          {otpSent && (
            <div className="space-y-2">
              <Label htmlFor="otp">OTP (6 अंक)</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="h-12 text-center text-lg tracking-widest"
              />
              <p className="text-sm text-muted-foreground">
                OTP {mobileNumber} पर भेजा गया है
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="farmer"
            size="lg"
            className="w-full"
            disabled={!otpSent || otp.length !== 6}
          >
            {isLogin ? "लॉगिन करें / Login" : "खाता बनाएं / Create Account"}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {isLogin ? "नया उपयोगकर्ता हैं?" : "पहले से खाता है?"}
          </p>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              setOtpSent(false);
              setOtp("");
            }}
            className="font-medium text-crop"
          >
            {isLogin ? "नया खाता बनाएं" : "लॉगिन करें"}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <p className="text-xs text-center text-muted-foreground">
            🔒 आपकी जानकारी पूरी तरह सुरक्षित है। हम आपके डेटा की गोपनीयता का सम्मान करते हैं।
          </p>
        </div>
      </Card>
    </div>
  );
}