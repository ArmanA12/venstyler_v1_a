import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import Profile from "./pages/Profile";
import ProductUpload from "./pages/ProductUpload";
import ProductDetails from "./pages/ProductDetails";
import ProductReviews from "./pages/ProductReviews";
import WriteReview from "./pages/WriteReview";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/admin/UserProfile";
import EditUser from "./pages/admin/EditUser";
import ProductView from "./pages/admin/ProductView";
import EditProduct from "./pages/admin/EditProduct";
import OrderView from "./pages/admin/OrderView";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import ExplorePage from "./pages/explore/Explore";
import socket from "@/lib/socket";
import { useEffect, useId, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatBox from "./pages/ChatBox";
import { checkUserAuth } from './lib/getCurrentUserDetails';


const queryClient = new QueryClient();

const App = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<number | null>(null);

  console.log("Rendering App");

  // ✅ Fetch user ID once
  useEffect(() => {
    const fetchUser = async () => {
      const result = await checkUserAuth();
      console.log(result, "result");

      if (result.success && result.user?.id) {
        setUserId(result.user.id);
      } else {
        console.error("Failed to fetch user:", result.error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Join personal room ONCE per session
useEffect(() => {
  if (!userId) return;

  socket.emit("join-room", userId);

  socket.off("newChat").on("newChat", ({ chatId }) => {
    socket.emit("joinChat", { chatId });
    toast({ title: "New Chat", description: "A new chat has been started." });
  });

  socket.off("new-notification").on("new-notification", (data) => {
    toast({ title: data.type, description: data.message });
  });

  socket.off("userOnline").on("userOnline", (id) => {
    console.log("User online:", id);
  });

  socket.off("userOffline").on("userOffline", (id) => {
    console.log("User offline:", id);
  });

  return () => {
    socket.off("newChat");
    socket.off("new-notification");
    socket.off("userOnline");
    socket.off("userOffline");
  };
}, [userId]);

  // ✅ Global notifications only (no newMessage here)
  useEffect(() => {
    socket.off("new-notification").on("new-notification", (data) => {
      console.log("New notification:", data);
      toast({
        title: data.type,
        description: data.message,
      });
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/verify-otp"
                  element={
                    <ProtectedRoute>
                      <VerifyOTP />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ResetPassword"
                  element={
                    <ProtectedRoute>
                      <ResetPassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload-product"
                  element={
                    <ProtectedRoute>
                      <ProductUpload />
                    </ProtectedRoute>
                  }
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/product/:id/reviews" element={<ProductReviews />} />
                <Route path="/chat" element={<ChatBox />} />
                <Route
                  path="/product/:id/write-review"
                  element={
                    <ProtectedRoute>
                      <WriteReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/:chatId/:receiverId"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/users/:userId"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users/:userId/edit"
                  element={
                    <ProtectedRoute>
                      <EditUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/:productId"
                  element={
                    <ProtectedRoute>
                      <ProductView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/:productId/edit"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin/orders/:orderId" element={<OrderView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;