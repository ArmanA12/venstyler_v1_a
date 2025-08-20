// RatingsTab.tsx
import { useMyProductReviewsAndRatings } from "@/hooks/useMyProductReviewsAnd Ratings";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

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
  console.log(data, "data from API for review and rating");

  if (isLoading)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">Product Ratings</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg animate-pulse h-28" />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">Product Ratings</h3>
        <p className="text-sm text-destructive">Failed to load reviews. Please try again.</p>
      </div>
    );

  if (!data?.length)
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">Product Ratings</h3>
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      </div>
    );

  return (
    <div className="fashion-card p-6">
      <h3 className="text-xl font-playfair font-semibold mb-4">Product Ratings</h3>
      <div className="space-y-6">
        {data.map((product) => (
          <Link className="border border-transparent" to={`/product/${product.designId}/reviews`}>
                    <div key={product.designId} className="p-4 bg-muted/30 rounded-lg">
            {/* Product Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{product.title}</h4>
                <div className="flex items-center gap-2 my-2">
                  <Stars value={product.avgRating ?? 0} />
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.avgRating ?? "0.0"})
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {product.totalRatings} rating{product.totalRatings === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {/* <div className="space-y-3">
              {product.reviews?.length ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="border-t pt-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.user.profileImage}
                        alt={review.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium">{review.user.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                    {review.images?.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="review"
                            className="w-12 h-12 rounded object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </div> */}
          </div></Link>
        ))}
      </div>
    </div>
  );
}
