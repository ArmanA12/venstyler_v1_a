import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface CheckoutButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    image?: string;
    designer?: {
      name: string | null;
    };
  };
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  product,
  className,
  variant = "default",
  size = "default",
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to purchase this design.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    const checkoutProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image || "/api/placeholder/200/200",
      quantity: 1,
      designer: product.designer?.name || "Unknown Designer",
    };

    navigate("/checkout", {
      state: {
        products: [checkoutProduct],
      },
    });
  };

  return (
    <Button
      onClick={handleCheckout}
      className={className}
      variant={variant}
      size={size}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Buy Now
    </Button>
  );
};

export default CheckoutButton;