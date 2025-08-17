import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, MapPin, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/navbar/Header";

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
          `http://localhost:5000/api/public/viewPublicProfile/${userId}`
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
    <div className="min-h-screen bg-background">
        <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="mb-2">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
        </div>

        <div className="fashion-card p-6 mb-8 flex items-center gap-6 animate-fade-in border border-border/30 rounded-2xl shadow-sm">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={userData.profile?.profileImage || "/default-avatar.png"}
              alt={userData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md"
            />
            {userData.isOnline && (
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {userData.name}
              </h1>
              {userData.isVerified && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <Badge variant="secondary" className="mb-2 mt-2">
<span className="font-medium">Profession </span>  :  {userData.role}               
</Badge>
            {userData.profile?.bio && (
              <p className="mt-2 text-sm leading-snug">{userData.profile.bio}</p>
            )}
            {(userData.profile?.city || userData.profile?.state) && (
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                <MapPin className="w-4 h-4 text-primary" />
                {userData.profile?.city}, {userData.profile?.state}
              </p>
            )}
          </div>
        </div>

        {/* Designs Section */}
        <div className="fashion-card p-6 border border-border/30 rounded shadow-sm animate-slide-up">
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Designs
          </h2>
          {userData.designs.length === 0 ? (
            <p className="text-muted-foreground">No designs uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {userData.designs.map((design, i) => (
                <Card
                  key={design.id}
                    className="group overflow-hidden hover-lift p-2 card-foreground shadow-sm rounded bg-background transition-all hover:shadow-xl"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={design.images[0]?.url || "/no-image.png"}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-xl mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      {design.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {design.description}
                    </p>
                    <Link
                      to={`/product/${design.id}`}
                      className="rounded-full shadow"
                    >
                        <Button size="sm" className="rounded-full">
                          View Details
                        </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;