import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
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
  Shirt
} from "lucide-react";

const PremiumHomepage = () => {
  const { theme, setTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dummy fashion images for marquee
  const fashionImages = [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571513722275-4b3ab092693b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
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
      icon: <Users className="w-8 h-8" />,
      title: "Place Order",
      description: "Connect with top designers & pay 40% upfront"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule Meeting", 
      description: "Book consultation with your designer"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Measurements",
      description: "Perfect fitting with precise measurements"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Progress",
      description: "Watch your dream design come to life"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Final Delivery",
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
      {/* Floating Theme Toggle */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed top-6 right-6 z-50 rounded-full border-2 hover-scale bg-background/80 backdrop-blur-md"
      >
        {getThemeIcon()}
      </Button>

      {/* Back to Original Homepage */}
      <Link to="/">
        <Button
          variant="outline"
          className="fixed top-6 left-6 z-50 rounded-full border-2 hover-scale bg-background/80 backdrop-blur-md"
        >
          ← Original Home
        </Button>
      </Link>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-xy" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/10 animate-pulse" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-bl from-accent/40 to-primary/40 rounded-full blur-lg animate-float delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-secondary/50 to-accent/50 rounded-full blur-md animate-float delay-2000" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">The Future of Fashion</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
              The Future of
            </span>
            <br />
            <span className="text-foreground font-extrabold">Designer Management</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top designers, artisans, and bring your dream designs to life through our premium platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transform hover-scale">
              <Play className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full border-2 hover:bg-accent/5 hover-scale">
              Explore Designs
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>5000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Order Flow */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Seamless Order Flow
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to creation - experience the most premium design journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {orderSteps.map((step, index) => (
              <Card key={index} className="relative group hover-scale bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Marquee Section */}
      <section className="py-24 bg-gradient-to-r from-background via-muted/20 to-background overflow-hidden">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              World's Best Designers
            </span>
          </h2>
        </div>

        {/* Animated Image Marquee */}
        <div className="relative h-80 overflow-hidden">
          <div className="flex animate-marquee-left gap-8">
            {[...fashionImages, ...fashionImages].map((image, index) => (
              <div key={index} className="flex-shrink-0 group">
                <Card className="w-64 h-72 overflow-hidden hover-scale border-2 border-border/50 hover:border-primary/30 transition-all duration-500">
                  <div className="relative w-full h-full">
                    <img 
                      src={image} 
                      alt={`Fashion Design ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold">Premium Design</p>
                      <p className="text-sm text-white/80">By Elite Designer</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Chat & Collaboration Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Real-time
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Collaboration
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Seamless communication between designers, clients, and artisans. 
                Share ideas, get updates, and collaborate in real-time.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Instant messaging & file sharing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Progress tracking & notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Video calls & virtual meetings</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-card/80 to-muted/40 backdrop-blur-sm border-2 border-primary/20 hover-scale">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span className="text-sm">Designer shared new sketches</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <span className="text-sm">Meeting scheduled for tomorrow</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">First draft completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Create
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of designers and clients creating the future of fashion together
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="text-lg px-12 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/25 transform hover-scale">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-12 py-4 rounded-full border-2 hover-scale">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Designer Management Platform. Crafted with ❤️ for the fashion community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumHomepage;