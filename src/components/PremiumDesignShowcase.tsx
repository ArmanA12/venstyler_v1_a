import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Share2, BookmarkPlus, Star, Eye, ArrowRight, Filter } from "lucide-react";

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
  const [designs, setDesigns] = useState(dummyDesigns);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const designsPerPage = 6;

  const filteredDesigns = selectedCategory === "All" 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  const totalPages = Math.ceil(filteredDesigns.length / designsPerPage);
  const currentDesigns = filteredDesigns.slice(
    (currentPage - 1) * designsPerPage,
    currentPage * designsPerPage
  );

  const toggleLike = (id: number) => {
    setDesigns(prev => prev.map(design => 
      design.id === id ? { ...design, isLiked: !design.isLiked } : design
    ));
  };

  const toggleSave = (id: number) => {
    setDesigns(prev => prev.map(design => 
      design.id === id ? { ...design, isSaved: !design.isSaved } : design
    ));
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
                setCurrentPage(1);
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
          {currentDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover-scale bg-card/60 backdrop-blur-xl border border-border/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-700">
                <div className="relative overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-xl bg-background/80 backdrop-blur-sm border-border/20 hover:bg-background hover:border-primary/30 shadow-lg"
                        onClick={() => toggleLike(design.id)}
                      >
                        <Heart className={`w-4 h-4 ${design.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-xl bg-background/80 backdrop-blur-sm border-border/20 hover:bg-background hover:border-primary/30 shadow-lg"
                        onClick={() => toggleSave(design.id)}
                      >
                        <BookmarkPlus className={`w-4 h-4 ${design.isSaved ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-9 h-9 rounded-xl bg-background/80 backdrop-blur-sm border-border/20 hover:bg-background hover:border-primary/30 shadow-lg"
                      >
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary/90 to-secondary/90 text-white border-0">
                    {design.category}
                  </Badge>

                  {/* Views Counter */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1 text-white text-xs">
                    <Eye className="w-3 h-3" />
                    {design.views}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(design.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {design.rating} ({design.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {design.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    by {design.designer}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">{design.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{design.originalPrice}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 rounded-full"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-2"
          >
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === index + 1
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
            {/* 3D Depth Shadows - Multiple Layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-secondary/60 to-accent/50 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-500" 
                 style={{ transform: "translateZ(-60px) translateY(25px) rotateX(45deg)" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/50 to-accent/40 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500" 
                 style={{ transform: "translateZ(-80px) translateY(35px) rotateX(60deg)" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/40 to-accent/30 rounded-full blur-[40px] opacity-30 group-hover:opacity-50 transition-all duration-500" 
                 style={{ transform: "translateZ(-100px) translateY(45px) rotateX(75deg)" }}></div>
            
            {/* Floating 3D Elements */}
            <div className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full opacity-60 group-hover:opacity-100 animate-float" 
                 style={{ transform: "translateZ(30px)" }}></div>
            <div className="absolute -top-6 -right-10 w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full opacity-40 group-hover:opacity-80 animate-float" 
                 style={{ transform: "translateZ(20px)", animationDelay: "0.5s" }}></div>
            <div className="absolute -bottom-6 -left-10 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-50 group-hover:opacity-90 animate-float" 
                 style={{ transform: "translateZ(25px)", animationDelay: "1s" }}></div>
            
            {/* Main 3D Button */}
            <button className="relative z-50 
              bg-gradient-to-r from-primary via-secondary to-accent 
              hover:from-primary/95 hover:via-secondary/95 hover:to-accent/95
              text-primary-foreground font-bold text-xl
              px-16 py-6 rounded-full
              border-2 border-primary-foreground/20
              shadow-[0_15px_50px_rgba(0,0,0,0.4),0_25px_80px_hsl(var(--primary)/0.5),inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.3)]
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_35px_100px_hsl(var(--primary)/0.6),inset_0_4px_12px_rgba(255,255,255,0.4),inset_0_-4px_12px_rgba(0,0,0,0.4)]
              transition-all duration-500 ease-out
              group-hover:scale-110
              before:content-[''] before:absolute before:inset-0 before:rounded-full
              before:bg-gradient-to-r before:from-primary-foreground/20 before:via-transparent before:to-primary-foreground/20
              before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500
              after:content-[''] after:absolute after:inset-[-2px] after:rounded-full
              after:bg-gradient-to-r after:from-primary after:via-secondary after:to-accent
              after:opacity-0 group-hover:after:opacity-30 after:blur-sm after:transition-all after:duration-500
              after:-z-10"
              style={{
                transform: "translateZ(0px)",
                textShadow: "0 3px 6px rgba(0,0,0,0.4)",
              }}
            >
              <span className="relative z-20 flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                <span className="animate-pulse text-2xl">✨</span>
                View All Design
                <span className="animate-pulse text-2xl">✨</span>
              </span>
              
              {/* Inner animated glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Orbiting particles */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute w-2 h-2 bg-primary-foreground/60 rounded-full animate-spin" 
                     style={{ 
                       top: '20%', 
                       left: '50%', 
                       transformOrigin: '0 40px',
                       animationDuration: '3s'
                     }}></div>
                <div className="absolute w-1.5 h-1.5 bg-primary-foreground/40 rounded-full animate-spin" 
                     style={{ 
                       top: '80%', 
                       left: '50%', 
                       transformOrigin: '0 -40px',
                       animationDuration: '4s',
                       animationDirection: 'reverse'
                     }}></div>
              </div>
            </button>
            
            {/* Additional 3D depth layers */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 via-secondary/25 to-accent/25 opacity-70 group-hover:opacity-90 transition-all duration-500" 
                 style={{ transform: "translateZ(-20px) translateY(8px)" }}></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 opacity-50 group-hover:opacity-70 transition-all duration-500" 
                 style={{ transform: "translateZ(-40px) translateY(16px)" }}></div>
          </motion.div>
        </div>
    </section>
  );
};