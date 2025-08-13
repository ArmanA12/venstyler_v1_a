import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatBox from "./pages/ChatBox";
import { checkUserAuth } from './lib/getCurrentUserDetails'
import {
  NotificationsProvider,
  useNotifications,
} from "./contexts/NotificationContext";

const queryClient = new QueryClient();

const App = () => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const { user } = useAuth(); // user from AuthContext

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await checkUserAuth();
      if (result.success && result.user?.id) {
        setUserId(result.user.id);
      } else {
        console.error("Failed to fetch user:", result.error);
      }
    };
    fetchUser();
  }, []);

  // Socket handlers (stable with useCallback)
  const handleConnect = useCallback(() => {
    console.log("Connected to socket:", socket.id);
  }, []);

  const handleNewChat = useCallback(
    ({ chatId }: { chatId: number }) => {
      socket.emit("joinChat", { chatId });
      console.log(`Joined new chat room: chat_${chatId}`);
      toast({ title: "New Chat", description: "A new chat has been started." });
    },
    [toast]
  );

  const handleNewNotification = useCallback(
    (data: any) => {
      addNotification({
        id: data.id,
        type: data.type,
        message: data.message,
        designId: data.designId,
        senderId: data.senderId,
        recipientId: data.recipientId,
        createdAt: data.createdAt,
      });
      toast({ title: data.type, description: data.message });
    },
    [addNotification, toast]
  );

  const handleNewMessage = useCallback(
    (message: any) => {
      toast({
        title: "New Message",
        description: `${message?.sender?.name ?? "Someone"}: ${message?.content ?? ""}`,
      });
    },
    [toast]
  );

  // Setup socket listeners when userId changes
  useEffect(() => {
    if (!userId) return;

    // Join personal room
    socket.emit("join-room", userId);
    console.log(`Joined user room: user_${userId}`);

    // Setup listeners
    socket.on("connect", handleConnect);
    socket.on("newChat", handleNewChat);
    socket.on("new-notification", handleNewNotification);
    socket.on("newMessage", handleNewMessage);

    // Setup other socket listeners for online/offline if needed
    socket.on("userOnline", (id) => {
      console.log("User online:", id);
    });
    socket.on("userOffline", (id) => {
      console.log("User offline:", id);
    });

    // Cleanup on unmount or userId change
    return () => {
      socket.off("connect", handleConnect);
      socket.off("newChat", handleNewChat);
      socket.off("new-notification", handleNewNotification);
      socket.off("newMessage", handleNewMessage);
      // Do not disconnect here if other parts of the app also use the socket
    };
  }, [userId, handleConnect, handleNewChat, handleNewNotification, handleNewMessage]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
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
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
