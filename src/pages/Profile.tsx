import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { ProfileProgress } from "@/components/ProfileProgress";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Camera, 
  Edit, 
  Package, 
  MessageCircle, 
  Star, 
  Bookmark, 
  Heart, 
  LogOut, 
  Trash2,
  Settings,
  User,
  ShoppingBag
} from "lucide-react";

const personalInfoSchema = z.object({
  name: z.string().min(1, "First name is required"),

  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(5, "Pincode must be at least 5 digits"),
  country: z.string().min(1, "Country is required"),
  profession: z.string().min(1, "Profession is required"),
  numberOfEmployees: z.string().optional(),
  bio: z.string().optional(),
  googleMapLink: z.string().url().optional().or(z.literal("")),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

const professions = [
  "Fashion Designer",
  "Textile Designer", 
  "Costume Designer",
  "Fashion Merchandiser"
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      profession: "",
      numberOfEmployees: "",
      bio: "",
      googleMapLink: "",
    }
  });

  const watchedValues = watch();

  const sidebarItems = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "sales", label: "Sales & Orders", icon: Package },
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "ratings", label: "Product Ratings", icon: Star },
    { id: "saved", label: "Saved Designs", icon: Bookmark },
    { id: "liked", label: "Liked Designs", icon: Heart },
  ];

  const onSubmitPersonalInfo = async (data: PersonalInfoForm) => {
    toast({
      title: "Profile updated",
      description: "Your personal information has been saved successfully.",
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            <ProfileProgress 
              profileData={{
                ...watchedValues,
                profileImage: profileImage
              }}
            />
            
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">Profile Picture</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <button 
                    onClick={() => setIsImageUploadOpen(true)}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    className="mr-3"
                    onClick={() => setIsImageUploadOpen(true)}
                  >
                    Upload Photo
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-destructive"
                    onClick={() => setProfileImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitPersonalInfo)}>
              <div className="fashion-card p-6">
                <h3 className="text-xl font-playfair font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      {...register("name")}
                      className="fashion-input" 
                    />
                    {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                  </div>
               
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...register("email")}
                      className="fashion-input" 
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input 
                      id="phone" 
                      {...register("phone")}
                      className="fashion-input" 
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input 
                      id="address" 
                      {...register("address")}
                      className="fashion-input" 
                      placeholder="Street address"
                    />
                    {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      {...register("city")}
                      className="fashion-input" 
                    />
                    {errors.city && <p className="text-destructive text-sm">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      {...register("state")}
                      className="fashion-input" 
                    />
                    {errors.state && <p className="text-destructive text-sm">{errors.state.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input 
                      id="pincode" 
                      {...register("pincode")}
                      className="fashion-input" 
                    />
                    {errors.pincode && <p className="text-destructive text-sm">{errors.pincode.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input 
                      id="country" 
                      {...register("country")}
                      className="fashion-input" 
                    />
                    {errors.country && <p className="text-destructive text-sm">{errors.country.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Profession *</Label>
                    <Select onValueChange={(value) => setValue("profession", value)}>
                      <SelectTrigger className="fashion-input">
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem key={profession} value={profession}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.profession && <p className="text-destructive text-sm">{errors.profession.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                    <Input 
                      id="numberOfEmployees" 
                      type="number"
                      {...register("numberOfEmployees")}
                      className="fashion-input" 
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea 
                      id="bio" 
                      rows={4}
                      {...register("bio")}
                      className="fashion-input resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="googleMapLink">Google Map Link (Optional)</Label>
                    <Input 
                      id="googleMapLink" 
                      type="url"
                      {...register("googleMapLink")}
                      className="fashion-input" 
                      placeholder="https://maps.google.com/..."
                    />
                    {errors.googleMapLink && <p className="text-destructive text-sm">{errors.googleMapLink.message}</p>}
                  </div>
                </div>
                <Button type="submit" className="mt-4 fashion-button">Save Changes</Button>
              </div>
            </form>
          </div>
        );

      case "sales":
        return (
          <div className="space-y-6">
            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">Sales Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">$2,450</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </div>

            <div className="fashion-card p-6">
              <h3 className="text-xl font-playfair font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Order #FC00{order}</p>
                        <p className="text-sm text-muted-foreground">2 items • $85.00</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "chats":
        return (
          <div className="fashion-card p-6">
            <h3 className="text-xl font-playfair font-semibold mb-4">Recent Conversations</h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", type: "Vendor", message: "Thanks for the quick delivery!", time: "2h ago" },
                { name: "Mike Chen", type: "Customer", message: "Can you customize this design?", time: "1d ago" },
                { name: "Emma Wilson", type: "Vendor", message: "New collection is ready", time: "3d ago" }
              ].map((chat, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{chat.name}</p>
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">{chat.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{chat.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "ratings":
        return (
          <div className="fashion-card p-6">
            <h3 className="text-xl font-playfair font-semibold mb-4">Product Ratings</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((rating) => (
                <div key={rating} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">Elegant Summer Dress</h4>
                      <div className="flex items-center gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">"Amazing quality and perfect fit!"</p>
                      <p className="text-xs text-muted-foreground mt-2">- Sarah M. • 2 days ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "saved":
      case "liked":
        return (
          <div className="fashion-card p-6">
            <h3 className="text-xl font-playfair font-semibold mb-4">
              {activeTab === "saved" ? "Saved Designs" : "Liked Designs"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Design {item}</p>
                      <p className="text-sm opacity-90">By Designer Name</p>
                    </div>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {activeTab === "saved" ? <Bookmark className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      
      <ProfileImageUpload 
        isOpen={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        onImageUpload={handleImageUpload}
      />
      
      <div className="w-4/5 mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Profile Settings
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="fashion-card p-6 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              
              <Separator className="my-4" />
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors">
                <Settings className="w-5 h-5" />
                Settings
              </button>
              
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => {
                  signOut();
                  navigate("/");
                  toast({
                    title: "Signed out",
                    description: "You have been successfully signed out.",
                  });
                }}
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;