import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { EnquiryModal } from "@/components/EnquiryModal";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Star,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldQuestion
} from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { useProductDetails } from "@/hooks/useProductDetail";
import { useAuth } from "@/contexts/AuthContext";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const designId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : undefined;
  }, [id]);

  const navigate = useNavigate();
  const { toast } = useToast();

  // fetch product
  const { data: prod, isLoading, isError, error } = useProductDetails(designId);
  console.log(prod, "product details");
  // local UI states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(prod?.isLiked ?? false);
  const [isSaved, setIsSaved] = useState(prod?.isSaved ?? false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLiked(prod?.isLiked ?? false);
    setIsSaved(prod?.isSaved ?? false);
  }, [prod?.id, prod?.isLiked, prod?.isSaved]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to load product",
        description: (error as Error)?.message || "Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // price calculation (discount as %)
  const price = prod?.price ?? 0;
  const discountPct = prod?.discount ?? 0;
  const originalPrice =
    discountPct > 0 ? Math.round(price / (1 - discountPct / 100)) : price;

  const product = {
    id: prod?.id ?? designId ?? 0,
    title: prod?.title ?? "",
    description: prod?.description ?? "",
    price,
    originalPrice,
    discount: discountPct,
    rating: Number(prod?.meta?.rating ?? 0),
    totalOrders: prod?.meta?.orders ?? 0,
    totalLikes: prod?.meta?.likesCount ?? 0,
    totalSaves: prod?.meta?.savesCount ?? 0,
    images:
      prod?.images && prod.images.length > 0
        ? prod.images
        : ["https://picsum.photos/seed/fallback1/600/600"],
    category: prod?.category ?? "Fashion",
    designer: {
      name: prod?.designer?.name ?? "Unknown Designer",
      avatar:
        prod?.designer?.profileImage ??
        "https://picsum.photos/seed/designer/40/40",
      id: prod?.designer?.id ?? 0,
    },
    completionTime: prod?.completionTime ?? "—",
    inStock: true,
    reviews: prod?.reviews ?? [],
  };

  // carousel
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // actions
  const handleLike = () => {
    setIsLiked((v) => !v);
    toast({
      title: !isLiked ? "Added to likes" : "Removed from likes",
      description: !isLiked
        ? "Product added to your likes"
        : "Product removed from your likes",
    });
  };

  const handleSave = () => {
    setIsSaved((v) => !v);
    toast({
      title: !isSaved ? "Saved" : "Removed from saved",
      description: !isSaved
        ? "Product saved for later"
        : "Product removed from saved items",
    });
  };

  const handleOrder = () => {
    if (isLoading) return; // still resolving auth

    const target = `/checkout/${designId}`;

    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to continue to checkout.",
      });
      // send them to login and return here after
      navigate("/signin", { state: { from: target } });
      return;
    }

    toast({
      title: "Order initiated",
      description: "Redirecting to checkout...",
    });
    navigate(target);
  };

  const handleMessage = () => {
    navigate(`/chat?receiverId=${product.designer.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />

      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nav */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-playfair font-bold text-primary mb-2">
                {product.title}
              </h1>

              {/* Designer */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={product.designer.avatar}
                  alt={product.designer.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  by{" "}
                  <span className="text-primary font-medium">
                    {product.designer.name}
                  </span>
                  <span className="text-sm text-muted-foreground"> Designer</span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Premium Payment Structure */}
            <div className="relative">
              {/* Premium Golden Container */}
              <div className="relative bg-gradient-to-br from-yellow-400/90 via-amber-400/90 to-yellow-500/90 p-6 rounded-2xl shadow-2xl border border-yellow-300/30 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-300/10 to-transparent"></div>
                
                {/* Header */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-black/20 p-2 rounded-xl">
                      <ShieldQuestion className="w-6 h-6 text-yellow-100" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black/90">Premium</h3>
                      <div className="inline-flex items-center bg-black/20 px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-yellow-100">SECURE PAYMENT</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-black/60">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Payment Cards */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Order Amount Card */}
                  <div className="bg-black/80 backdrop-blur-sm p-5 rounded-xl border border-yellow-400/20 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-200">Order Amount</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-white">₹{Math.round(product.price * 0.4)}</p>
                      <p className="text-xs text-yellow-300/80">Pay now (40%)</p>
                    </div>
                  </div>
                  
                  {/* Final Amount Card */}
                  <div className="bg-black/80 backdrop-blur-sm p-5 rounded-xl border border-yellow-400/20 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-yellow-200">Final Amount</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-white">₹{Math.round(product.price * 0.6)}</p>
                      <p className="text-xs text-yellow-300/80">After completion (60%)</p>
                    </div>
                  </div>
                </div>

                {/* Features Row */}
                <div className="relative flex items-center justify-center gap-6 mb-4 text-black/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-100">✓</span>
                    </div>
                    <span className="text-sm font-medium">Secure Process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-100">⚡</span>
                    </div>
                    <span className="text-sm font-medium">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-100">🛡️</span>
                    </div>
                    <span className="text-sm font-medium">Protected</span>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="relative text-center">
                  <p className="text-sm text-black/70 font-medium">
                    Secure payment process - Pay 40% to start, 60% after design completion
                  </p>
                </div>
              </div>
            </div>


            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-medium">{product.totalOrders}</span>
                <span className="text-sm text-muted-foreground">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium">{product.totalLikes}</span>
                <span className="text-sm text-muted-foreground">Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                <span className="font-medium">{product.totalSaves}</span>
                <span className="text-sm text-muted-foreground">Saves</span>
              </div>
            </div>

            {/* Completion Time */}
            <div className="fashion-card p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Completion Time:</span>{" "}
                  {product.completionTime} Days
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleOrder}
                  disabled={!product.inStock}
                  className="fashion-button text-lg py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? "Order Now" : "Out of Stock"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="text-lg py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enquiry
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={
                    isLiked ? "bg-primary/20 border-primary text-primary" : ""
                  }
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className={
                    isSaved ? "bg-primary/20 border-primary text-primary" : ""
                  }
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleMessage}
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Designer
              </Button>
            </div>

            {/* Reviews */}
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reviews & Ratings</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/product/${id}/reviews`)}
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {product.reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                ) : (
                  product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-3 p-4 bg-muted/30 rounded-lg"
                    >
                      <img
                        src={review.user.profileImage}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            <div className="flex gap-2">
                              <div>{review.user.name}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                {Array.from({
                                  length: 5,
                                }).map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 ${idx < (review.rating || 0) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        productId={id?.toString() || ""}
        productTitle={product?.title}
        imageUrl={product.images[currentImageIndex]}   // ✅ pass main image
      />
    </div>
  );
};

export default ProductDetails;
