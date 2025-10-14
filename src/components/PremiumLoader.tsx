// import { useEffect, useState } from "react";
// import { Shirt, Scissors, TruckIcon, Package, Sparkles, Heart } from "lucide-react";

// const PremiumLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
//   const [currentIcon, setCurrentIcon] = useState(0);
//   const [progress, setProgress] = useState(0);

//   const icons = [
//     { Icon: Shirt, label: "Designs" },
//     { Icon: Scissors, label: "Crafting" },
//     { Icon: Sparkles, label: "Premium" },
//     { Icon: Package, label: "Packaging" },
//     { Icon: TruckIcon, label: "Delivery" },
//     { Icon: Heart, label: "Love" },
//   ];

//   useEffect(() => {
//     const iconInterval = setInterval(() => {
//       setCurrentIcon((prev) => (prev + 1) % icons.length);
//     }, 400);

//     const progressInterval = setInterval(() => {
//       setProgress((prev) => Math.min(prev + 2, 100));
//     }, 50);

//     const timer = setTimeout(() => {
//       onLoadingComplete();
//     }, 2800);

//     return () => {
//       clearInterval(iconInterval);
//       clearInterval(progressInterval);
//       clearTimeout(timer);
//     };
//   }, [onLoadingComplete]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
//       {/* Subtle grid pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      
//       <div className="relative flex flex-col items-center gap-12">
//         {/* Clean Icon Display */}
//         <div className="relative h-32 w-32">
//           {icons.map((item, index) => {
//             const Icon = item.Icon;
//             const isActive = index === currentIcon;
            
//             return (
//               <div
//                 key={index}
//                 className="absolute inset-0 flex items-center justify-center transition-all duration-500"
//                 style={{
//                   opacity: isActive ? 1 : 0,
//                   transform: isActive ? 'scale(1)' : 'scale(0.8)',
//                 }}
//               >
//                 <div className="rounded-full p-6 bg-card border border-border/50 shadow-lg">
//                   <Icon className="h-12 w-12 text-foreground" />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Brand Name */}
//         <div className="text-center space-y-3">
//           <h2 className="text-3xl font-bold text-foreground tracking-tight">
//             VenStyler
//           </h2>
//           <p className="text-sm text-muted-foreground font-medium">
//             {icons[currentIcon].label}
//           </p>
//         </div>

//         {/* Clean Progress Bar */}
//         <div className="w-64 space-y-2">
//           <div className="h-1 bg-muted rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-foreground rounded-full transition-all duration-100 ease-linear"
//               style={{
//                 width: `${progress}%`,
//               }}
//             />
//           </div>
//           <p className="text-xs text-center text-muted-foreground">{progress}%</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumLoader;


import { useEffect, useState } from "react";
import { Shirt, Scissors, TruckIcon, Package, Sparkles, Heart } from "lucide-react";

const PremiumLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); // Track whether the loader has been shown

  const icons = [
    { Icon: Shirt, label: "Designs" },
    { Icon: Scissors, label: "Crafting" },
    { Icon: Sparkles, label: "Premium" },
    { Icon: Package, label: "Packaging" },
    { Icon: TruckIcon, label: "Delivery" },
    { Icon: Heart, label: "Love" },
  ];

  useEffect(() => {
    if (hasLoaded) {
      return; // If it's already loaded, do nothing
    }

    // If it's the first time loading the page in the session, show the loader
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 50);

    // After the loader completes, mark that the loader has been shown
    const timer = setTimeout(() => {
      setHasLoaded(true); // Mark that the loader has been shown
      onLoadingComplete(); // Trigger the completion callback
    }, 2800); // Duration for the loader

    // Cleanup the intervals and timeout after the component unmounts
    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [hasLoaded, onLoadingComplete]); // Only trigger if `hasLoaded` is false initially

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      
      <div className="relative flex flex-col items-center gap-12">
        {/* Clean Icon Display */}
        <div className="relative h-32 w-32">
          {icons.map((item, index) => {
            const Icon = item.Icon;
            const isActive = index === currentIcon;
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(0.8)',
                }}
              >
                <div className="rounded-full p-6 bg-card border border-border/50 shadow-lg">
                  <Icon className="h-12 w-12 text-foreground" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            VenStyler
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            {icons[currentIcon].label}
          </p>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-64 space-y-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoader;
