import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Star,
  Heart,
  Bookmark,
  Share,
  MessageCircle,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { useProductDetails } from "@/hooks/useProductDetail";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const designId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : undefined;
  }, [id]);

  const navigate = useNavigate();
  const { toast } = useToast();

  // fetch actual product details
  const { data: prod, isLoading, isError, error } = useProductDetails(designId);
  // local UI-only states (like/save + carousel index)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // reset carousel to first image when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [prod?.id]);

  // show API errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to load product",
        description: (error as Error)?.message || "Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // derive a view-model that matches your existing JSX shape
  const images =
    prod?.images && prod.images.length > 0
      ? prod.images
      : ["https://picsum.photos/seed/fallback1/600/600"];

  const price = prod?.price ?? 0;
  const originalPrice = prod?.discount ? price + prod.discount : price; // treat discount as absolute amount
  const discountPct =
    originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const product = {
    id: prod?.id ?? designId ?? 0,
    title: prod?.title ?? "",
    description: prod?.description ?? "",
    price,
    originalPrice,
    discount: Math.max(0, discountPct),
    rating: Number(prod?.meta?.averageRating ?? 0),
    totalOrders: prod?.meta?.ordersCount ?? 0,
    totalLikes: prod?.meta?.likesCount ?? 0,
    totalSaves: prod?.meta?.savesCount ?? 0,
    images,
    category: prod?.category ?? "Fashion",
    designer: {
      name: prod?.designer?.name ?? "Unknown Designer",
      avatar:
        prod?.designer?.profileImage ??
        "https://picsum.photos/seed/designer/40/40",
      verified: false, // set true if you add a field later
      email: "", // not in payload; leave blank
      id: prod?.designer?.id ?? 0,
    },
    completionTime: prod?.completionTime ?? "—",
    inStock: true, // no stock flag in payload; set true or derive later
  };

  // carousel handlers
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

  // actions (UI only for now)
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
    toast({
      title: "Order initiated",
      description: "Redirecting to checkout...",
    });
  };

  const handleMessage = () => {
    // Your app has /chat and /chat/:chatId/:receiverId; keep simple:
    navigate(`/chat`);
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
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Buttons */}
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

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
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

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-playfair font-bold text-primary mb-2">
                {product.title}
              </h1>

              {/* Designer Info */}
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
                  {product.designer.verified && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Verified
                    </Badge>
                  )}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {product.designer.email}
                  </span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive">{product.discount}% OFF</Badge>
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
                  {product.completionTime}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleOrder}
                disabled={!product.inStock}
                className="w-full fashion-button text-lg py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? "Order Now" : "Out of Stock"}
              </Button>

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

            {/* Reviews Section */}
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
                {[1, 2].map((review) => (
                  <div
                    key={review}
                    className="flex gap-3 p-4 bg-muted/30 rounded-lg"
                  >
                    <img
                      src={`https://picsum.photos/seed/review${review}/40/40`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">Sarah M.</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-3 h-3 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Amazing quality and perfect fit! Highly recommended.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
};

export default ProductDetails;
