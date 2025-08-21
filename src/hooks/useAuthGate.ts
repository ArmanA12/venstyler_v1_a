// hooks/useAuthGate.ts
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// swap this for your toast lib if different
import { toast } from "sonner";

export function useAuthGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function gate(actionLabel: string, doAction: () => void) {
    if (isLoading) return; 
    if (!isAuthenticated) {
      toast("Please sign in", {
        description: `You need to be logged in to ${actionLabel}.`,
      });
      navigate("/signin", { state: { from: location.pathname } });
      return;
    }
    doAction();
  }

  return { gate };
}
