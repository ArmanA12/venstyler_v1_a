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
import GradientButton from "@/components/GradientButton";
import { BorderBeam } from "@/components/BorderBeam";
import SplineVenStyler from "@/components/SplineVenStyler";
import { Header } from "@/components/navbar/Header";
// import GridWithHighlights from "@/components/GridWithHighlights";
import SplineWave from "@/components/Spline";
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
  MessageCircle,
  Phone, Send, Home
} from "lucide-react";


import { useAuth } from "@/contexts/AuthContext";

const PremiumHomepage = () => {
  const { theme, setTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy fashion images for marquee
  const fashionImages = [
    {
      src: "https://i.pinimg.com/1200x/83/3f/6a/833f6afcff34c6bacb5637dead11bb06.jpg",
      alt: "Fashion Image 1",
      href: "/designers/fashion-image-1"
    },
    {
      src: "https://i.pinimg.com/1200x/24/fc/66/24fc667f93ec1cc3fdb49e069790b9a8.jpg",
      alt: "Fashion Image 2",
      href: "/designers/fashion-image-2"
    },
    {
      src: "https://i.pinimg.com/1200x/21/d3/d5/21d3d5fe5f53d4280e7590c9f7cf79d4.jpg",
      alt: "Fashion Image 3",
      href: "/designers/fashion-image-3"
    },
    {
      src: "https://i.pinimg.com/1200x/ca/87/e3/ca87e33af6f384499b2b9d2c93963cd1.jpg",
      alt: "Fashion Image 4",
      href: "/designers/fashion-image-4"
    },
    {
      src: "https://i.pinimg.com/1200x/27/53/0f/27530f8ea31f28f58fa3a34d0fa46701.jpg",
      alt: "Fashion Image 5",
      href: "/designers/fashion-image-5"
    },
    {
      src: "https://i.pinimg.com/1200x/b4/7f/ae/b47fae93801b46971ab8b77a40c34d32.jpg",
      alt: "Fashion Image 6",
      href: "/designers/fashion-image-6"
    },
    {
      src: "https://i.pinimg.com/1200x/20/b5/d4/20b5d48ffa33bfebd7b7e33b9a4b5d22.jpg",
      alt: "Fashion Image 7",
      href: "/designers/fashion-image-7"
    },
    {
      src: "https://i.pinimg.com/1200x/f7/67/4f/f7674f6f3f232b3b01765f81cebbe706.jpg",
      alt: "Fashion Image 8",
      href: "/designers/fashion-image-8"
    },
    {
      src: "https://i.pinimg.com/1200x/e0/e3/cb/e0e3cbecd18fe0c8884bd6b796a6f5ad.jpg",
      alt: "Fashion Image 9",
      href: "/designers/fashion-image-9"
    },
    {
      src: "https://i.pinimg.com/1200x/ab/3f/3f/ab3f3f66410d7b2301ddcb4396280e2f.jpg",
      alt: "Fashion Image 10",
      href: "/designers/fashion-image-10"
    },
    {
      src: "https://i.pinimg.com/1200x/b1/08/85/b108854cb720c565fc1e8d7c76e74256.jpg",
      alt: "Fashion Image 11",
      href: "/designers/fashion-image-11"
    },
    {
      src: "https://i.pinimg.com/1200x/75/f5/80/75f580f90ad4d8e3261e043a34248951.jpg",
      alt: "Fashion Image 12",
      href: "/designers/fashion-image-12"
    },
    {
      src: "https://i.pinimg.com/1200x/07/d1/a5/07d1a57ec8231eff589181c1f7f0f7b9.jpg",
      alt: "Fashion Image 13",
      href: "/designers/fashion-image-13"
    },
    {
      src: "https://i.pinimg.com/1200x/1e/ce/23/1ece232f6fadeec6109262133e06e96c.jpg",
      alt: "Fashion Image 14",
      href: "/designers/fashion-image-14"
    },
    {
      src: "https://i.pinimg.com/1200x/ce/08/00/ce0800d60cfe8f0b3f26cd50aa5b4198.jpg",
      alt: "Fashion Image 15",
      href: "/designers/fashion-image-15"
    },
    {
      src: "https://i.pinimg.com/1200x/4d/4f/0e/4d4f0e9ad8a9a195a018071be4101925.jpg",
      alt: "Fashion Image 16",
      href: "/designers/fashion-image-16"
    },
    {
      src: "https://i.pinimg.com/1200x/56/43/fd/5643fd8114815d97900916ec3362e0b3.jpg",
      alt: "Fashion Image 17",
      href: "/designers/fashion-image-17"
    },
    {
      src: "https://i.pinimg.com/1200x/92/f2/d2/92f2d254933808a59149478ddf776f4d.jpg",
      alt: "Fashion Image 18",
      href: "/designers/fashion-image-18"
    },
    {
      src: "https://i.pinimg.com/1200x/f1/48/d6/f148d6b8d66c0934514508e2e8d253d6.jpg",
      alt: "Fashion Image 19",
      href: "/designers/fashion-image-19"
    },
    {
      src: "https://i.pinimg.com/1200x/f1/48/d6/f148d6b8d66c0934514508e2e8d253d6.jpg",
      alt: "Fashion Image 20",
      href: "/designers/fashion-image-20"
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
      title: "Complete Delivery",
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
      {/* Header */}
      <Header />

      {/* Hero Section with Amazing Animations */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-accent/30 to-primary/30 rounded-full blur-3xl"
          />

          {/* Animated grid */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_100%)]"
          />

          {/* Floating animated icons */}
          {[
            { Icon: MessageCircle, left: "10%", top: "20%", delay: 0 },
            { Icon: Award, right: "10%", top: "25%", delay: 1 },
            { Icon: Heart, left: "15%", bottom: "30%", delay: 2 },
            { Icon: Star, right: "15%", bottom: "35%", delay: 1.5 },
            { Icon: Crown, left: "8%", top: "50%", delay: 2.5 },
            { Icon: Sparkles, right: "8%", top: "45%", delay: 3 },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
              style={{ left: item.left, right: item.right, top: item.top, bottom: item.bottom }}
              className="absolute z-10 p-1 w-12 h-12 rounded-xl flex items-center justify-center"
            >
              {/* Glowing lines */}
              <motion.div
                animate={{ scaleY: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 1, delay: item.delay + 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40px] w-[1px] h-[40px] bg-gradient-to-t from-primary to-transparent"
              />
              <motion.div
                animate={{ scaleY: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 1, delay: item.delay + 0.7 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40px] w-[1px] h-[40px] bg-gradient-to-b from-primary to-transparent"
              />
              <motion.div
                animate={{ scaleX: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 1, delay: item.delay + 0.6 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40px] h-[1px] w-[40px] bg-gradient-to-l from-primary to-transparent"
              />
              <motion.div
                animate={{ scaleX: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 1, delay: item.delay + 0.8 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40px] h-[1px] w-[40px] bg-gradient-to-r from-primary to-transparent"
              />

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="z-50 overflow-clip relative backdrop-blur-md flex justify-center items-center w-10 h-10 rounded-full border border-primary/20"
              >
                <item.Icon className="w-5 h-5 font-extralight text-primary" />
                <div className="w-6 h-6 bg-primary blur-xl absolute top-2 left-2" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Badge variant="outline" className="mb-8 mt-16 px-6 py-3 text-sm font-medium border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                </motion.div>
                Redefining Fashion Technology
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tight"
            >
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block text-foreground mb-2"
              >
                The Future of
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                <motion.div
                  animate={{
                    backgroundPosition: ["0% center", "200% center"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Designer Management
                </motion.div>
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-md md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Where creativity meets technology. Connect with elite designers, master artisans,
              <br className="hidden md:block" />
              and transform your vision into extraordinary fashion reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GradientButton size="lg" className="group">
                    Start Creating
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block ml-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </GradientButton>
                </motion.div>
              </Link>
              <Link to="/explore">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="group px-10 py-6 text-lg font-semibold border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-500 backdrop-blur-sm"
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { number: "1.0K+", label: "Elite Designers", icon: Users },
              { number: "5.0K+", label: "Satisfied Clients", icon: Heart },
              { number: "10K+", label: "Designs Crafted", icon: Palette },
              { number: "99.9%", label: "Success Rate", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.7 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
                className="group text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.9 + index * 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      {/* Seamless Order Flow with Amazing Animations */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 relative overflow-hidden border-b border-border/80"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.1),transparent_70%)]"
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Zap className="w-4 h-4 mr-2" />
                </motion.div>
                Engineered Excellence
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
            >
              <motion.span
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Seamless Order Experience
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
            >
              A meticulously crafted journey from initial concept to final masterpiece,
              <br className="hidden md:block" />
              where every step is designed for perfection and transparency.
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {orderFlow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated Connection Line */}
                  {index < orderFlow.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                      viewport={{ once: true }}
                      className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-transparent z-0 origin-left"
                    />
                  )}

                  <motion.div
                    className="relative text-center p-8 bg-card/80 backdrop-blur-sm border rounded-xl border-border/10 hover:border-primary/40 transition-all duration-700 shadow-lg hover:shadow-2xl overflow-hidden"
                    whileHover={{
                      boxShadow: "0 20px 60px -15px hsl(var(--primary) / 0.4)",
                    }}
                  >
                    {/* Animated Step Number */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 0 0 hsl(var(--primary) / 0.4)",
                            "0 0 0 8px hsl(var(--primary) / 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                      >
                        {step.step}
                      </motion.div>
                    </motion.div>

                    {/* Animated Icon Container */}
                    <div className="relative mb-8 mt-4">
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                        className="w-20 h-20 mx-auto bg-gradient-to-br from-card via-primary/5 to-card border border-border/20 rounded-3xl flex items-center justify-center group-hover:border-primary/40 transition-all duration-500 shadow-inner relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <step.icon className="w-10 h-10 text-primary relative z-10" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                      viewport={{ once: true }}
                      className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.7 }}
                      viewport={{ once: true }}
                      className="text-muted-foreground leading-relaxed font-medium"
                    >
                      {step.description}
                    </motion.p>

                    {/* Animated Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3D Designer Marquee with Animated Rings */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="overflow-clip pb-20 relative bg-gradient-to-b from-background to-muted/20 border-b border-border/50"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Parent radial gradient circle with pulse */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] rounded-full"
          />

          {/* Animated Concentric circles */}
          {[128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280].map((size, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute rounded-full border border-border/50"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                animation: `spin ${20 + index * 2}s linear infinite ${index % 2 === 0 ? 'normal' : 'reverse'}`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 mt-24"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Star className="w-4 h-4 mr-2 text-primary" />
                </motion.div>
                Featured Showcase
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl z-30 md:text-6xl font-bold mb-6"
            >
              <motion.span
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                World's Best Wedding Design
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Discover premium collections from our elite designer network
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <ThreeDMarquee
              images={fashionImages}
              cols={4}
              className="max-w-6xl z-50 mx-auto border border-border/50"
              onImageClick={(image, index) => console.log(image, index)}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Ecosystem Section with Grid Animation */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-[1000px] h-[400px] ml-28 mx-auto grid grid-cols-5 grid-rows-2 gap-0 absolute top-32"
          >
            {/* Animated grid cells */}
            {[
              { bg: "bg-transparent", border: "border border-border/70" },
              { bg: "bg-purple-400/5", border: "border-t border-b border-border/70" },
              { bg: "bg-transparent", border: "border border-border/70" },
              { bg: "bg-purple-400/5", border: "border-t border-b border-border/70" },
              { bg: "", border: "border-t border-r border-b border-border/70" },
              { bg: "bg-purple-400/10", border: "border-b border-l border-r border-border/70" },
              { bg: "", border: "" },
              { bg: "bg-purple-400/10", border: "border-b border-border/70" },
              { bg: "", border: "" },
              { bg: "bg-purple-400/10", border: "border-r border-b border-border/70" },
            ].map((cell, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`w-[200px] h-[200px] ${cell.bg} ${cell.border}`}
                style={{
                  animation: cell.bg.includes("purple") ? `pulse ${3 + index * 0.2}s ease-in-out infinite` : 'none'
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Globe className="w-4 h-4 mr-2 text-primary" />
                </motion.div>
                Complete Ecosystem
              </Badge>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <motion.span
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Social Media for Designers
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Connecting designers, artisans, and buyers in one comprehensive platform
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecosystemCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="group text-center p-8 bg-card/80 backdrop-blur-lg border border-border/50 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 relative z-10"
                  >
                    <div className="text-primary">
                      {card.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors relative z-10">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed relative z-10">
                    {card.description}
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-primary relative z-10"
                  >
                    {card.count}
                  </motion.div>
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

            {/* Left side (same as original) */}
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
                  { icon: <MessageSquare className="w-5 h-5" />, text: "Real-time messaging with all designer" },
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

            {/* Right side (Chat box updated) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="h-full bg-card rounded-2xl p-6 shadow-2xl flex flex-col border-2 border-border/30">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 ">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg"
                          alt="John Doe"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">John Doe</div>
                        <div className="text-xs text-muted-foreground">Online</div>
                      </div>
                    </div>
                    <div className="flex gap-5 text-muted-foreground">
                      <Video className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary transition" />
                      <Phone className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary transition" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 space-y-4 overflow-hidden">
                    {[
                      "Your design concept looks amazing! I've started working on the initial sketches...",
                      "That's perfect! Could you adjust the neckline slightly?",
                      "Absolutely! I'll have the updated version ready by tomorrow.",
                    ].map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                        className={`p-3 text-sm rounded-lg max-w-xs ${index % 2 === 0
                          ? "bg-primary/10 text-left"
                          : "bg-muted ml-auto"
                          }`}
                      >
                        {msg}
                      </motion.div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      placeholder="Typing..."
                      className="flex-1 px-4 py-2 text-sm bg-background border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="px-4 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition">
                      <Send className="w-4 h-4" />
                    </button>
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
        className="pt-32 overflow-clip border-b border-border/80 bg-gradient-to-br from-background via-muted/10 to-background"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5"
          >
            <Shield className="w-4 h-4 mr-2 text-primary" />
            Trust & Security
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Security, Our Priority
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Advanced security measures and quality assurance protocols protect every
            transaction and design.
          </p>

          {/* Wrapper */}
          <div className="border border-border/50 -mb-8  rounded-xl bg-muted-foreground/5 p-2">
            <div className="grid md:grid-cols-3 border border-border/50 -mb-8 rounded-xl bg-background  px-0">

              {/* Box 1 */}
              <div className="border-r border-border/50 px-10 pt-20 pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center hover-scale bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Top Level Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      256-bit SSL encryption protecting all your data and transactions
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Box 2 */}
              <div className="border-r border-border/50 px-10 pt-20 pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center hover-scale bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      100% satisfaction guarantee with multiple quality checkpoints
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Box 3 */}
              <div className="px-10 pt-20 pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center hover-scale bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary">
                      <Coffee className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Round-the-clock customer support for all your needs
                    </p>
                  </Card>
                </motion.div>
              </div>

            </div>
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
              <GradientButton variant="outline" size="xl" className="text-lg px-20 py-1 rounded-full border-2 hover:bg-accent/5 hover-scale">
                <Eye className="w-5 h-5 mr-2" />
                Browse Portfolio
              </GradientButton>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-br from-muted/30 via-background to-muted/20 border-t border-border/50 overflow-hidden">
        <div className="relative py-16 px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/30 to-transparent"></div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Quick Links</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/explore" className="hover:text-primary transition-colors duration-300">Browse Designs</Link></li>
                  <li><Link to="/find-designers" className="hover:text-primary transition-colors duration-300">Find Designers</Link></li>
                  <li><Link to="/meet-artisans" className="hover:text-primary transition-colors duration-300">Meet Artisans</Link></li>
                  <li><Link to="/pricing" className="hover:text-primary transition-colors duration-300">Pricing</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/terms" className="hover:text-primary transition-colors duration-300">Terms and Conditions</Link></li>
                  <li><Link to="/return-policy" className="hover:text-primary transition-colors duration-300">Return Policy</Link></li>
                  <li><Link to="/privacy" className="hover:text-primary transition-colors duration-300">Privacy Policy</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Connect</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/support" className="hover:text-primary transition-colors duration-300">Support</Link></li>
                  <li><Link to="/community" className="hover:text-primary transition-colors duration-300">Community</Link></li>
                  <li><Link to="/newsletter" className="hover:text-primary transition-colors duration-300">Newsletter</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p>&nbsp;</p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.5,
              duration: 0.6,
              ease: 'easeOut'
            }
          }}
          viewport={{ once: true }}
          className="text-sm md:text-base lg:text-lg text-muted-foreground font-light text-center tracking-wide relative z-30"
          style={{
            textShadow: `
              0 1px 2px hsl(var(--background) / 0.8),
              0 2px 4px hsl(var(--primary) / 0.2)
            `,
          }}
        >
          © 2024 venStyler. All rights reserved.
        </motion.div>
        <p>&nbsp;</p>

        {/* Enhanced 3D venStyler Text with Spline effects */}
        <SplineVenStyler />

        {/* Copyright text */}
        <p>&nbsp;</p>
        <p>&nbsp;</p>

      </footer>
    </div>
  );
};

export default PremiumHomepage;


