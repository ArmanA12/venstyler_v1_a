// /components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
