import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const maskEmail = (s: string) =>
  s.replace(/^(.{2}).+(@.+)$/, (_, a, b) => a + "****" + b);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const emailMasked = await forgotPassword(trimmed); // <-- get masked email
      toast({
        title: "OTP sent!",
        description: "Check your inbox for the 6-digit code.",
      });
      navigate("/verify-otp", {
        state: { email, emailMasked: emailMasked ?? maskEmail(email) },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ??
          "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex items-center justify-center p-4">
      <div className="fashion-card w-full max-w-md p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <Link
            to="/signin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>

          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we&apos;ll send you a 6-digit code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="fashion-input"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full fashion-button"
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
