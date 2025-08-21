import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationsProvider } from "./contexts/NotificationContext";

import { NotificationsSocketBridge } from "./bridge/NotificationBridge";
import { checkUserAuth } from "./lib/getCurrentUserDetails";
// pages
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
import ChatBox from "./pages/ChatBox";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PublicProfilePage from "./pages/PublicProfilePage";
import UserDashboard from "./pages/UserDashboard";
import Complaints from "./pages/Complaints";
import OrderDetails from "./pages/OrderDetails";

export default function App() {
  const [userId, setUserId] = useState<number | null>(null);

  
  useEffect(() => {
    (async () => {
      const result = await checkUserAuth();
      if (result.success && result.user?.id) {
        setUserId(result.user.id);
      } else {
        setUserId(null);
        if (!result.success) {
          console.error("Failed to fetch user:", result.error);
        }
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            {/* socket + toast + notification write lives **inside** providers */}
            <NotificationsSocketBridge userId={userId} />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route
                  path="/verify-otp"
                  element={
                    // <ProtectedRoute>
                    <VerifyOTP />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/:id"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/ResetPassword"
                  element={
                    // <ProtectedRoute>
                    <ResetPassword />
                    // </ProtectedRoute>
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
                  path="/order-confirmation"
                  element={
                    <ProtectedRoute>
                      <OrderConfirmation />
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
                {/* <Route path="/admin" element={<AdminDashboard />} /> */}
       
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/userDashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />


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
                
                <Route path="/publicProfile/:userId" element={<PublicProfilePage />} />

                <Route 
                  path="/complaints" 
                  element={
                    <ProtectedRoute>
                      <Complaints />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/order-details/:type/:orderId" 
                  element={
                    <ProtectedRoute>
                      <OrderDetails />
                    </ProtectedRoute>
                  } 
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
