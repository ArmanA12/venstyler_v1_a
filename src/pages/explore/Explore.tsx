// src/pages/Explore.tsx
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  // No need for useApi hook, using api directly

  const roles = [
    { id: "DESIGNER", label: "Designers", description: "Creative Fashion Designers" },
    { id: "KARIGAR", label: "Karigars", description: "Skilled Craftspeople" },
    { id: "VENDOR", label: "Vendors", description: "Fashion Suppliers" },
    { id: "USER", label: "All Users", description: "Browse Everyone" }
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

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-playfair font-bold bg-gradient-primary bg-clip-text text-transparent">
                Explore Creators
              </h1>
              <p className="text-sm text-muted-foreground">
                {totalUsers} talented professionals
              </p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Role Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={selectedRole === role.id ? "default" : "outline"}
              onClick={() => handleRoleChange(role.id)}
              className={`
                px-6 py-3 rounded-2xl transition-all duration-300 hover-lift
                ${selectedRole === role.id 
                  ? 'gradient-primary shadow-colored text-white' 
                  : 'bg-background/50 border-border/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="text-center">
                <div className="font-semibold">{role.label}</div>
                <div className="text-xs opacity-80">{role.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all"
            />
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="group overflow-hidden hover-lift fashion-card border-0 shadow-soft">
                  <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/10 to-accent/10">
                    <img
                      src={user.profile?.profileImage || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"}
                      alt={user.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <Button size="sm" className="w-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                        View Profile
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-muted-foreground text-sm capitalize">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Search className="w-16 h-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
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
