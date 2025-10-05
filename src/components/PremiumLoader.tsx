import { useEffect, useState } from "react";
import { Shirt, Scissors, TruckIcon, Package, Sparkles, Heart } from "lucide-react";

const PremiumLoader = ({ onLoadingComplete }: { onLoadingComplete?: () => void }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [progress, setProgress] = useState(0);

  const icons = [
    { Icon: Shirt, label: "Fashion Designs", color: "from-pink-500 to-rose-500" },
    { Icon: Scissors, label: "Crafting Excellence", color: "from-purple-500 to-indigo-500" },
    { Icon: Sparkles, label: "Premium Quality", color: "from-amber-500 to-orange-500" },
    { Icon: Package, label: "Careful Packaging", color: "from-blue-500 to-cyan-500" },
    { Icon: TruckIcon, label: "Fast Delivery", color: "from-green-500 to-emerald-500" },
    { Icon: Heart, label: "Made with Love", color: "from-red-500 to-pink-500" },
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  const { Icon, label, color } = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-8 animate-fade-in">
        {/* Animated Icon Container */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="absolute inset-0 -m-8 rounded-full border-2 border-border/20 animate-[spin_3s_linear_infinite]" />
          
          {/* Icon Display with Smooth Transition */}
          <div className="relative h-32 w-32 flex items-center justify-center">
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                transform: `scale(${1})`,
                opacity: 1,
              }}
            >
              <div className={`rounded-2xl p-6 bg-gradient-to-br ${color} shadow-2xl shadow-primary/20`}>
                <Icon className="h-16 w-16 text-white animate-scale-in" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Inner Pulse Ring */}
          <div className="absolute inset-0 m-4 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        {/* Brand Name with Elegant Typography */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
            VenStyler
          </h1>
          <p className="text-base text-muted-foreground font-medium tracking-wide animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {label}
          </p>
        </div>

        {/* Elegant Progress Bar */}
        <div className="w-72 space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300 ease-out shadow-lg shadow-primary/50"
              style={{
                width: `${progress}%`,
                transform: 'translateZ(0)', // Hardware acceleration
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Loading your experience</span>
            <span className="font-semibold text-foreground tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
