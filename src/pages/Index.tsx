import { Header } from "@/components/Header";
import { UserTypeCard } from "@/components/UserTypeCard";
import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Users, 
  Hammer, 
  TrendingUp, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";
import design1 from "@/assets/design-1.jpg";
import design2 from "@/assets/design-2.jpg";
import designerAvatar from "@/assets/designer-avatar-1.jpg";

const Index = () => {
  const stats = [
    { label: "Active Designers", value: "2,500+" },
    { label: "Artisans Connected", value: "1,200+" },
    { label: "Designs Showcased", value: "15,000+" },
    { label: "Orders Completed", value: "5,000+" }
  ];

  const features = [
    "Portfolio showcase with high-quality image uploads",
    "Direct customer communication and order management", 
    "Connect with skilled artisans and craftspeople",
    "Social networking within the fashion community"
  ];

  const sampleDesigns = [
    {
      id: "1",
      imageUrl: design1,
      title: "Contemporary Lehenga Collection",
      designer: "Priya Sharma",
      designerAvatar: designerAvatar,
      category: "Traditional",
      likes: 234,
      comments: 18,
      isLiked: false
    },
    {
      id: "2", 
      imageUrl: design2,
      title: "Fusion Wear Series",
      designer: "Arjun Mehta",
      designerAvatar: designerAvatar,
      category: "Contemporary",
      likes: 189,
      comments: 23,
      isLiked: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Fashion Design Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              🇮🇳 Made for Indian Fashion Ecosystem
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Where Fashion
              <span className="block gradient-text bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Dreams Connect
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed animate-slide-up">
              Join India's premier social platform connecting fashion designers, customers, 
              and skilled artisans. Showcase your creativity, discover unique designs, 
              and collaborate with the finest craftspeople.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button variant="hero" size="lg" className="gap-2">
                Join the Community <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Explore Designs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a creative designer, style-conscious customer, or skilled artisan, 
              there's a perfect place for you in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <UserTypeCard
              title="Designer"
              description="Showcase your creative vision and connect with customers seeking unique fashion pieces."
              icon={Palette}
              primary={true}
              features={[
                "Portfolio showcase with unlimited uploads",
                "Direct customer messaging & orders",
                "Collaborate with expert artisans",
                "Analytics and business insights"
              ]}
              onClick={() => console.log("Designer signup")}
            />
            
            <UserTypeCard
              title="Customer"
              description="Discover exclusive designs and connect directly with talented fashion designers."
              icon={Users}
              features={[
                "Browse curated designer collections",
                "Custom order placements",
                "Direct designer communication",
                "Style inspiration and trends"
              ]}
              onClick={() => console.log("Customer signup")}
            />
            
            <UserTypeCard
              title="Artisan"
              description="Offer your specialized skills to designers and be part of creating beautiful fashion."
              icon={Hammer}
              features={[
                "Showcase your craft expertise",
                "Connect with designer clients",
                "Flexible project-based work",
                "Build your professional network"
              ]}
              onClick={() => console.log("Artisan signup")}
            />
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Designs</h2>
            <p className="text-lg text-muted-foreground">
              Discover the latest creations from our talented designer community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {sampleDesigns.map((design) => (
              <DesignCard key={design.id} {...design} />
            ))}
            {/* Repeat for more cards */}
            {sampleDesigns.map((design) => (
              <DesignCard 
                key={`${design.id}-2`} 
                {...design}
                id={`${design.id}-2`}
                likes={design.likes + 50}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Designs <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose FashionConnect?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're building more than just a platform - we're nurturing the entire 
                Indian fashion ecosystem with tools designed for modern creators.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" className="mt-8">
                Get Started Today
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary-muted rounded-2xl p-6 animate-fade-in">
                  <TrendingUp className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Growing Network</h3>
                  <p className="text-sm text-muted-foreground">Connect with thousands of fashion professionals</p>
                </div>
                <div className="bg-secondary-muted rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Star className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-semibold mb-2">Quality Focus</h3>
                  <p className="text-sm text-muted-foreground">Curated community of verified professionals</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-accent-muted rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <Palette className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-semibold mb-2">Creative Tools</h3>
                  <p className="text-sm text-muted-foreground">Professional portfolio and showcase features</p>
                </div>
                <div className="bg-muted rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">Supportive ecosystem for growth and collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
