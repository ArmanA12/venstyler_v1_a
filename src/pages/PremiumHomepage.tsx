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

  const orderSteps = [
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: "Place Order",
      description: "Connect with elite designers & pay 40% upfront",
      details: "Browse curated profiles, select your designer, and secure your order with premium payment protection"
    },
    {
      icon: <Calendar className="w-10 h-10 text-white" />,
      title: "Schedule Meeting", 
      description: "Book exclusive consultation with your designer",
      details: "Virtual or in-person meetings to discuss your vision, preferences, and custom requirements"
    },
    {
      icon: <Scissors className="w-10 h-10 text-white" />,
      title: "Precision Measurements",
      description: "Perfect fitting with expert measurements",
      details: "Professional measurement sessions ensuring flawless fit and comfort for your custom piece"
    },
    {
      icon: <Palette className="w-10 h-10 text-white" />,
      title: "Design Progress",
      description: "Watch your dream design come to life",
      details: "Real-time updates, progress photos, and direct communication throughout the creation process"
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      title: "Premium Delivery",
      description: "Receive masterpiece & pay remaining 60%",
      details: "White-glove delivery service with quality guarantee and final payment upon satisfaction"
    }
  ];

  const stats = [
    { icon: <Crown className="w-6 h-6" />, label: "Elite Designers", value: "2,500+", color: "text-yellow-500" },
    { icon: <TrendingUp className="w-6 h-6" />, label: "Orders Completed", value: "50,000+", color: "text-green-500" },
    { icon: <Award className="w-6 h-6" />, label: "5-Star Reviews", value: "98%", color: "text-blue-500" },
    { icon: <Globe className="w-6 h-6" />, label: "Cities Served", value: "200+", color: "text-purple-500" }
  ];

  const premiumFeatures = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Experience",
      description: "Seamless design browsing and ordering on any device",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description: "Live updates on your design progress from concept to completion",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Split payments with escrow protection and multiple payment options",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Multiple quality checkpoints ensuring premium craftsmanship",
      gradient: "from-purple-500 to-pink-500"
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
                className="pl-10 pr-4 py-2 rounded-full border-2 border-border/50 focus:border-primary/30 bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="rounded-full border-2 hover-scale bg-background/80 backdrop-blur-md"
              >
                {getThemeIcon()}
              </Button>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="rounded-full border-2 hover:border-primary/30">
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
                  className="rounded-full border-2 hover-scale bg-background/80 backdrop-blur-md"
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
              className="pl-10 pr-4 py-2 rounded-full border-2 border-border/50 focus:border-primary/30 bg-background/50 backdrop-blur-sm w-full"
            />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-xy" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/10 animate-pulse" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-bl from-accent/40 to-primary/40 rounded-full blur-lg animate-float delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary/50 to-accent/50 rounded-full blur-md animate-float delay-2000" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">World's #1 Designer Platform</span>
            <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs">
              NEW
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
              The Future of
            </span>
            <br />
            <span className="text-foreground font-extrabold">Designer Management</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Connect with elite designers, master artisans, and bring your dream designs to life through our premium platform. 
            Experience the ultimate in custom fashion creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link to="/signup">
              <Button size="lg" className="text-lg px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transform hover-scale">
                <Play className="w-5 h-5 mr-2" />
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 rounded-full border-2 hover:bg-accent/5 hover-scale">
                <Eye className="w-5 h-5 mr-2" />
                Explore Designs
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>50,000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Premium Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Premium Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Why Choose DesignPro?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled luxury and innovation in every aspect of your design journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full hover-scale bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seamless Order Flow */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Streamlined Process
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Premium Order Journey
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From concept to creation - experience the most luxurious and seamless design journey with our elite craftsmen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {orderSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group h-full hover-scale bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary group-hover:from-primary/80 group-hover:to-secondary/80 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>

                    {/* Connection Line */}
                    {index < orderSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Marquee Section */}
      <section className="py-24 bg-gradient-to-r from-background via-muted/20 to-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Elite Showcase
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                World's Premier Designers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in a 3D showcase of extraordinary designs from the most talented creators worldwide
            </p>
          </motion.div>

          {/* 3D Marquee Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ThreeDMarquee 
              images={fashionImages} 
              cols={4}
              className="mb-8"
              onImageClick={(image, index) => {
                console.log(`Clicked on design ${index + 1}:`, image);
                // Handle click - navigate to design details
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/explore">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 px-8 py-3">
                <Eye className="w-5 h-5 mr-2" />
                View All Designs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Design Showcase */}
      <PremiumDesignShowcase />

      {/* Ecosystem Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Complete Ecosystem
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than just designers - a social network connecting every aspect of fashion creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {ecosystemCards.map((card, index) => (
              <Card key={index} className="group hover-scale bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm border-2 border-border/50 hover:border-accent/30 transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.description}</p>
                  <div className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    {card.count}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Network Visualization */}
          <Card className="bg-gradient-to-br from-primary/5 via-card/80 to-secondary/5 backdrop-blur-sm border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <MessageSquare className="w-8 h-8 text-primary" />
                <Heart className="w-6 h-6 text-red-500" />
                <Users className="w-8 h-8 text-secondary" />
                <Shirt className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Social Media for Designers</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built-in chat, profiles, collaboration tools, and real-time communication between designers, clients, and artisans
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Communication Suite */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
                <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                Communication Suite
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Real-time
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Collaboration Platform
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Revolutionary communication tools connecting designers, clients, and artisans. 
                Experience seamless collaboration with advanced features built for the fashion industry.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Instant Communication</h4>
                    <p className="text-sm text-muted-foreground">Real-time messaging, file sharing, and voice notes for seamless collaboration</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">HD Video Consultations</h4>
                    <p className="text-sm text-muted-foreground">Crystal-clear video calls with screen sharing and design annotation tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Progress Tracking</h4>
                    <p className="text-sm text-muted-foreground">Live updates, milestone notifications, and transparent progress monitoring</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 px-6 py-3">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Try Communication Suite
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-gradient-to-br from-card/80 to-muted/40 backdrop-blur-sm border-2 border-primary/20 hover-scale overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Designer Updates</p>
                          <p className="text-sm text-muted-foreground">New sketches shared</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">Live</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Consultation Booked</p>
                          <p className="text-sm text-muted-foreground">Tomorrow at 3:00 PM</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Confirmed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Milestone Reached</p>
                          <p className="text-sm text-muted-foreground">First draft completed</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500 text-white">Complete</Badge>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <p className="font-medium text-sm">Payment Reminder</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Final 60% payment due upon delivery</p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-6 py-3 text-sm font-medium border-primary/20 bg-primary/5">
              <Crown className="w-4 h-4 mr-2 text-primary" />
              Join the Elite Network
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Create
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Masterpiece?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied clients and top designers creating the future of custom fashion. 
              Your dream design is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-12 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transform hover-scale">
                  <Crown className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="text-lg px-12 py-4 rounded-full border-2 hover-scale hover:bg-accent/5">
                  <Eye className="w-5 h-5 mr-2" />
                  Browse Portfolio
                </Button>
              </Link>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  2500+
                </div>
                <div className="text-sm text-muted-foreground">Elite Designers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-1">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  98%
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Premium Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-16 border-t border-border/50 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DesignPro
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The world's most premium designer management platform, connecting elite creators with discerning clients.
              </p>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="rounded-full">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><Link to="/designers" className="hover:text-primary transition-colors">Find Designers</Link></div>
                <div><Link to="/explore" className="hover:text-primary transition-colors">Browse Designs</Link></div>
                <div><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></div>
                <div><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></div>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></div>
                <div><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></div>
                <div><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></div>
                <div><Link to="/guidelines" className="hover:text-primary transition-colors">Guidelines</Link></div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></div>
                <div><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></div>
                <div><Link to="/press" className="hover:text-primary transition-colors">Press</Link></div>
                <div><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 DesignPro. Crafted with ❤️ for the fashion community. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumHomepage;