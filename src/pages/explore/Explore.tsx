// src/pages/Explore.tsx
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  LayoutGrid,
  List,
  Users,
  UserCog,
  Store,
  PenTool,
  User,
  Scissors,
  Gem,
  CheckCircle, // ✅ verified icon
} from "lucide-react";
import { BottomNav } from "@/components/navbar/bottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerificationBadge } from "@/components/ui/verification-badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { api } from "@/lib/api";
import { Header } from "@/components/navbar/Header";

interface UserType {
  id: number;
  name: string;
  role: string;
  isVerified?: boolean; // ✅ added field
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
    users: UserType[];
  };
}

const roles = [
  { id: "ALL", label: "All Users", icon: <Users className="w-4 h-4" /> },
  { id: "DESIGNER", label: "Designer", icon: <PenTool className="w-4 h-4" /> },
  { id: "VENDOR", label: "Vendor", icon: <Store className="w-4 h-4" /> },
  { id: "MASTER", label: "Master", icon: <UserCog className="w-4 h-4" /> },
  { id: "JARIWALA", label: "Jariwala", icon: <Gem className="w-4 h-4" /> },
  { id: "KARKHANDAR", label: "Karkhandar", icon: <Scissors className="w-4 h-4" /> },
  { id: "ARTIST", label: "Artist", icon: <Users className="w-4 h-4" /> },
  { id: "USER", label: "User", icon: <User className="w-4 h-4" /> },
];

const ExplorePage: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchUsers = async (role: string, page: number) => {
    try {
      setLoading(true);
      const response = await api.get("http://localhost:5000/api/public/getListOfUsersByRole", {
        params: role === "ALL" ? { page } : { role, page },
      });
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <Header />
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Left: Back button */}
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Center: Title */}
          <div className="text-center flex-1">
            <h1 className="text-2xl font-playfair font-bold bg-gradient-primary bg-clip-text text-transparent">
              Explore Creators
            </h1>
            <p className="text-sm text-muted-foreground">
              {totalUsers} talented professionals
            </p>
          </div>

          {/* Right: Search + View toggle */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all w-48"
              />
            </div>

            {/* Grid/List Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Role Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={selectedRole === role.id ? "default" : "outline"}
              onClick={() => handleRoleChange(role.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                selectedRole === role.id
                  ? "gradient-primary shadow-colored text-white"
                  : "bg-background/50 border-border/50 hover:bg-muted/50"
              }`}
            >
              {role.icon}
              <span className="text-sm font-medium">{role.label}</span>
            </Button>
          ))}
        </div>

        {/* Users List/Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="group overflow-hidden hover-lift p-2 card-foreground shadow-sm rounded bg-background transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={
                          user.profile?.profileImage ||
                          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
                        }
                        alt={user.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-playfair font-bold text-lg mb-2 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {user.isVerified && (
                          <VerificationBadge />
                        )}
                        {user.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                          <User className="w-3 h-3" />
                          {user.role.toLowerCase()}
                        </span>
                        <Link to={`/publicProfile/${user.id}`}>

                        <Button size="sm" className="rounded-full shadow">
                          View Profile
                        </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/40 rounded-xl transition border border-border/50 shadow-sm"
                  >
                    <img
                      src={
                        user.profile?.profileImage ||
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                      }
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 hover:border-primary transition"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {user.isVerified && (
                          <VerificationBadge />
                        )}
                        {user.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent capitalize">
                          <User className="w-3 h-3" />
                          {user.role.toLowerCase()}
                        </span>
                        <Button size="sm" className="rounded-full shadow">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages && handlePageChange(currentPage + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
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
