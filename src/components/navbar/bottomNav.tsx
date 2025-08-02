import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Search,
  PlusCircle,
  User,
  Compass,
  Settings,
  LogOut,
  Shield,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const BottomNav = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to upload");
      navigate("/signin");
    } else {
      navigate("/upload-product");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border/50 backdrop-blur-lg">
      <div className="flex justify-between px-6 py-2">
        <Link
          to="/"
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary"
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">Home</span>
        </Link>

        <Link
          to="/search"
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary"
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px]">Search</span>
        </Link>

        <button
          onClick={handleUploadClick}
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[11px]">Upload</span>
        </button>

        <Link
          to="/explore"
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px]">Explore</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
              <User className="w-5 h-5" />
              <span className="text-[11px]">Profile</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="fashion-card border-0 w-48 mb-2 mr-2"
          >
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin">
                    <Shield className="w-4 h-4 mr-2" /> User Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/signin">
                    <User className="w-4 h-4 mr-2" /> Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
