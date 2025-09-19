import React, { useState, useRef } from "react";

export function ImageMagnifier({ src, zoom = 2, lensSize = 150 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - imgRect.left;
    const y = e.clientY - imgRect.top;


    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      setLens(null);
    } else {
      setLens({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg"
      onMouseMove={handleMove}
      onMouseLeave={() => setLens(null)}
    >
      <img
        ref={imgRef}
        src={src}
        alt="zoom"
        className="w-full h-full object-cover select-none"
        draggable={false}
      />

      {lens && imgRef.current && (
        <div
          className="absolute pointer-events-none rounded-full border border-gray-300/10 shadow-md"
          style={{
            width: lensSize,
            height: lensSize,
            top: lens.y - lensSize / 2 + imgRef.current.offsetTop,
            left: lens.x - lensSize / 2 + imgRef.current.offsetLeft,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgRef.current.width * zoom}px ${imgRef.current.height * zoom}px`,
            backgroundPosition: `${-lens.x * zoom + lensSize / 2}px ${
              -lens.y * zoom + lensSize / 2
            }px`,
          }}
        />
      )}
    </div>
  );
}
