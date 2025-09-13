import React, { useState } from 'react';
import { VenStylerLogo } from './VenStylerLogo';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackSize?: 'sm' | 'md' | 'lg';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSize = 'md'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <VenStylerLogo size={fallbackSize} />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-muted ${className}`}>
          <VenStylerLogo size={fallbackSize} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};