import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex items-center justify-center p-4">
      <div className="fashion-card w-full max-w-md p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <Link to="/signin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
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
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="fashion-input"
            />
          </div>

          <Button className="w-full fashion-button">
            Send Reset Link
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;