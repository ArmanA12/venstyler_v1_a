import React from 'react';
import venStylerLogo from '@/assets/venstyler-logo.png';

interface VenStylerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VenStylerLogo: React.FC<VenStylerLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg ${sizeClasses[size]} ${className}`}>
      <img 
        src={venStylerLogo} 
        alt="venStyler" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};