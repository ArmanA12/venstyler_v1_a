import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { ThreeDMarquee } from "@/components/ui/three-d-marquee";
import { PremiumDesignShowcase } from "@/components/PremiumDesignShowcase";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Monitor,
  ArrowRight,
  Sparkles,
  Users,
  MessageSquare,
  Calendar,
  Scissors,
  Palette,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Play,
  Heart,
  Brush,
  Shirt,
  Search,
  LogIn,
  UserPlus,
  Crown,
  TrendingUp,
  Award,
  Globe,
  Smartphone,
  Clock,
  DollarSign,
  Eye,
  Coffee,
  Video,
  MessageCircle
} from "lucide-react";

const PremiumHomepage = () => {
  const { theme, setTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy fashion images for marquee
  const fashionImages = [
    {
      src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 1",
      href: "/designs/1"
    },
    {
      src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 2",
      href: "/designs/2"
    },
    {
      src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 3",
      href: "/designs/3"
    },
    {
      src: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 4",
      href: "/designs/4"
    },
    {
      src: "https://images.unsplash.com/photo-1571513722275-4b3ab092693b?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 5",
      href: "/designs/5"
    },
    {
      src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      alt: "Premium Designer Outfit 6",
      href: "/designs/6"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % fashionImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [fashionImages.length]);

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const orderFlow = [
    {
      step: 1,
      icon: Users,
      title: "Place Order",
      description: "Connect with elite designers & pay 40% upfront"
    },
    {
      step: 2,
      icon: Calendar,
      title: "Schedule Meeting", 
      description: "Book exclusive consultation with your designer"
    },
    {
      step: 3,
      icon: Scissors,
      title: "Precision Measurements",
      description: "Perfect fitting with expert measurements"
    },
    {
      step: 4,
      icon: Palette,
      title: "Design Progress",
      description: "Watch your dream design come to life"
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Premium Delivery",
      description: "Receive masterpiece & pay remaining 60%"
    }
  ];

  const ecosystemCards = [
    {
      title: "Fashion Designers",
      description: "Elite creators crafting bespoke designs",
      icon: <Brush className="w-6 h-6" />,
      count: "2,500+"
    },
    {
      title: "Handwork Specialists", 
      description: "Master artisans for intricate details",
      icon: <Star className="w-6 h-6" />,
      count: "1,200+"
    },
    {
      title: "Machine Workers",
      description: "Precision crafting with modern techniques", 
      icon: <Zap className="w-6 h-6" />,
      count: "800+"
    },
    {
      title: "Dyers & Masters",
      description: "Color experts bringing vibrancy to life",
      icon: <Palette className="w-6 h-6" />,
      count: "600+"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Premium Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DesignPro
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search designers, styles, collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-border/50 focus:border-primary/30 bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="rounded-full border hover-scale bg-background/80 backdrop-blur-md"
              >
                {getThemeIcon()}
              </Button>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="rounded-full border hover:border-primary/30">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>

              {/* Back to Original */}
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border hover-scale bg-background/80 backdrop-blur-md"
                >
                  ← Original
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search designers, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-border/50 focus:border-primary/30 bg-background/50 backdrop-blur-sm w-full"
            />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
          
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-32 h-32 rounded-full border border-primary/10 backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-secondary/10 backdrop-blur-sm"
          />
          
          {/* Subtle Glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Redefining Fashion Technology
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
              <span className="block text-foreground mb-2">The Future of</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Designer Management
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Where creativity meets technology. Connect with elite designers, master artisans, 
              <br className="hidden md:block" />
              and transform your vision into extraordinary fashion reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="group px-10 py-6 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group px-10 py-6 text-lg font-semibold border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Elegant Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { number: "10K+", label: "Elite Designers", icon: Users },
              { number: "50K+", label: "Satisfied Clients", icon: Heart },
              { number: "1M+", label: "Designs Crafted", icon: Palette },
              { number: "99.9%", label: "Success Rate", icon: Award },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="group text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Seamless Order Flow */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg">
              <Zap className="w-4 h-4 mr-2" />
              Engineered Excellence
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              <span className="block text-foreground mb-2">Seamless</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Order Experience
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
              A meticulously crafted journey from initial concept to final masterpiece,
              <br className="hidden md:block" />
              where every step is designed for perfection and transparency.
            </p>
          </div>

          <div className="relative">              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {orderFlow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Connection Line */}
                  {index < orderFlow.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-border/30 z-0" />
                  )}
                  
                  <Card className="relative text-center p-8 bg-card/60 backdrop-blur-xl border border-border/30 hover:border-primary/40 transition-all duration-700 shadow-lg hover:shadow-2xl">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Icon Container */}
                    <div className="relative mb-8 mt-4">
                      <div className="w-20 h-20 mx-auto bg-card border border-border/20 rounded-3xl flex items-center justify-center group-hover:border-primary/40 transition-all duration-500 shadow-inner">
                        <step.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {step.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3D Designer Marquee */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Star className="w-4 h-4 mr-2 text-primary" />
              Featured Showcase
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                World's Best Designers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover premium collections from our elite designer network
            </p>
          </div>
          
          <ThreeDMarquee 
            images={fashionImages}
            cols={4}
            className="max-w-6xl mx-auto"
            onImageClick={(image, index) => {
              console.log("Clicked image:", image, "at index:", index);
            }}
          />
        </div>
      </motion.section>

      {/* Ecosystem Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Globe className="w-4 h-4 mr-2 text-primary" />
              Complete Ecosystem
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Social Media for Designers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connecting designers, artisans, and buyers in one comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecosystemCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group text-center p-8 hover-scale bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="text-2xl font-bold text-primary">{card.count}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Chat & Social Features */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-r from-primary/5 via-background to-secondary/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
                <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                Real-time Collaboration
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Seamless Communication
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Built-in chat system connecting designers, clients, and artisans for effortless collaboration throughout your project journey.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, text: "Real-time messaging with all stakeholders" },
                  { icon: <Video className="w-5 h-5" />, text: "Video consultations and progress reviews" },
                  { icon: <Shirt className="w-5 h-5" />, text: "Share designs, photos, and feedback instantly" },
                  { icon: <Clock className="w-5 h-5" />, text: "Track project timeline and milestones" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <span className="text-foreground font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="h-full bg-card rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                    <div>
                      <div className="text-sm font-semibold">Designer Chat</div>
                      <div className="text-xs text-muted-foreground">Online now</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-sm">
                      "Your design concept looks amazing! I've started working on the initial sketches..."
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-sm ml-8">
                      "That's perfect! Could you adjust the neckline slightly?"
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 text-sm">
                      "Absolutely! I'll have the updated version ready by tomorrow."
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Premium Design Showcase */}
      <PremiumDesignShowcase />

      {/* Trust and Security */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-br from-background via-muted/10 to-background"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            Trust & Security
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Security, Our Priority
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Advanced security measures and quality assurance protocols protect every transaction and design.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Bank-Level Security",
                description: "256-bit SSL encryption protecting all your data and transactions"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Quality Guarantee",
                description: "100% satisfaction guarantee with multiple quality checkpoints"
              },
              {
                icon: <Coffee className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your needs"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover-scale bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-r from-primary/10 via-background to-secondary/10"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ready to Create Magic?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of satisfied clients who've transformed their fashion dreams into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transform hover-scale">
                <UserPlus className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="text-lg px-12 py-6 rounded-full border-2 hover:bg-accent/5 hover-scale">
                <Eye className="w-5 h-5 mr-2" />
                Browse Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PremiumHomepage;