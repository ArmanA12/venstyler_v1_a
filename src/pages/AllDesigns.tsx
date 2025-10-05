import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, BookmarkPlus, Eye, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useFeed } from "@/hooks/useFeed";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useToggleSave } from "@/hooks/useToggleSave";
import { Link, useNavigate } from "react-router-dom";
import { ShareMenu } from "@/components/shareMenu/ShareMenu";
import CommentsPanel from "@/components/comments/commentPanle";
import { useShareDesign } from "@/hooks/useShareDesign";
import { useAuthGate } from "@/hooks/useAuthGate";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/navbar/Header";

const AllDesigns = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  
  const { data, isLoading, error } = useFeed(page);
  const { mutate: toggleLike } = useToggleLike(page);
  const { mutate: toggleSave } = useToggleSave(page);
  const { mutate: shareMutate } = useShareDesign(page);
  const { gate } = useAuthGate();

  const designs = data?.items || [];
  const totalItems = data?.total || 0;
  const designsPerPage = 12;
  
  // Extract unique categories from feed data
  const categories = ["All", ...Array.from(new Set(designs.map(d => d.category).filter(Boolean)))];

  const filteredDesigns = selectedCategory === "All" 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  const totalPages = Math.ceil(totalItems / designsPerPage);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("like this design", () => {
      toggleLike(Number(id), {
        onError: (error) => {
          toast.error("Failed to update like status");
          console.error("Like error:", error);
        },
      });
    });
  };

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("save this design", () => {
      toggleSave(Number(id), {
        onError: (error) => {
          toast.error("Failed to save design");
          console.error("Save error:", error);
        },
      });
    });
  };

  const handleShareDesign = () => {
    gate("share this design", () => {
      shareMutate(Number(page));
    });
  };

  const handleCommentClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    gate("comment on this design", () => {
      setOpenCommentsFor(id);
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-destructive">Failed to load designs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm font-medium border-primary/20 bg-card/50 backdrop-blur-sm">
              Explore Premium Designs
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                All Designs
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover our complete collection of premium fashion designs
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full px-6 py-2 transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-muted" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Design Grid */}
          {!isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30">
                    <Link to={`/product/${design.id}`} className="block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img
                          src={design.imageUrl || design.images?.[0]}
                          alt={design.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Discount Badge */}
                        {design.discount && design.discount > 0 && (
                          <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                            {design.discount}% OFF
                          </Badge>
                        )}

                        {/* Quick Actions Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full"
                              onClick={(e) => handleToggleLike(design.id, e)}
                            >
                              <Heart
                                className={`h-4 w-4 ${design.isLiked ? "fill-destructive text-destructive" : ""}`}
                              />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full"
                              onClick={(e) => handleToggleSave(design.id, e)}
                            >
                              <BookmarkPlus
                                className={`h-4 w-4 ${design.isSaved ? "fill-primary text-primary" : ""}`}
                              />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full"
                              onClick={(e) => handleCommentClick(design.id, e)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <ShareMenu
                              url={`${window.location.origin}/product/${design.id}`}
                              title={design.title}
                              onShared={handleShareDesign}
                              className="hover:bg-secondary/80 rounded-full w-10 h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <CardContent className="p-4 space-y-3">
                      {/* Designer Info */}
                      <Link 
                        to={`/publicProfile/${design.userId}`}
                        className="flex items-center gap-2 group/designer hover:opacity-80 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarImage src={design.designerAvatar || undefined} />
                          <AvatarFallback className="text-xs">
                            {design.designer?.charAt(0) || "D"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground truncate">
                          {design.designer}
                        </span>
                      </Link>

                      {/* Title */}
                      <Link to={`/product/${design.id}`}>
                        <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
                          {design.title}
                        </h3>
                      </Link>

                      {/* Category */}
                      {design.category && (
                        <Badge variant="secondary" className="text-xs">
                          {design.category}
                        </Badge>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {design.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {design.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {design.views}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-lg font-bold text-foreground">
                          ₹{design.price?.toLocaleString()}
                        </span>
                        {design.discount && design.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{(design.price / (1 - design.discount / 100)).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Comments Panel */}
        {openCommentsFor && (
          <CommentsPanel
            designId={Number(openCommentsFor)}
            open={!!openCommentsFor}
            onClose={() => setOpenCommentsFor(null)}
            onPosted={() => {}}
          />
        )}
      </section>
    </div>
  );
};

export default AllDesigns;