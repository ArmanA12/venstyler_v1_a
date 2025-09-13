import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { ProfileProgress } from "@/components/ProfileProgress";
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
  ShoppingBag,
  Menu,
  X,
  Upload,
  LucideUpload,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MessageSquareMore,
} from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileImage } from "@/hooks/useProfileImage";
import { useMe } from "@/hooks/useMe";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useMyProfile } from "@/hooks/useMyProfile";
import { useSavedDesigns } from "@/hooks/useSaveDesign";
import { useLikedDesigns } from "@/hooks/useLikeDesign";
import { RatingsTab } from "@/tab/RatingTab";
import { ChatTab } from "@/tab/ChatTab";

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
  "Fashion Merchandiser",
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const { data: me } = useMe();
  const [profileImage, setProfileImage] = useState<string | null>(
    me?.profileImage ?? null
  );
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showMobleHeader, setShowMobileSidebar] = useState(false);
  // const [profileImage, setProfileImage] = useState<string | null>(null);

  const { data: myProfile, isLoading } = useMyProfile();
  const updateMut = useUpdateProfile();

  const { inputRef, inputAttrs, openPicker, previewUrl, uploading, remove } =
    useProfileImage({
      onSuccess: (url) => setProfileImage(url || null),
      onError: (e) => console.error(e),
    });

  const { data: savedDesigns, isLoading: loadingSaved } = useSavedDesigns();
  const { data: likedDesigns, isLoading: loadingLiked } = useLikedDesigns();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PersonalInfoForm>({
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
    },
  });

  useEffect(() => {
    setProfileImage(me?.profileImage ?? null);
  }, [me]);

  useEffect(() => {
    if (!myProfile) return;
    reset({
      name: myProfile.name ?? "",
      email: myProfile.email ?? "",
      phone: myProfile.phone ?? "",
      address: myProfile.address ?? "",
      city: myProfile.city ?? "",
      state: myProfile.state ?? "",
      pincode: myProfile.pincode ?? "",
      country: myProfile.country ?? "",
      profession: myProfile.profession ?? "",
      numberOfEmployees: String(myProfile.numberOfEmployees ?? ""),
      bio: myProfile.bio ?? "",
      googleMapLink: myProfile.googleMapLink ?? "",
    });
    // also set the avatar shown at the top, if you keep it in state:
    setProfileImage(myProfile.profileImage ?? null);
  }, [myProfile, reset]);

  const watchedValues = watch();

  const sidebarItems = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "sales", label: "Sales & Orders", icon: Package },
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "ratings", label: "Product Ratings", icon: Star },
    { id: "saved", label: "Saved Designs", icon: Bookmark },
    { id: "liked", label: "Liked Designs", icon: Heart },
    { id: "complaints", label: "My Complaints", icon: MessageSquareMore },
  ];

  const onSubmitPersonalInfo = async (formData: PersonalInfoForm) => {
    // cast to UpdateProfileInput shape
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      profession: formData.profession,
      numberOfEmployees: formData.numberOfEmployees || "",
      bio: formData.bio || "",
      googleMapLink: formData.googleMapLink || "",
    };

    await updateMut.mutateAsync(payload);
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
                profileImage: profileImage,
              }}
            />

            <div className="fashion-card p-6">
              <input ref={inputRef} {...inputAttrs} className="hidden" />

              <h3 className="text-xl font-playfair font-semibold mb-4">
                Profile Picture
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    {previewUrl || profileImage ? (
                      <img
                        src={previewUrl || profileImage || ""}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <button
                    onClick={openPicker}
                    disabled={uploading}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="mr-3"
                    onClick={openPicker}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Photo"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    onClick={remove}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmitPersonalInfo)}>
              <div className="fashion-card p-6">
                <h3 className="text-xl font-playfair font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Name *</Label>
                    <Input
                      id="firstName"
                      {...register("name")}
                      className="fashion-input"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="fashion-input"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="fashion-input"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      className="fashion-input"
                      placeholder="Street address"
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register("city")}
                      className="fashion-input"
                    />
                    {errors.city && (
                      <p className="text-destructive text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      {...register("state")}
                      className="fashion-input"
                    />
                    {errors.state && (
                      <p className="text-destructive text-sm">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      {...register("pincode")}
                      className="fashion-input"
                    />
                    {errors.pincode && (
                      <p className="text-destructive text-sm">
                        {errors.pincode.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      {...register("country")}
                      className="fashion-input"
                    />
                    {errors.country && (
                      <p className="text-destructive text-sm">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Profession *</Label>
                    <Select
                      onValueChange={(value) => setValue("profession", value)}
                    >
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
                    {errors.profession && (
                      <p className="text-destructive text-sm">
                        {errors.profession.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfEmployees">
                      Number of Employees
                    </Label>
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
                    <Label htmlFor="googleMapLink">
                      Google Map Link (Optional)
                    </Label>
                    <Input
                      id="googleMapLink"
                      type="url"
                      {...register("googleMapLink")}
                      className="fashion-input"
                      placeholder="https://maps.google.com/..."
                    />
                    {errors.googleMapLink && (
                      <p className="text-destructive text-sm">
                        {errors.googleMapLink.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="mt-4 fashion-button">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        );

      case "sales":
        navigate('/userDashboard');
        break;

      case "chats":
        return <ChatTab />;

      case "ratings":
        return <RatingsTab />;

      case "complaints":
        // Dummy complaints data
        const dummyComplaints = [
          {
            id: "CMP-001",
            title: "Product quality issue with evening dress",
            category: "Product Quality",
            status: "In Progress",
            priority: "High",
            createdDate: "2024-01-15",
            lastUpdate: "2024-01-18",
            description: "The fabric quality doesn't match the description. The material feels cheap and the stitching is poor.",
            response: "We have forwarded your complaint to our quality team. A replacement will be sent within 3-5 business days."
          },
          {
            id: "CMP-002", 
            title: "Late delivery of wedding outfit",
            category: "Delivery",
            status: "Resolved",
            priority: "Medium",
            createdDate: "2024-01-10",
            lastUpdate: "2024-01-12",
            description: "My wedding dress order was delivered 3 days after the promised delivery date.",
            response: "We sincerely apologize for the delay. A full refund of shipping charges has been processed."
          },
          {
            id: "CMP-003",
            title: "Customer service was unprofessional",
            category: "Customer Service", 
            status: "Open",
            priority: "Low",
            createdDate: "2024-01-20",
            lastUpdate: "2024-01-20",
            description: "The customer service representative was rude and unhelpful when I called about my order.",
            response: null
          }
        ];

        const getStatusIcon = (status: string) => {
          switch (status) {
            case "Open":
              return <Clock className="h-4 w-4 text-orange-500" />;
            case "In Progress":
              return <AlertCircle className="h-4 w-4 text-blue-500" />;
            case "Resolved":
              return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            default:
              return <XCircle className="h-4 w-4 text-gray-500" />;
          }
        };

        const getStatusColor = (status: string) => {
          switch (status) {
            case "Open":
              return "bg-orange-100 text-orange-800 border-orange-200";
            case "In Progress":
              return "bg-blue-100 text-blue-800 border-blue-200";
            case "Resolved":
              return "bg-green-100 text-green-800 border-green-200";
            default:
              return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        const getPriorityColor = (priority: string) => {
          switch (priority) {
            case "High":
              return "bg-red-100 text-red-800 border-red-200";
            case "Medium":
              return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Low":
              return "bg-green-100 text-green-800 border-green-200";
            default:
              return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-playfair font-semibold">My Complaints</h3>
                <p className="text-sm text-muted-foreground">Track and manage your submitted complaints</p>
              </div>
              <Button 
                onClick={() => navigate('/complaints')}
                className="bg-primary hover:bg-primary/90"
              >
                <MessageSquareMore className="h-4 w-4 mr-2" />
                New Complaint
              </Button>
            </div>

            <div className="space-y-4">
              {dummyComplaints.map((complaint) => (
                <div key={complaint.id} className="fashion-card p-6 hover:shadow-lg transition-all duration-200 border border-border/50">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{complaint.title}</h4>
                        <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                          #{complaint.id}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(complaint.status)}
                            {complaint.status}
                          </div>
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority} Priority
                        </span>
                        <span className="px-2 py-1 rounded-md text-xs bg-muted/30 text-muted-foreground">
                          {complaint.category}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {complaint.description}
                      </p>

                      {complaint.response && (
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-accent">Support Response</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{complaint.response}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="text-sm font-medium">{complaint.createdDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Last Update</p>
                        <p className="text-sm font-medium">{complaint.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {dummyComplaints.length === 0 && (
              <div className="fashion-card p-8 text-center">
                <MessageSquareMore className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold mb-2">No complaints submitted</h4>
                <p className="text-muted-foreground mb-4">You haven't submitted any complaints yet.</p>
                <Button onClick={() => navigate('/complaints')}>
                  Submit Your First Complaint
                </Button>
              </div>
            )}
          </div>
        );

      case "saved":
      case "liked": {
        const isSaved = activeTab === "saved";
        const loading = isSaved ? loadingSaved : loadingLiked;
        const items = isSaved
          ? (savedDesigns ?? []).map((d, idx) => ({
            key: `saved-${idx}`,
            title: `Saved design ${idx + 1}`,
            by: d.userName,
            image: d.images?.[0] ?? "", // first image or fallback
          }))
          : (likedDesigns ?? []).map((d) => ({
            key: `liked-${d.id}`,
            title: d.title ?? "Untitled design",
            by: d.designerName ?? "Designer",
            image: d.images?.[0] ?? "",
          }));

        return (
          <div className="fashion-card p-6">
            <h3 className="text-xl font-playfair font-semibold mb-4">
              {isSaved ? "Saved Designs" : "Liked Designs"}
            </h3>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse h-64 rounded-lg bg-muted/40"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                {isSaved
                  ? "You haven’t saved any designs yet."
                  : "You haven’t liked any designs yet."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((it) => (
                  <div
                    key={it.key}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 aspect-square"
                  >
                    {/* thumb */}
                     <ImageWithFallback
                       src={it.image}
                       alt={it.title}
                       className="w-full h-full object-cover"
                       fallbackSize="lg"
                     />

                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-medium">{it.title}</p>
                        <p className="text-sm opacity-90">By {it.by}</p>
                      </div>
                    </div>

                    {/* corner icon */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {isSaved ? (
                        <Bookmark className="w-4 h-4" />
                      ) : (
                        <Heart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="container mx-auto px-4 py-6">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="hidden lg:block">
        <Header />
      </div>

      <ProfileImageUpload
        isOpen={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        onImageUpload={handleImageUpload}
      />

      <div className="w-full lg:w-4/5 mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="block lg:hidden text-sm font-medium text-muted-foreground">
            {user?.name || "User"}
          </span>

          {/* Mobile Header Right Side */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => console.log("Upload clicked")}
              className="p-2  hover:bg-muted"
            >
              <LucideUpload className="w-5 h-5" />
            </button>

            {/* Hamburger Icon */}
            <button className="p-2 " onClick={() => setShowMobileSidebar(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Link>

        <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          Profile Settings
        </h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block col-span-12 lg:col-span-3">
            <Sidebar
              items={sidebarItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            // onSignOut={handleSignOut}
            />
          </div>

          {/* Mobile Sidebar Modal */}
          {showMobleHeader && (
            <div className="fixed inset-0 z-50 bg-white shadow-md p-6 overflow-y-auto lg:hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setShowMobileSidebar(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar
                items={sidebarItems}
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setShowMobileSidebar(false);
                }}
              // onSignOut={handleSignOut}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">{renderContent()}</div>
          <div>
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ items, activeTab, setActiveTab, onSignOut }: { items: any; activeTab: any; setActiveTab: any; onSignOut?: any }) => {
  const { signOut } = useAuth();
  
  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      signOut();
    }
  };
  return (
    <div className="fashion-card p-6 space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-primary hover:bg-muted/50"
            }`}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </button>
      ))}

      <Separator className="my-4" />

      <Link to={'/settings'} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors">
        <Settings className="w-5 h-5" />
        Settings
      </Link>

      <button
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
        onClick={handleSignOut}
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
        <Trash2 className="w-5 h-5" />
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
