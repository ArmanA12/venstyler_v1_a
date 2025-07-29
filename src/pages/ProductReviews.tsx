import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Star, 
  ThumbsUp, 
  Flag, 
  MessageCircle,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ProductReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  // Mock reviews data with working dummy images
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://picsum.photos/seed/reviewuser1/40/40",
        verified: true
      },
      rating: 5,
      date: "2 days ago",
      review: "Absolutely love this dress! The quality is exceptional and it fits perfectly. The embroidery work is beautiful and the fabric feels premium. Will definitely order more from this designer.",
      images: [
        "https://picsum.photos/seed/reviewimg1a/600/600",
        "https://picsum.photos/seed/reviewimg1b/600/600"
      ],
      helpful: 12,
      reported: false
    },
    {
      id: 2,
      user: {
        name: "Emma Wilson",
        avatar: "https://picsum.photos/seed/reviewuser2/40/40",
        verified: false
      },
      rating: 4,
      date: "1 week ago",
      review: "Great dress overall! The design is exactly as shown in the pictures. Only reason for 4 stars is that it took a bit longer to arrive than expected, but the quality makes up for it.",
      images: [
        "https://picsum.photos/seed/reviewimg2a/600/600"
      ],
      helpful: 8,
      reported: false
    },
    {
      id: 3,
      user: {
        name: "Maria Garcia",
        avatar: "https://picsum.photos/seed/reviewuser3/40/40",
        verified: true
      },
      rating: 5,
      date: "2 weeks ago",
      review: "This is my third purchase from this designer and I'm never disappointed! The attention to detail is amazing. Highly recommend to anyone looking for quality handmade clothing.",
      images: [],
      helpful: 15,
      reported: false
    },
    {
      id: 4,
      user: {
        name: "Lisa Chen",
        avatar: "https://picsum.photos/seed/reviewuser4/40/40",
        verified: false
      },
      rating: 3,
      date: "3 weeks ago",
      review: "The dress is nice but the color was slightly different from what I expected. The quality is good though and the customer service was helpful when I reached out.",
      images: [
        "https://picsum.photos/seed/reviewimg4a/600/600"
      ],
      helpful: 3,
      reported: false
    }
  ];

  const [helpfulClicks, setHelpfulClicks] = useState<Record<number, boolean>>({});

  const handleHelpful = (reviewId: number) => {
    setHelpfulClicks(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
    
    toast({
      title: helpfulClicks[reviewId] ? "Removed helpful vote" : "Marked as helpful",
      description: "Thank you for your feedback!",
    });
  };

  const handleReport = (reviewId: number) => {
    toast({
      title: "Review reported",
      description: "Thank you for reporting. We'll review this content.",
    });
  };

  const openModal = (images: string[], index: number) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImages([]);
    setModalIndex(0);
  };

  const prevImage = () => {
    setModalIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    stars: rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      
      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to={`/product/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Product
          </Link>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reviews & Ratings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="fashion-card p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating) 
                          ? "fill-primary text-primary" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm w-6">{rating.stars}</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {rating.count}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-6 fashion-button"
                onClick={() => navigate(`/product/${id}/write-review`)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </div>
          </div>

          {/* Right Side - Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="fashion-card p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.user.name}</span>
                      {review.user.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= review.rating 
                              ? "fill-primary text-primary" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {review.review}
                    </p>

                    {/* Review Images */}
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative group cursor-pointer"
                            onClick={() => openModal(review.images, index)}
                          >
                            <img
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          helpfulClicks[review.id]
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${helpfulClicks[review.id] ? "fill-current" : ""}`} />
                        Helpful ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
                      </button>
                      
                      <button
                        onClick={() => handleReport(review.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for review images */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-4 flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full flex items-center justify-center">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <img
                src={modalImages[modalIndex]}
                alt={`Review modal image ${modalIndex + 1}`}
                className="max-h-[60vh] max-w-full rounded-lg mx-auto"
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {modalIndex + 1} / {modalImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;