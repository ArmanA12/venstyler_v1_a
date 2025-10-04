import { useEffect, useState } from "react";
import { Shirt, Scissors, TruckIcon, Package, Sparkles, Heart } from "lucide-react";

const PremiumLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [progress, setProgress] = useState(0);

  const icons = [
    { Icon: Shirt, label: "Curating Designs", color: "from-purple-500 to-pink-500" },
    { Icon: Scissors, label: "Precision Crafting", color: "from-blue-500 to-cyan-500" },
    { Icon: Sparkles, label: "Premium Quality", color: "from-amber-500 to-yellow-500" },
    { Icon: Package, label: "Elegant Packaging", color: "from-green-500 to-emerald-500" },
    { Icon: TruckIcon, label: "Swift Delivery", color: "from-red-500 to-orange-500" },
    { Icon: Heart, label: "With Love", color: "from-pink-500 to-rose-500" },
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 25);

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Main Animated Circle */}
        <div className="relative h-64 w-64">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-4 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          
          {/* Icons in Orbit */}
          {icons.map((item, index) => {
            const Icon = item.Icon;
            const angle = (index / icons.length) * 360;
            const isActive = index === currentIcon;
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                style={{
                  transform: `rotate(${angle}deg) translateY(-90px) rotate(-${angle}deg)`,
                  opacity: isActive ? 1 : 0.3,
                }}
              >
                <div 
                  className={`relative rounded-2xl p-5 transition-all duration-700 backdrop-blur-md ${
                    isActive 
                      ? "scale-125 shadow-2xl" 
                      : "scale-90"
                  }`}
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))`
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-75 blur-lg animate-pulse" 
                        style={{ background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})` }} 
                      />
                    </>
                  )}
                  <Icon className={`h-10 w-10 relative z-10 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                </div>
              </div>
            );
          })}
          
          {/* Center Hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Hexagon Shape */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-pulse">
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
                    </linearGradient>
                  </defs>
                  <polygon 
                    points="50 5, 93.3 27.5, 93.3 72.5, 50 95, 6.7 72.5, 6.7 27.5" 
                    fill="url(#hexGradient)"
                    className="drop-shadow-2xl"
                  />
                </svg>
                <Sparkles className="h-10 w-10 text-white relative z-10 animate-spin" style={{ animationDuration: "4s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name with Gradient */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent animate-fade-in tracking-wide">
            VenStyler
          </h2>
          <p className="text-base text-muted-foreground animate-pulse font-light tracking-widest">
            {icons[currentIcon].label}
          </p>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-80 space-y-3">
          <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-light">
            <span>Loading Experience</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
