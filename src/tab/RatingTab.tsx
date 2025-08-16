// RatingsTab.tsx
import { useMyProductReviewsAndRatings } from "@/hooks/useMyProductReviewsAnd Ratings";
import { Star } from "lucide-react";

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= filled ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export function RatingsTab() {
  const { data, isLoading, isError } = useMyProductReviewsAndRatings();

  if (isLoading)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Product Ratings
        </h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-muted/30 rounded-lg animate-pulse h-28"
            />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Product Ratings
        </h3>
        <p className="text-sm text-destructive">
          Failed to load reviews. Please try again.
        </p>
      </div>
    );

  if (!data?.length)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Product Ratings
        </h3>
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      </div>
    );

  return (
    <div className="fashion-card p-6">
      <h3 className="text-xl font-playfair font-semibold mb-4">
        Product Ratings
      </h3>
      <div className="space-y-4">
        {data.map((d) => {
          const latest = [...d.reviews].sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
          )[0];
          return (
            <div key={d.designId} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                  {d.images[0] && (
                    <img
                      src={d.images[0]}
                      alt={d.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{d.title}</h4>
                  <div className="flex items-center gap-2 my-2">
                    <Stars value={d.avgRating ?? 0} />
                    <span className="text-sm text-muted-foreground ml-1">
                      ({d.avgRating ?? "0.0"})
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {d.totalRatings} rating{d.totalRatings === 1 ? "" : "s"}
                    </span>
                  </div>
                  {latest ? (
                    <>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {latest.comment || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        — {latest.user.name || "User"} •{" "}
                        {new Date(latest.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No review comments yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
