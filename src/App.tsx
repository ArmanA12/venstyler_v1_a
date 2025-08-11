import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import { useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatBox from "./pages/ChatBox";
import {
  NotificationsProvider,
  useNotifications,
} from "./contexts/NotificationContext";

import { useEffect, useId, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatBox from "./pages/ChatBox";
import { checkUserAuth } from './lib/getCurrentUserDetails';



const queryClient = new QueryClient();

const App = () => {
  //akbar
  const { toast } = useToast();

  const { addNotification } = useNotifications();
  const { user } = useAuth(); // ← real logged-in user

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

  const [userId, setUserId] = useState<number | null>(null);

  console.log("Rendering App");

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

  useEffect(() => {
    socket.off("new-notification").on("new-notification", (data) => {
      console.log("New notification:", data);
      toast({
        title: data.type,
        description: data.message,

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

  useEffect(() => {
    if (!user?.id) return;

    // Join this user's personal room so backend emits reach them:
    socket.emit("join-room", user.id);
    console.log(`Joined user room: user_${user.id}`);

    socket.on("connect", handleConnect);
    socket.on("newChat", handleNewChat);
    socket.on("new-notification", handleNewNotification);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("newChat", handleNewChat);
      socket.off("new-notification", handleNewNotification);
      socket.off("newMessage", handleNewMessage);
      // Do not disconnect here if other parts of the app also use the socket

    return () => {
      socket.off("new-notification");

    };
  }, [
    user?.id,
    handleConnect,
    handleNewChat,
    handleNewNotification,
    handleNewMessage,
  ]);

  //akbar end

  //arman
  // const { toast } = useToast();
  // const { addNotification } = useNotifications();
  // const userId = 8;

  // // stable handlers (optional but nice)
  // const handleConnect = useCallback(() => {
  //   console.log("Connected to socket:", socket.id);
  // }, []);

  // const handleNewChat = useCallback(
  //   ({ chatId }: { chatId: number }) => {
  //     socket.emit("joinChat", { chatId });
  //     console.log(`Joined new chat room: chat_${chatId}`);
  //     toast({ title: "New Chat", description: "A new chat has been started." });
  //   },
  //   [toast]
  // );

  // const handleNewNotification = useCallback(
  //   (data: any) => {
  //     console.log("New notification:", data);
  //     addNotification({
  //       id: data.id,
  //       type: data.type,
  //       message: data.message,
  //       designId: data.designId,
  //       senderId: data.senderId,
  //       recipientId: data.recipientId,
  //       createdAt: data.createdAt,
  //     });
  //     toast({ title: data.type, description: data.message });
  //   },
  //   [addNotification, toast]
  // );

  // const handleNewMessage = useCallback(
  //   (message: any) => {
  //     console.log("New message received:", message);
  //     toast({
  //       title: "New Message",
  //       description: `${message.sender?.name}: ${message.content}`,
  //     });
  //   },
  //   [toast]
  // );

  // useEffect(() => {
  //   if (userId) {
  //     socket.emit("join-room", userId);
  //     console.log(`Joined user room: user_${userId}`);
  //   }

  //   // attach
  //   socket.on("connect", handleConnect);
  //   socket.on("newChat", handleNewChat);
  //   socket.on("new-notification", handleNewNotification);
  //   socket.on("newMessage", handleNewMessage);

  //   // cleanup MUST return a function (no JSX!)
  //   return () => {
  //     socket.off("connect", handleConnect);
  //     socket.off("newChat", handleNewChat);
  //     socket.off("new-notification", handleNewNotification);
  //     socket.off("newMessage", handleNewMessage);
  //     // optional: do NOT disconnect if other parts of app use the socket
  //     // socket.disconnect();
  //   };
  // }, [
  //   userId,
  //   handleConnect,
  //   handleNewChat,
  //   handleNewNotification,
  //   handleNewMessage,
  // ]);

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
                <Route
                  path="/product/:id/reviews"
                  element={<ProductReviews />}
                />
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
