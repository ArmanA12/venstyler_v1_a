import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft, Heart, Eye, MessageCircle, Star } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/navbar/Header";
import { VerificationBadge } from "@/components/ui/verification-badge";

interface ProfileImage {
  url: string;
}

interface Design {
  id: number;
  title: string;
  description: string;
  images: ProfileImage[];
}

interface Profile {
  profileImage?: string;
  bio?: string;
  city?: string;
  state?: string;
}

interface UserData {
  id: number;
  name: string;
  role: string;
  isVerified: boolean;
  isOnline: boolean;
  profile?: Profile;
  designs: Design[];
}

const PublicProfilePage: React.FC = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://venstyler.armanshekh.com/api/public/viewPublicProfile/${userId}`
        );
        if (res.data.success) {
          setUserData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-muted-foreground animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Header />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Feed
          </Link>
        </div>

        {/* Hero Profile Section */}
        <div className="relative mb-12">
          <Card className="overflow-hidden border  bg-card backdrop-blur-sm animate-fade-in">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Enhanced Profile Image */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-2 border-border shadow-md">
                    <AvatarImage 
                      src={userData.profile?.profileImage || "/default-avatar.png"} 
                      alt={userData.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted text-foreground text-2xl font-bold">
                      {userData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {userData.isOnline && (
                    <div className="absolute bottom-0 right-4 w-6 h-6 bg-green-500 border-2 border-background rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Enhanced User Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                        {userData.name}
                      </h1>
                      {userData.isVerified && (
                        <VerificationBadge size="lg" />
                      )}
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
                    >
                      <Star className="w-4 h-4 mr-2 text-primary" />
                      {userData.role}
                    </Badge>
                  </div>

                  {userData.profile?.bio && (
                    <div className="max-w-2xl">
                      <p className="text-base leading-relaxed text-muted-foreground bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                        {userData.profile.bio}
                      </p>
                    </div>
                  )}

                  {(userData.profile?.city || userData.profile?.state) && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-base">
                        {userData.profile?.city}, {userData.profile?.state}
                      </span>
                    </div>
                  )}

                  {/* Stats Section */}
                  <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userData.designs.length}</div>
                      <div className="text-sm text-muted-foreground">Designs</div>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">4.8</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div className="w-px h-8 bg-border"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">127</div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Designs Section */}
        <Card className="border  bg-card backdrop-blur-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
                {/* <Eye className="w-8 h-8 text-primary" /> */}
                Portfolio
              </h2>
              <Badge variant="outline" className="px-3 py-1">
                {userData.designs.length} designs
              </Badge>
            </div>

            {userData.designs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <p className="text-xl text-muted-foreground">No designs uploaded yet</p>
                <p className="text-sm text-muted-foreground mt-2">Check back later for amazing creations!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.designs.map((design, i) => (
                  <Card
                    key={design.id}
                    className="group overflow-hidden border p-2 hover:shadow-lg rounded transition-all duration-300 hover:-translate-y-1 bg-card animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={design.images[0]?.url || "/no-image.png"}
                          alt={design.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Overlay with Quick Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-1">
                          {design.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                          {design.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>24</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>156</span>
                          </div>
                        </div>
                        
                        <Link to={`/product/${design.id}`}>
                          <Button 
                            size="sm" 
                            className="rounded-full"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfilePage;