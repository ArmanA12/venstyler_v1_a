import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search, Moon, Sun, Bell, MessageCircle,
  PlusCircle, User, Settings, LogOut, Home,
  Menu, X, Shield
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { isAuthenticated, signOut, user } = useAuth();
  const { theme, setTheme, actualTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  return (
<header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/50">
  <div className="w-full lg:w-4/5 mx-auto px-4 h-16 flex items-center justify-between">
    {/* Logo */}
   <Link to="/" className="flex items-center space-x-2">
  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
    <span className="text-lg font-bold font-cursive text-primary-foreground">V</span>
  </div>
  <span className="font-playfair text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
    Venstyler
  </span>
</Link>


    {/* Desktop Search */}
    {isAuthenticated && (
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search designs, designers..." className="pl-10 fashion-input" />
        </div>
      </div>
    )}

    {/* Right Icons */}
    <div className="flex items-center space-x-3">
      {/* Chat (Desktop) */}
      {isAuthenticated && (
        <Link to={`/chat/${user?.id}`} className="hidden md:inline-flex">
          <Button variant="ghost" size="icon" className="hover-glow">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </Link>
      )}

      {/* Upload Product (Desktop) */}
      {isAuthenticated && (
        <Button
          variant="gradient"
          size="icon"
          className="hidden md:inline-flex shadow-colored hover:shadow-glow"
          onClick={() => navigate("/upload-product")}
        >
          <PlusCircle className="w-5 h-5" />
        </Button>
      )}

      {/* Theme + Notification (Always Visible) */}
      {isAuthenticated && (
        <div className="flex items-center space-x-0">
          <Button variant="ghost" size="icon" className="relative hover-glow">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
          </Button>
          <Button variant="ghost" size="icon" className="hover-glow" onClick={toggleTheme}>
            {actualTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      )}

      {/* Profile Dropdown (Desktop Only) */}
      {isAuthenticated ? (
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full border-2 border-pink-500">
                <div className="w-8 h-8 bg-gradient-to-br border-3 border-gray-400 from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 fashion-card border-0">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile"><User className="w-4 h-4 mr-2" /> Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/settings"><Settings className="w-4 h-4 mr-2" /> Settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/admin"><Shield className="w-4 h-4 mr-2" /> Admin Dashboard</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button variant="ghost" asChild><Link to="/signin">Sign In</Link></Button>
          <Button asChild className="fashion-button"><Link to="/signup">Sign Up</Link></Button>
        </>
      )}

      {isAuthenticated && (
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {isAuthenticated && mobileMenuOpen && (
    <div className="md:hidden bg-background px-4 py-4 border-t border-border/50 space-y-4">
      {/* Search (Mobile) */}
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search designs, designers..." className="pl-10 fashion-input" />
      </div> */}

      {/* Mobile Links */}
      <div className="flex flex-col space-y-3">
        <Link to={`/chat/${user?.id}`} className="flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Chat</Link>
        {/* <button onClick={() => { navigate("/upload-product"); setMobileMenuOpen(false); }} className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Upload Product
        </button> */}
        <Link to="/" className="flex items-center gap-2"><Home className="w-5 h-5" /> Home</Link>
        {/* <Link to="/profile" className="flex items-center gap-2"><User className="w-5 h-5" /> Profile</Link> */}
        <Link to="/settings" className="flex items-center gap-2"><Settings className="w-5 h-5" /> Settings</Link>
        <Link to="/admin" className="flex items-center gap-2"><Shield className="w-5 h-5" /> Admin Dashboard</Link>
        <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-destructive">
          <LogOut className="w-5 h-5" /> Log out
        </button>
      </div>
    </div>
  )}
</header>


  );
};






//  {isAuthenticated ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="rounded-full border-2 border-pink-500">
//               <div className="w-8 h-8 bg-gradient-to-br border-3 border-gray-400 from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-primary" />
//               </div>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-56 fashion-card border-0">
//             <div className="px-2 py-1.5">
//               <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
//               <p className="text-xs text-muted-foreground">{user?.email}</p>
//             </div>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild><Link to="/profile"><User className="w-4 h-4 mr-2" /> Profile</Link></DropdownMenuItem>
//             <DropdownMenuItem asChild><Link to="/settings"><Settings className="w-4 h-4 mr-2" /> Settings</Link></DropdownMenuItem>
//             <DropdownMenuItem asChild><Link to="/admin"><Shield className="w-4 h-4 mr-2" /> Admin Dashboard</Link></DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
//               <LogOut className="w-4 h-4 mr-2" /> Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <>
//           <Button variant="ghost" asChild><Link to="/signin">Sign In</Link></Button>
//           <Button asChild className="fashion-button"><Link to="/signup">Sign Up</Link></Button>
//         </>
//       )}