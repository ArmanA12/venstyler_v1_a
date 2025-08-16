import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { images: string[]; alt?: string; className?: string };

export default function ImageCarousel({
  images,
  alt = "Image",
  className = "",
}: Props) {
  const [idx, setIdx] = useState(0);
  const total = images?.length ?? 0;

  // swipe
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 40;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    startX.current = null;
    deltaX.current = 0;
  };

  // keyboard
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const next = () => setIdx((i) => (i + 1) % Math.max(1, total));
  const prev = () =>
    setIdx((i) => (i - 1 + Math.max(1, total)) % Math.max(1, total));

  if (!total)
    return <div className={`w-full aspect-square bg-muted ${className}`} />;

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-square overflow-hidden group ${className}`}
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* gradient BEHIND controls */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* track */}
      <div
        className="flex h-full transition-transform duration-500 will-change-transform"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(-${(idx * 100) / total}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="h-full"
            style={{ width: `${100 / total}%`, flex: "0 0 auto" }}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="block w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* counter */}
      {total > 1 && (
        <span className="absolute z-20 top-3 right-3 text-xs px-2 py-0.5 rounded bg-black/60 text-white">
          {idx + 1}/{total}
        </span>
      )}

      {/* arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute z-20 left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute z-20 right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* dots */}
      {total > 1 && (
        <div className="absolute z-20 bottom-3 inset-x-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
