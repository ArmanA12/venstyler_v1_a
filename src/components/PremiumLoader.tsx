import { useEffect, useState } from "react";
import { Shirt, Scissors, TruckIcon, Package, Sparkles, Heart } from "lucide-react";

const PremiumLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { Icon: Shirt, label: "Designs" },
    { Icon: Scissors, label: "Crafting" },
    { Icon: Sparkles, label: "Premium" },
    { Icon: Package, label: "Packaging" },
    { Icon: TruckIcon, label: "Delivery" },
    { Icon: Heart, label: "Love" },
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 400);

    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2800);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Icons Circle */}
        <div className="relative h-32 w-32">
          {icons.map((item, index) => {
            const Icon = item.Icon;
            const angle = (index / icons.length) * 360;
            const isActive = index === currentIcon;
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{
                  transform: `rotate(${angle}deg) translateY(-60px) rotate(-${angle}deg)`,
                  opacity: isActive ? 1 : 0.2,
                  scale: isActive ? 1.2 : 0.8,
                }}
              >
                <div className={`rounded-full p-4 transition-all duration-500 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            );
          })}
          
          {/* Center Logo/Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-background/80 backdrop-blur-sm p-4 border-2 border-primary/20">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            VenStyler
          </h2>
          <p className="text-sm text-muted-foreground animate-pulse">
            {icons[currentIcon].label}...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300"
            style={{
              width: `${((currentIcon + 1) / icons.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
