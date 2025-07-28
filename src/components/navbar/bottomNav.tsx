import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home, Search, PlusCircle, User, Compass, Settings, LogOut
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const BottomNav = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border/50 backdrop-blur-lg">
      <div className="flex justify-between px-6 py-2">
        {/* Home */}
        <Link to="/" className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <Home className="w-5 h-5" />
          <span className="text-[11px]">Home</span>
        </Link>

        {/* Search */}
        <Link to="/search" className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <Search className="w-5 h-5" />
          <span className="text-[11px]">Search</span>
        </Link>

        {/* Upload */}
        <button
          onClick={() => navigate("/upload-product")}
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[11px]">Upload</span>
        </button>

        {/* Explore */}
        <Link to="/explore" className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <Compass className="w-5 h-5" />
          <span className="text-[11px]">Explore</span>
        </Link>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
              <User className="w-5 h-5" />
              <span className="text-[11px]">Profile</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="fashion-card border-0 w-48 mb-2 mr-2">
            <div className="px-3 py-1">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile"><User className="w-4 h-4 mr-2" /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings"><Settings className="w-4 h-4 mr-2" /> Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
