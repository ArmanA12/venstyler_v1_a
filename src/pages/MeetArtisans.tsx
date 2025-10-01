import { Header } from "@/components/navbar/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Award, Users, Heart } from "lucide-react";

const artisans = [
  {
    id: 1,
    name: "Ramesh Textile Co.",
    avatar: "https://i.pravatar.cc/150?img=33",
    location: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Silk Weaving",
    experience: "35+ years",
    specialization: "Traditional handloom weaving techniques passed down through generations",
    products: ["Silk Sarees", "Brocade Fabrics", "Dupattas"],
    awards: 3,
    artisans: 15,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
  },
  {
    id: 2,
    name: "Kutch Embroidery Collective",
    avatar: "https://i.pravatar.cc/150?img=44",
    location: "Bhuj, Gujarat",
    craft: "Kutch Embroidery",
    experience: "20+ years",
    specialization: "Mirror work and intricate thread embroidery in vibrant colors",
    products: ["Wall Hangings", "Bags", "Cushion Covers"],
    awards: 2,
    artisans: 25,
    image: "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800",
  },
  {
    id: 3,
    name: "Jaipur Block Print Workshop",
    avatar: "https://i.pravatar.cc/150?img=55",
    location: "Jaipur, Rajasthan",
    craft: "Block Printing",
    experience: "40+ years",
    specialization: "Hand-carved wooden blocks and natural dyes",
    products: ["Textiles", "Bed Linens", "Apparel"],
    awards: 5,
    artisans: 20,
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800",
  },
  {
    id: 4,
    name: "Kanchipuram Silk Weavers",
    avatar: "https://i.pravatar.cc/150?img=66",
    location: "Kanchipuram, Tamil Nadu",
    craft: "Silk Saree Weaving",
    experience: "50+ years",
    specialization: "Pure silk sarees with temple borders and traditional motifs",
    products: ["Kanjeevaram Sarees", "Silk Fabrics"],
    awards: 4,
    artisans: 30,
    image: "https://images.unsplash.com/photo-1610665044919-4167c6d253b2?w=800",
  },
  {
    id: 5,
    name: "Lucknow Chikan Craft",
    avatar: "https://i.pravatar.cc/150?img=22",
    location: "Lucknow, Uttar Pradesh",
    craft: "Chikankari Embroidery",
    experience: "30+ years",
    specialization: "Delicate white thread embroidery on fine fabrics",
    products: ["Kurtis", "Sarees", "Dress Materials"],
    awards: 3,
    artisans: 40,
    image: "https://images.unsplash.com/photo-1583391733981-8b4ae3e4f753?w=800",
  },
  {
    id: 6,
    name: "Pashmina Weavers of Kashmir",
    avatar: "https://i.pravatar.cc/150?img=77",
    location: "Srinagar, Jammu & Kashmir",
    craft: "Pashmina Weaving",
    experience: "45+ years",
    specialization: "Hand-spun and hand-woven pashmina shawls",
    products: ["Pashmina Shawls", "Stoles", "Scarves"],
    awards: 6,
    artisans: 18,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
  },
];

export default function MeetArtisans() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Meet Our Artisans
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Discover the skilled craftspeople behind our beautiful designs. Each piece tells a story 
            of tradition, dedication, and exceptional craftsmanship passed down through generations.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Preserving Traditional Crafts</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              India's rich heritage of textile and fashion crafts is kept alive by master artisans who 
              have dedicated their lives to perfecting traditional techniques. venStyler is proud to 
              partner with these skilled craftspeople, providing them with a platform to showcase their 
              work to a global audience.
            </p>
            <p>
              By choosing handcrafted products from our artisan partners, you're not just buying a product – 
              you're supporting sustainable livelihoods, preserving cultural heritage, and investing in 
              pieces that carry the soul of centuries-old traditions.
            </p>
          </CardContent>
        </Card>

        {/* Artisans Grid */}
        <div className="space-y-8">
          {artisans.map((artisan) => (
            <Card key={artisan.id} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="h-64 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${artisan.image})` }}
                />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={artisan.avatar} alt={artisan.name} />
                      <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1">{artisan.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {artisan.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{artisan.craft}</Badge>
                      <p className="text-sm text-muted-foreground">{artisan.specialization}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span><strong>{artisan.awards}</strong> Awards</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span><strong>{artisan.artisans}</strong> Artisans</span>
                      </div>
                      <div className="text-muted-foreground">
                        {artisan.experience}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {artisan.products.map((product) => (
                          <Badge key={product} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">View Products</Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Support Traditional Craftsmanship</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every purchase directly supports artisan communities and helps preserve India's rich cultural heritage 
            for future generations.
          </p>
          <Button size="lg">Explore Artisan Collections</Button>
        </div>
      </div>
    </div>
  );
}
