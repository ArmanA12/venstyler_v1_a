import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  className,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5"
  };

  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex-shrink-0 shadow-lg shadow-blue-500/25 ring-2 ring-white/20 relative",
      sizeClasses[size],
      className
    )}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-50 blur-sm"></div>
      <Check className={cn("stroke-[3] relative z-10", iconSizes[size])} />
    </div>
  );
};