// /components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PremiumLoader from "@/components/PremiumLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PremiumLoader />;

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
