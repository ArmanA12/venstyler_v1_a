"use client";

import { motion } from "framer-motion";
import React from "react";

export interface MarqueeImage {
  src: string;
  alt: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number; // default is 4
  onImageClick?: (image: MarqueeImage, index: number) => void;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
}) => {
  // Clone the image list twice
  const duplicatedImages = [...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`mx-auto block h-[700px] max-sm:h-[500px] 
        overflow-hidden rounded-3xl bg-background/80 backdrop-blur-xl border border-border/20 shadow-2xl ${className}`}
    >
      <div
        className="flex w-full h-full items-center justify-center p-8"
        style={{
          transform: "rotateX(45deg) rotateY(-5deg) rotateZ(35deg)",
          perspective: "1000px",
        }}
      >
        <div className="w-full overflow-hidden scale-75 sm:scale-90">
          <div
            className={`relative grid h-full w-full origin-center 
              grid-cols-2 sm:grid-cols-${cols} gap-8 transform 
              `}
          >
            {imageGroups.map((imagesInGroup, idx) => (
              <motion.div
                key={`column-${idx}`}
                animate={{ 
                  y: idx % 2 === 0 ? [0, 80, 0] : [0, -80, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{
                  duration: idx % 2 === 0 ? 12 : 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-8 relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {imagesInGroup.map((image, imgIdx) => {
                  const globalIndex = idx * groupSize + imgIdx;
                  const isClickable = image.href || onImageClick;

                  return (
                    <motion.div 
                      key={`img-${imgIdx}`} 
                      className="relative group"
                      whileHover={{ 
                        y: -15, 
                        scale: 1.08,
                        rotateX: 10,
                        rotateY: idx % 2 === 0 ? 8 : -8,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-white dark:bg-black rounded-xl opacity-20 blur-xl transform translate-y-4 scale-110" />
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={970}
                        height={700}
                        className={`aspect-[4/5] w-full max-w-[180px] rounded-xl object-cover 
                          shadow-xl group-hover:shadow-2xl transition-all duration-500
                          border border-white/10 backdrop-blur-sm
                          ${isClickable ? "cursor-pointer" : ""}`}
                        onClick={() => handleImageClick(image, globalIndex)}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-xl" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-xs font-medium text-foreground">Premium Collection</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};