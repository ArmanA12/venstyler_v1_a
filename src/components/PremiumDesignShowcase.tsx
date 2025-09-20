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
                  : "border-2 border-border/50 hover:border-primary/30 hover:bg-accent/5"
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
              <Card className="group overflow-hidden hover-scale bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
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
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
                        onClick={() => toggleLike(design.id)}
                      >
                        <Heart className={`w-4 h-4 ${design.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
                        onClick={() => toggleSave(design.id)}
                      >
                        <BookmarkPlus className={`w-4 h-4 ${design.isSaved ? 'fill-primary text-primary' : 'text-gray-600'}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
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
    </section>
  );
};