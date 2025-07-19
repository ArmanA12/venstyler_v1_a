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
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FashionConnect
              </h1>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search designers, collections..." 
                  className="pl-10 w-80 bg-muted/50"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Home className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5 md:hidden" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="gradient" size="icon">
                <PlusCircle className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src={designerAvatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Navigation */}
              <Card>
                <CardContent className="p-6">
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Home className="w-5 h-5" />
                      Home
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Search className="w-5 h-5" />
                      Explore
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Heart className="w-5 h-5" />
                      Liked Designs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Bookmark className="w-5 h-5" />
                      Saved
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <User className="w-5 h-5" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Settings className="w-5 h-5" />
                      Settings
                    </Button>
                  </nav>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <Camera className="w-4 h-4" />
                      Upload Design
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <Video className="w-4 h-4" />
                      Create Story
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Stories */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                      <div className={`relative ${story.hasStory ? 'p-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full' : ''}`}>
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={story.avatar} />
                          <AvatarFallback>{story.name[0]}</AvatarFallback>
                        </Avatar>
                        {!story.hasStory && (
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                            <PlusCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-center">{story.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={designerAvatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input 
                      placeholder="Share your latest design or inspiration..." 
                      className="mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Video className="w-4 h-4" />
                          Video
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Camera className="w-4 h-4" />
                          Collection
                        </Button>
                      </div>
                      <Button variant="gradient" size="sm">Share</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Feed */}
            <div className="space-y-6">
              {sampleDesigns.map((design) => (
                <Card key={design.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Post Header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={design.designerAvatar} />
                          <AvatarFallback>{design.designer[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{design.designer}</h4>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Design Image */}
                    <div className="relative">
                      <img 
                        src={design.imageUrl} 
                        alt={design.title}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    
                    {/* Post Actions */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="icon" className={design.isLiked ? "text-red-500" : ""}>
                            <Heart className={`w-5 h-5 ${design.isLiked ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageCircle className="w-5 h-5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      <p className="font-semibold mb-1">{design.likes} likes</p>
                      <h3 className="font-semibold">{design.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">#{design.category}</p>
                      <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto">
                        View all {design.comments} comments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Repeat designs for more content */}
              {sampleDesigns.map((design) => (
                <Card key={`${design.id}-duplicate`} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Post Header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={design.designerAvatar} />
                          <AvatarFallback>{design.designer[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{design.designer}</h4>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <img 
                        src={design.imageUrl} 
                        alt={design.title}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-4">
                          <Button variant="ghost" size="icon">
                            <Heart className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageCircle className="w-5 h-5" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      <p className="font-semibold mb-1">{design.likes + 50} likes</p>
                      <h3 className="font-semibold">{design.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">#{design.category}</p>
                      <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto">
                        View all {design.comments + 5} comments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Suggestions */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Suggestions for you</h3>
                    <Button variant="ghost" size="sm">See All</Button>
                  </div>
                  <div className="space-y-3">
                    {sidebarSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={designerAvatar} />
                            <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{suggestion.name}</p>
                            <p className="text-xs text-muted-foreground">{suggestion.followers} followers</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Follow</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4" />
                    <h3 className="font-semibold">Trending</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">#SustainableFashion</p>
                      <p className="text-xs text-muted-foreground">1.2k posts</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">#IndianTextiles</p>
                      <p className="text-xs text-muted-foreground">890 posts</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">#HandmadeDesigns</p>
                      <p className="text-xs text-muted-foreground">756 posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;