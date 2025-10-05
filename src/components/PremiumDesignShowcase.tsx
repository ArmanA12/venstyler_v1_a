import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, BookmarkPlus, Star, Eye, ArrowRight, Filter, MessageCircle } from "lucide-react";
import { useFeed } from "@/hooks/useFeed";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useToggleSave } from "@/hooks/useToggleSave";
import { Link } from "react-router-dom";
import { ShareMenu } from "@/components/shareMenu/ShareMenu";
import CommentsPanel from "@/components/comments/commentPanle";
import { useShareDesign } from "@/hooks/useShareDesign";
import { useAuthGate } from "@/hooks/useAuthGate";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Design {
  id: number;
  title: string;
  designer: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isLiked: boolean;
  isSaved: boolean;
  views: number;
}

const dummyDesigns: Design[] = [
  {
    id: 1,
    title: "Elegant Royal Lehenga",
    designer: "Ravi Kumar",
    price: "₹45,000",
    originalPrice: "₹65,000",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=600&fit=crop",
    category: "Bridal",
    isLiked: false,
    isSaved: false,
    views: 1420
  },
  {
    id: 2,
    title: "Modern Saree Design",
    designer: "Priya Singh",
    price: "₹28,000",
    originalPrice: "₹40,000",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1571513722275-4b3ab092693b?w=400&h=600&fit=crop",
    category: "Casual",
    isLiked: true,
    isSaved: false,
    views: 987
  },
  {
    id: 3,
    title: "Traditional Anarkali",
    designer: "Arjun Kapoor",
    price: "₹35,000",
    originalPrice: "₹50,000",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    category: "Festive",
    isLiked: false,
    isSaved: true,
    views: 756
  },
  {
    id: 4,
    title: "Designer Gown Collection",
    designer: "Meera Sharma",
    price: "₹55,000",
    originalPrice: "₹75,000",
    rating: 5.0,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop",
    category: "Party",
    isLiked: false,
    isSaved: false,
    views: 2100
  },
  {
    id: 5,
    title: "Ethnic Kurta Set",
    designer: "Vikram Patel",
    price: "₹18,000",
    originalPrice: "₹25,000",
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop",
    category: "Casual",
    isLiked: true,
    isSaved: true,
    views: 654
  },
  {
    id: 6,
    title: "Premium Sharara",
    designer: "Anjali Gupta",
    price: "₹42,000",
    originalPrice: "₹60,000",
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    category: "Wedding",
    isLiked: false,
    isSaved: false,
    views: 1876
  }
];

const categories = ["All", "Bridal", "Casual", "Festive", "Party", "Wedding"];

export const PremiumDesignShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  
  const { data, isLoading, error } = useFeed(page);
  const { mutate: toggleLike } = useToggleLike(page);
  const { mutate: toggleSave } = useToggleSave(page);
  const { mutate: shareMutate } = useShareDesign(page);
  const { gate } = useAuthGate();

  console.log("Feed data:", data, "Loading:", isLoading, "Error:", error);

  const designs = data?.items || [];
  const totalItems = data?.total || 0;
  const designsPerPage = 6;
  
  // Extract unique categories from feed data
  const categories = ["All", ...Array.from(new Set(designs.map(d => d.category).filter(Boolean)))];

  const filteredDesigns = selectedCategory === "All" 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  const totalPages = Math.ceil(totalItems / designsPerPage);
  const currentDesigns = filteredDesigns.slice(0, designsPerPage);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("like this design", () => {
      toggleLike(Number(id), {
        onError: (err) =>
          toast.error("Couldn't update like", {
            description: err instanceof Error ? err.message : "Please try again.",
          }),
      });
    });
  };

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("save this design", () => {
      toggleSave(Number(id), {
        onError: (err) =>
          toast.error("Couldn't update save", {
            description: err instanceof Error ? err.message : "Please try again.",
          }),
      });
    });
  };

  const handleShare = (designId: number) => {
    shareMutate(designId);
  };

  const handleShareClose = (status: "success" | "error") => {
    if (status === "success") {
      toast.success("Shared successfully!");
    } else if (status === "error") {
      toast.error("Sharing failed!");
    }
  };

  const handleCommentClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("comment", () => setOpenCommentsFor(id));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Star className="w-4 h-4 mr-2 text-primary" />
              Featured Collections
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Explore Premium Designs
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover handcrafted masterpieces from top designers across India. Each design tells a story of tradition, innovation, and unparalleled craftsmanship.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25"
                  : "border border-border/50 hover:border-primary/30 hover:bg-accent/5"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Designs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {isLoading ? (
            <p className="text-center col-span-3 text-muted-foreground">Loading designs...</p>
          ) : error ? (
            <p className="text-center col-span-3 text-destructive">Error loading designs. Please try again.</p>
          ) : currentDesigns.length === 0 ? (
            <p className="text-center col-span-3 text-muted-foreground">No designs found</p>
          ) : (
            currentDesigns.map((design, index) => {
              const discountedPrice = design.discount 
                ? design.price - (design.price * design.discount) / 100 
                : design.price;
              
              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover-scale bg-card/60 backdrop-blur-xl border border-border/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-700">
                    {/* Designer Info - Clickable */}
                    <Link to={`/publicProfile/${design.userId}`}>
                      <div className="p-4 flex items-center gap-3 hover:bg-muted/20 transition-colors">
                        <Avatar className="w-10 h-10 border-2 border-primary/20">
                          {design.designerAvatar ? (
                            <AvatarImage src={design.designerAvatar} alt={design.designer} />
                          ) : (
                            <AvatarFallback>{design.designer?.[0] || "U"}</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{design.designer}</h4>
                          {design.city && (
                            <p className="text-xs text-muted-foreground">{design.city}</p>
                          )}
                        </div>
                      </div>
                    </Link>

                    <Link to={`/products/${design.id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={design.imageUrl || design.images?.[0] || "/placeholder.svg"}
                          alt={design.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Category Badge */}
                        {design.category && (
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary/90 to-secondary/90 text-white border-0">
                            {design.category}
                          </Badge>
                        )}

                        {/* Likes, Comments and Views Counter */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                            <Heart className="w-3 h-3" />
                            {design.likes || 0}
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                            <MessageCircle className="w-3 h-3" />
                            {design.comments || 0}
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                            <Eye className="w-3 h-3" />
                            {design.views || 0}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <CardContent className="p-6">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/30">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover-glow"
                          onClick={(e) => handleToggleLike(design.id, e)}
                        >
                          <Heart className={`w-5 h-5 transition ${design.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover-glow"
                          onClick={(e) => handleCommentClick(design.id, e)}
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                        <ShareMenu
                          url={`https://venstyler.armanshekh.com/product/${design.id}`}
                          title={design.title}
                          onShared={() => handleShare(Number(design.id))}
                          onClose={handleShareClose}
                          className="hover-glow"
                        />
                        <div className="flex-1" />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover-glow ml-auto"
                          onClick={(e) => handleToggleSave(design.id, e)}
                        >
                          <BookmarkPlus className={`w-5 h-5 transition ${design.isSaved ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {design.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        by {design.designer}
                        {design.isVerified && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            ✓
                          </Badge>
                        )}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">
                            ₹{discountedPrice.toLocaleString()}
                          </span>
                          {design.discount > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{design.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Link to={`/product/${design.id}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 rounded-full"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-2"
          >
            {[...Array(Math.min(totalPages, 5))].map((_, index) => (
              <Button
                key={index}
                variant={page === index + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setPage(index + 1)}
                className={`w-10 h-10 rounded-full ${
                  page === index + 1
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : "border-2 border-border/50 hover:border-primary/30"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </motion.div>
        )}
      </div>
        <div className="flex justify-center items-center relative mt-16">
          {/* 3D Spline-inspired Button with Enhanced Effects */}
          <Link to="/designs">
            <motion.div
              whileHover={{ 
                y: -12,
                rotateX: 20,
                rotateY: 5,
                scale: 1.08,
              }}
              whileTap={{ 
                y: -4,
                scale: 0.95,
                rotateX: 10
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                mass: 0.8
              }}
              className="relative group cursor-pointer perspective-1000"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
...
              {/* Additional 3D depth layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 via-secondary/25 to-accent/25 opacity-70 group-hover:opacity-90 transition-all duration-500" 
                   style={{ transform: "translateZ(-20px) translateY(8px)" }}></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 opacity-50 group-hover:opacity-70 transition-all duration-500" 
                   style={{ transform: "translateZ(-40px) translateY(16px)" }}></div>
            </motion.div>
          </Link>
        </div>

        {/* Comments Panel */}
        {openCommentsFor && (
          <CommentsPanel
            designId={Number(openCommentsFor)}
            open={!!openCommentsFor}
            onClose={() => setOpenCommentsFor(null)}
            onPosted={() => {
              // Optionally refresh feed to update comment count
            }}
          />
        )}
      </section>
    );
  };
