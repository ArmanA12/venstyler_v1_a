import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home,
  Search,
  Heart,
  MessageCircle,
  PlusCircle,
  User,
  Bookmark,
  Settings,
  Camera,
  Video,
  Image as ImageIcon,
  Bell,
  Globe,
  TrendingUp
} from "lucide-react";
import design1 from "@/assets/design-1.jpg";
import design2 from "@/assets/design-2.jpg";
import designerAvatar from "@/assets/designer-avatar-1.jpg";

const Index = () => {
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
      isLiked: true
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

  const stories = [
    { id: 1, name: "Your Story", avatar: designerAvatar, hasStory: false },
    { id: 2, name: "Priya", avatar: designerAvatar, hasStory: true },
    { id: 3, name: "Arjun", avatar: designerAvatar, hasStory: true },
    { id: 4, name: "Meera", avatar: designerAvatar, hasStory: true },
    { id: 5, name: "Raj", avatar: designerAvatar, hasStory: true },
  ];

  const sidebarSuggestions = [
    { name: "Fashion Week Updates", category: "Event", followers: "2.1k" },
    { name: "Textile Artisans Guild", category: "Community", followers: "1.8k" },
    { name: "Sustainable Fashion", category: "Movement", followers: "3.2k" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with glass effect */}
      <header className="sticky top-0 glass border-b border-border/50 z-50 ">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
                FashionConnect
              </h1>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search designers, collections..." 
                  className="pl-10 w-80 bg-muted/50 border-muted/50 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover-glow">
                <Home className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden hover-glow">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative hover-glow">
                <MessageCircle className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
              </Button>
              <Button variant="ghost" size="icon" className="relative hover-glow">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
              </Button>
              <Button variant="gradient" size="icon" className="shadow-colored hover:shadow-glow">
                <PlusCircle className="w-5 h-5" />
              </Button>
              <div className="story-gradient">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={designerAvatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-5/6 mx-auto px-4  ">
        <div className="grid grid-cols-12 gap-0">
          {/* Enhanced Left Sidebar */}
          <div className="col-span-3 hidden lg:block">
            <div className="sticky top-18  border-l border-border/30">
              {/* Navigation */}
              <div className="fashion-card p-6 animate-fade-in">
                <nav className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift bg-primary/10 text-primary">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift">
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Explore</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Liked Designs</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift">
                    <Bookmark className="w-5 h-5" />
                    <span className="font-medium">Saved</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-left hover-lift" onClick={() => window.location.href = '/settings'}>
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </Button>
                </nav>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="fashion-card p-6 animate-fade-in border-t border-border/50">
                <h3 className="font-semibold mb-5 text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full  justify-start gap-4 h-12  hover-glow border-primary/20 hover:border-primary/40 -z-10 relative overflow-hidden">
                    <Camera className="w-5 h-5" />
                    <span className="font-medium">Upload Design</span>
                    {/* <div className="absolute -bottom-4  w-44 border-b border-b-gray-300 h-3 bg-[#ee4482] blur-xl">

                    </div> */}
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 h-12 hover-glow border-secondary/20 hover:border-secondary/40">
                    <Video className="w-5 h-5" />
                    <span className="font-medium">Create Story</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 h-12 hover-glow border-accent/20 hover:border-accent/40">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Start Chat</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-span-12 lg:col-span-6  border-l border-r border-border/30 ">
            {/* Enhanced Stories */}
            {/* <div className="fashion-card p-6 animate-slide-up">
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {stories.map((story, index) => (
                  <div key={story.id} className="flex flex-col items-center gap-3 min-w-[85px] animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`relative ${story.hasStory ? 'story-gradient' : ''} hover-lift cursor-pointer`}>
                      <Avatar className="w-18 h-18">
                        <AvatarImage src={story.avatar} className="object-cover" />
                        <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-secondary/20">{story.name[0]}</AvatarFallback>
                      </Avatar>
                      {!story.hasStory && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full border-2 border-background flex items-center justify-center shadow-colored">
                          <PlusCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center font-medium text-muted-foreground">{story.name}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Enhanced Create Post */}
            <div className="fashion-card p-6 animate-slide-up border-b border-border/30">
              <div className="flex gap-4">
                <div className="">
                  <Avatar className="w-12 h-12 story-gradient rounded-full">
                    <AvatarImage className="rounded-full" src={designerAvatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <Input 
                    placeholder="Share your latest design or inspiration..." 
                    className="mb-4 bg-muted/50 border-muted/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  <div className="flex   justify-center items-center">
                    <div className="flex gap-2 -ml-2">
                      <Button variant="ghost" size="sm" className="gap-2 hover-glow text-primary hover:text-primary">
                        <ImageIcon className="w-4 h-4" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 hover-glow text-secondary hover:text-secondary">
                        <Video className="w-4 h-4" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 hover-glow text-accent hover:text-accent">
                        <Camera className="w-4 h-4" />
                        Collection
                      </Button>
                    </div>
                    <Button variant="gradient" size="sm" className="shadow-colored hover:shadow-glow px-6">Share</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Design Feed */}
            <div >
              {sampleDesigns.map((design, index) => (
                <div key={design.id} className="fashion-card border-b border-border/30 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Enhanced Post Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="story-gradient">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={design.designerAvatar} />
                          <AvatarFallback>{design.designer[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{design.designer}</h4>
                        <p className="text-sm text-muted-foreground">2 hours ago • Mumbai</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="hover-glow">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Enhanced Design Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={design.imageUrl} 
                      alt={design.title}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Enhanced Post Actions */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-5">
                        <Button variant="ghost" size="icon" className={`hover-glow ${design.isLiked ? "text-red-500" : ""}`}>
                          <Heart className={`w-6 h-6 ${design.isLiked ? "fill-current animate-pulse" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover-glow">
                          <MessageCircle className="w-6 h-6" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-glow">
                        <Bookmark className="w-6 h-6" />
                      </Button>
                    </div>
                    
                    <p className="font-semibold mb-2 text-lg">{design.likes.toLocaleString()} likes</p>
                    <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{design.title}</h3>
                    <p className="text-sm text-primary mb-3 font-medium">#{design.category}</p>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-0 hover:p-1 h-auto hover:text-foreground transition-colors">
                      View all {design.comments} comments
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* More enhanced feed content */}
              {sampleDesigns.map((design, index) => (
                <div key={`${design.id}-duplicate`} className="border-b border-border/30 fashion-card overflow-hidden animate-fade-in" style={{ animationDelay: `${(index + 2) * 0.2}s` }}>
                  {/* Enhanced Post Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="story-gradient">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={design.designerAvatar} />
                          <AvatarFallback>{design.designer[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{design.designer}</h4>
                        <p className="text-sm text-muted-foreground">5 hours ago • Delhi</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="hover-glow">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="relative overflow-hidden border-3 border-red-500">
                    <img 
                      src={design.imageUrl} 
                      alt={design.title}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500 "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-5">
                        <Button variant="ghost" size="icon" className="hover-glow">
                          <Heart className="w-6 h-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover-glow">
                          <MessageCircle className="w-6 h-6" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-glow">
                        <Bookmark className="w-6 h-6" />
                      </Button>
                    </div>
                    
                    <p className="font-semibold mb-2 text-lg">{(design.likes + 50).toLocaleString()} likes</p>
                    <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{design.title}</h3>
                    <p className="text-sm text-primary mb-3 font-medium">#{design.category}</p>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto hover:text-foreground transition-colors">
                      View all {design.comments + 5} comments
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="col-span-3 hidden lg:block w-[300px]">
            <div className="sticky top-18 border-r border-border/50">
              {/* Enhanced Suggestions */}
              <div className="fashion-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Suggestions for you</h3>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">See All</Button>
                </div>
                <div className="space-y-4">
                  {sidebarSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 hover-lift">
                      <div className="flex items-center gap-3">
                        <div className="story-gradient">
                          <Avatar className="w-11 h-11">
                            <AvatarImage src={designerAvatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">{suggestion.name[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{suggestion.name}</p>
                          <p className="text-xs text-muted-foreground">{suggestion.followers} followers</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover-glow border-primary/20 hover:border-primary/40 hover:bg-primary/5">Follow</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Trending */}
              <div className="fashion-card p-6 animate-fade-in border-t border-border/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Trending</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 hover-lift cursor-pointer bg-image">
                    <p className="font-medium text-sm text-primary">#SustainableFashion</p>
                    <p className="text-xs text-muted-foreground">1.2k posts today</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/5 to-accent/5 border border-secondary/10 hover-lift cursor-pointer bg-image">
                    <p className="font-medium text-sm text-secondary">#IndianTextiles</p>
                    <p className="text-xs text-muted-foreground">890 posts today</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/10 hover-lift cursor-pointer bg-image">
                    <p className="font-medium text-sm text-accent">#HandmadeDesigns</p>
                    <p className="text-xs text-muted-foreground">756 posts today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;