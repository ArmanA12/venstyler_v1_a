import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Star, ThumbsUp, Flag, MessageCircle,
  Image as ImageIcon, X, ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";

const ProductReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // States
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ratingDistribution, setRatingDistribution] = useState<any[]>([]);
  const designId = id;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  // Helpful click states
  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, boolean>>({});

  // ✅ Fetch reviews from backend
  const fetchReviews = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/design/${designId}/reviews?page=${pageNum}&limit=5`);
      const data = await res.json();

      if (data.success) {
        if (pageNum === 1) {
          setReviews(data.reviews);
        } else {
          setReviews((prev) => [...prev, ...data.reviews]);
        }

        setAverageRating(data.meta.averageRating);
        setTotalReviews(data.meta.totalReviews);
        setRatingDistribution(data.meta.ratingDistribution || []);
        setHasMore(pageNum < data.meta.totalPages);
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to load reviews", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, [id]);

  // ✅ Helpful handler
  const handleHelpful = (reviewId: number) => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));

    toast({
      title: helpfulClicks[reviewId] ? "Removed helpful vote" : "Marked as helpful",
      description: "Thank you for your feedback!",
    });
  };

  const handleReport = (reviewId: number) => {
    toast({
      title: "Review reported",
      description: "We'll review this content soon.",
    });
  };

  const openModal = (images: string[], index: number) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const prevImage = () => setModalIndex((i) => (i === 0 ? modalImages.length - 1 : i - 1));
  const nextImage = () => setModalIndex((i) => (i === modalImages.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />

      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to={`/product/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Product
          </Link>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reviews & Ratings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side summary */}
          <div className="lg:col-span-1">
            <div className="fashion-card p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {averageRating || "0.0"}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(Number(averageRating))
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {totalReviews} reviews
                </p>
              </div>

              {/* ✅ Rating distribution */}
              <div className="space-y-2">
                {ratingDistribution.slice().reverse().map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm w-6">{rating.stars}</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {rating.count}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-6 fashion-button"
                onClick={() => navigate(`/product/${id}/write-review`)}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Write a Review
              </Button>
            </div>
          </div>

          {/* Right side reviews */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="fashion-card p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.user.profileImage || "https://via.placeholder.com/40"}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.user.name}</span>
                      {review.user.isVerified && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary" /> Verified
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* User rating */}
                    {review.user.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= review.user.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-muted-foreground mb-4">{review.comment}</p>

                    {/* Review images */}
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((img: string, idx: number) => (
                          <div
                            key={idx}
                            className="relative group cursor-pointer"
                            onClick={() => openModal(review.images, idx)}
                          >
                            <img src={img} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className={`flex items-center gap-1 text-sm ${helpfulClicks[review.id] ? "text-primary" : "text-muted-foreground hover:text-primary"
                          }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Helpful
                      </button>
                      <button
                        onClick={() => handleReport(review.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                      >
                        <Flag className="w-4 h-4" /> Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="text-center">
                <Button
                  variant="outline"
                  className="px-8"
                  onClick={() => {
                    setPage((p) => {
                      const next = p + 1;
                      fetchReviews(next);
                      return next;
                    });
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More Reviews"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className=" p-2 rounded-lg relative bg-background border border-border/70 overflow-clip">

            <div className="relative border border-border/30 bg-background  overflow-clip  rounded-lg   max-w-lg w-full flex flex-col items-center">
              <div className="bg-[#ee4482] w-full h-40 blur-[300px] absolute top-0"></div>

              <div className="relative w-full flex items-center p-2 justify-center">
                <img src={modalImages[modalIndex]} className="max-h-[60vh] max-w-full rounded-lg mx-auto" />
              </div>

              <div className="w-full border-t border-border/50 py-4 mt-2  px-2 flex justify-between">
                <div className="mt-2 text-sm text-muted-foreground">
                  {modalIndex + 1} / {modalImages.length}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline"
                    size="sm"
                    className="  p-2 rounded text-muted-foreground" onClick={prevImage}>
                    <ChevronLeft className="w-6 h-6" /> <span className="">Prev</span>
                  </Button>
                  <Button variant="outline"
                    size="sm" className=" p-2 rounded text-muted-foreground" onClick={nextImage}>
                    Next <ChevronRight className="w-6 h-6" />
                  </Button>

                </div>
                <div>
                  <Button
                    size="sm" className=" top-2 right-2  hover:text-destructive" onClick={closeModal}>
                    Close
                  </Button>


                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
