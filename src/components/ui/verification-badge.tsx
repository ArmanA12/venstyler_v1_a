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
      "inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0",
      sizeClasses[size],
      className
    )}>
      <Check className={cn("stroke-[3]", iconSizes[size])} />
    </div>
  );
};