import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
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
              <Route path="/upload-product" element={<ProductUpload />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product/:id/reviews" element={<ProductReviews />} />
              <Route
                path="/product/:id/write-review"
                element={
                  <ProtectedRoute>
                    <WriteReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat/:userId"
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users/:userId" element={<UserProfile />} />
              <Route path="/admin/users/:userId/edit" element={<EditUser />} />
              <Route
                path="/admin/products/:productId"
                element={
                  <ProtectedRoute>
                    <ProductUpload />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/products/:productId/edit"
                element={<EditProduct />}
              />
              <Route path="/admin/orders/:orderId" element={<OrderView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
