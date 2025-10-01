import { useState } from "react";
import { Header } from "@/components/navbar/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, MessageCircle, Heart } from "lucide-react";
import { VerificationBadge } from "@/components/ui/verification-badge";

const designers = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "Mumbai, India",
    specialties: ["Bridal Wear", "Traditional", "Embroidery"],
    rating: 4.9,
    reviews: 234,
    likes: 1234,
    isVerified: true,
    bio: "Award-winning designer specializing in contemporary Indian bridal wear with intricate embroidery work.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Delhi, India",
    specialties: ["Menswear", "Formal", "Suits"],
    rating: 4.8,
    reviews: 189,
    likes: 987,
    isVerified: true,
    bio: "Expert in bespoke menswear and formal attire with over 15 years of experience.",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    avatar: "https://i.pravatar.cc/150?img=5",
    location: "Bangalore, India",
    specialties: ["Fusion Wear", "Contemporary", "Casual"],
    rating: 4.7,
    reviews: 156,
    likes: 876,
    isVerified: false,
    bio: "Creating unique fusion designs that blend traditional Indian elements with modern aesthetics.",
  },
  {
    id: 4,
    name: "Rohit Kumar",
    avatar: "https://i.pravatar.cc/150?img=13",
    location: "Jaipur, India",
    specialties: ["Ethnic Wear", "Rajasthani", "Block Print"],
    rating: 4.9,
    reviews: 201,
    likes: 1456,
    isVerified: true,
    bio: "Preserving traditional Rajasthani craftsmanship with contemporary design sensibilities.",
  },
  {
    id: 5,
    name: "Kavya Iyer",
    avatar: "https://i.pravatar.cc/150?img=9",
    location: "Chennai, India",
    specialties: ["Sarees", "Silk", "South Indian"],
    rating: 4.8,
    reviews: 178,
    likes: 1123,
    isVerified: true,
    bio: "Specialized in exquisite silk sarees and traditional South Indian bridal attire.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=14",
    location: "Kolkata, India",
    specialties: ["Kurta", "Indo-Western", "Festival Wear"],
    rating: 4.6,
    reviews: 143,
    likes: 765,
    isVerified: false,
    bio: "Creating vibrant festival wear and indo-western styles for the modern Indian.",
  },
];

export default function FindDesigners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const allSpecialties = Array.from(
    new Set(designers.flatMap((d) => d.specialties))
  );

  const filteredDesigners = designers.filter((designer) => {
    const matchesSearch =
      designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designer.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = selectedSpecialty
      ? designer.specialties.includes(selectedSpecialty)
      : true;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Perfect Designer
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Connect with talented designers and artisans across India. Browse portfolios, 
            read reviews, and bring your fashion vision to life.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedSpecialty === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty(null)}
            >
              All Specialties
            </Badge>
            {allSpecialties.map((specialty) => (
              <Badge
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <Card key={designer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={designer.avatar} alt={designer.name} />
                    <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{designer.name}</h3>
                      {designer.isVerified && <VerificationBadge />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {designer.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {designer.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {designer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{designer.rating}</span>
                    <span className="text-muted-foreground">({designer.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>{designer.likes}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDesigners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No designers found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
