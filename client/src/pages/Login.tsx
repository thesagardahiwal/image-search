import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Facebook,
  Mail,
  Shield,
  Sparkles,
  Zap,
  Image,
  Search,
  History,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";

export const Login: React.FC = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { icon: Image, text: "4K Image Results", color: "text-emerald-400" },
    { icon: History, text: "Smart History", color: "text-purple-400" },
    { icon: Star, text: "Curated Collections", color: "text-yellow-400" },
    { icon: Zap, text: "Lightning Fast", color: "text-pink-400" },
  ];

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIndex((i) => (i + 1) % features.length),
      2500
    );
    return () => clearInterval(interval);
  }, []);

  const FeatureIcon = features[activeIndex].icon;

  const OAuthButton = ({
    provider,
    icon: Icon,
    gradient,
  }: {
    provider: string;
    icon: React.ElementType;
    gradient: string;
  }) => (
    <Button
      disabled={loading}
      onClick={() => login(provider.toLowerCase())}
      className={`
        w-full relative overflow-hidden rounded-xl py-3 px-4 
        flex items-center justify-center gap-3 
        text-white font-medium text-base 
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20
        ${gradient} hover:brightness-110 hover:scale-[1.02]
      `}
    >
      <Icon className="w-5 h-5" />
      {loading ? "Connecting..." : `Continue with ${provider}`}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <CardHeader className="text-center space-y-3 py-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl text-white drop-shadow-md">🔍</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              ImageSearch
            </CardTitle>
            <p className="text-white/70 text-base font-light">
              Discover high-quality visuals in seconds.
            </p>
          </CardHeader>

          {/* Feature Rotation */}
          <CardContent className="px-8 pb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FeatureIcon
                  className={`w-6 h-6 ${features[activeIndex].color} drop-shadow-sm`}
                />
                <span className="text-white/90 text-lg font-medium">
                  {features[activeIndex].text}
                </span>
              </div>
              <div className="flex justify-center gap-1 mt-1">
                {features.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-4">
              <OAuthButton
                provider="Google"
                icon={Mail}
                gradient="bg-gradient-to-r from-red-500 to-orange-500"
              />
              <OAuthButton
                provider="Facebook"
                icon={Facebook}
                gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
              />
              <OAuthButton
                provider="GitHub"
                icon={Github}
                gradient="bg-gradient-to-r from-gray-800 to-black"
              />
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-white/10 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-3 text-white/50 text-sm">
                or
              </span>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { icon: Search, text: "Smart Search" },
                { icon: Image, text: "HD Images" },
                { icon: History, text: "History Sync" },
                { icon: Shield, text: "Data Secure" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all duration-300"
                >
                  <f.icon className="w-4 h-4 text-white/70" />
                  <span className="text-white/80 text-xs font-medium">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Line */}
            <div className="flex items-center justify-center mt-8 space-x-4 text-white/60 text-xs">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>Modern</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Fast</span>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-6">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
