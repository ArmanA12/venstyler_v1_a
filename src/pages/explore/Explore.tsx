// src/pages/Explore.tsx
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Star, Heart, Users, Sparkles, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { api } from "@/lib/api";

// Types for API response
interface User {
  id: number;
  name: string;
  role: string;
  profile: {
    profileImage?: string;
  } | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    users: User[];
  };
}

const ExplorePage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedRole, setSelectedRole] = useState("DESIGNER");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const roles = [
    { 
      id: "DESIGNER", 
      label: "Designers", 
      description: "Creative Fashion Designers",
      icon: Sparkles,
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20"
    },
    { 
      id: "KARIGAR", 
      label: "Karigars", 
      description: "Skilled Craftspeople",
      icon: Star,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
    },
    { 
      id: "VENDOR", 
      label: "Vendors", 
      description: "Fashion Suppliers",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    { 
      id: "USER", 
      label: "All Users", 
      description: "Browse Everyone",
      icon: Heart,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20"
    }
  ];

  const fetchUsers = async (role: string, page: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/public/getListOfUsersByRole?role=${role}&page=${page}`);
      const data: ApiResponse = response.data;
      
      if (data.success) {
        setUsers(data.data.users);
        setCurrentPage(data.data.currentPage);
        setTotalPages(data.data.totalPages);
        setTotalUsers(data.data.totalUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(selectedRole, currentPage);
  }, [selectedRole, currentPage]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const getRoleIcon = (role: string) => {
    const roleData = roles.find(r => r.id === role);
    return roleData?.icon || Users;
  };

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.id === role);
    return roleData?.color || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-muted/30 to-secondary-muted/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 group"
            >
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-playfair font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                Discover Creators
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-foreground border-white/30">
                  <Users className="w-3 h-3 mr-1" />
                  {totalUsers} Professionals
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-foreground border-white/30">
                  <Star className="w-3 h-3 mr-1" />
                  Verified Talents
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Enhanced Role Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center animate-slide-up">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Button
                key={role.id}
                variant="ghost"
                onClick={() => handleRoleChange(role.id)}
                className={`
                  group relative px-8 py-6 rounded-3xl transition-all duration-500 hover-scale border-2
                  ${selectedRole === role.id 
                    ? `bg-gradient-to-br ${role.color} text-white border-white/30 shadow-2xl shadow-primary/25` 
                    : `${role.bgColor} border-border/50 hover:border-primary/30 shadow-soft hover:shadow-medium`
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 text-center">
                  <div className={`mx-auto mb-3 p-3 rounded-2xl ${selectedRole === role.id ? 'bg-white/20' : 'bg-white/50'} transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${selectedRole === role.id ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div className="font-bold text-lg">{role.label}</div>
                  <div className={`text-sm ${selectedRole === role.id ? 'text-white/80' : 'text-muted-foreground'} mt-1`}>
                    {role.description}
                  </div>
                </div>
                
                {selectedRole === role.id && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent"></div>
                )}
              </Button>
            );
          })}
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="relative group">
            <div className="absolute inset-0 gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative glass rounded-2xl p-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary" />
                <Input
                  type="text"
                  placeholder="Search talented creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-transparent border-0 text-lg placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30 rounded-xl"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-primary rounded-xl px-4"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Users Grid */}
        {loading ? (
          <div className={`grid gap-8 mb-12 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 max-w-4xl mx-auto"}`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse glass">
                <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-t-xl" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted/50 rounded-lg" />
                  <div className="h-4 bg-muted/50 rounded w-3/4" />
                  <div className="h-3 bg-muted/50 rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className={`grid gap-8 mb-12 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 max-w-4xl mx-auto"}`}>
              {filteredUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                const roleColor = getRoleColor(user.role);
                
                if (viewMode === "list") {
                  return (
                    <Card key={user.id} className="group overflow-hidden hover-lift glass border-0 shadow-elegant animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center p-6 gap-6">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${roleColor} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                            <img
                              src={user.profile?.profileImage || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"}
                              alt={user.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face";
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-playfair font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                            {user.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className={`bg-gradient-to-r ${roleColor} text-white border-0`}>
                              <RoleIcon className="w-3 h-3 mr-1" />
                              {user.role.toLowerCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button className="gradient-primary hover-scale shadow-colored">
                          View Profile
                        </Button>
                      </div>
                    </Card>
                  );
                }

                return (
                  <Card key={user.id} className="group overflow-hidden hover-lift glass border-0 shadow-elegant animate-fade-in hover-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative">
                      <div className="relative aspect-square overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${roleColor} opacity-20`}></div>
                        <img
                          src={user.profile?.profileImage || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"}
                          alt={user.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face";
                          }}
                        />
                        
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Role Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className={`bg-gradient-to-r ${roleColor} text-white border-0 shadow-lg backdrop-blur-sm`}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {user.role.toLowerCase()}
                          </Badge>
                        </div>
                        
                        {/* Hover Action Button */}
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                          <Button className="w-full bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300 shadow-lg">
                            <Heart className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 bg-gradient-to-b from-background/95 to-background">
                        <h3 className="font-playfair font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {user.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 capitalize">
                          Professional {user.role.toLowerCase()}
                        </p>
                        
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">4.9 (127 reviews)</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 hover:bg-primary/10 border-primary/20">
                            <Heart className="w-4 h-4 mr-1" />
                            Follow
                          </Button>
                          <Button size="sm" className="flex-1 gradient-primary shadow-colored hover-scale">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center animate-fade-in">
                <div className="glass rounded-2xl p-2">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={`rounded-xl ${currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/20 hover-scale"}`}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className={`cursor-pointer rounded-xl transition-all duration-300 ${
                              currentPage === page 
                                ? 'gradient-primary text-white shadow-colored' 
                                : 'hover:bg-primary/10 hover-scale'
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={`rounded-xl ${currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/20 hover-scale"}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}

            {/* Enhanced Empty State */}
            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-20 animate-fade-in">
                <div className="relative mx-auto mb-8 w-40 h-40">
                  <div className="absolute inset-0 gradient-primary rounded-full blur-2xl opacity-20"></div>
                  <div className="relative w-full h-full rounded-full glass flex items-center justify-center">
                    <Search className="w-20 h-20 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-playfair font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  No creators found
                </h3>
                <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                  We couldn't find any creators matching your search. Try adjusting your filters or search terms.
                </p>
                <Button onClick={() => setSearchQuery("")} className="gradient-primary shadow-colored hover-scale">
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom navigation for mobile */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default ExplorePage;
