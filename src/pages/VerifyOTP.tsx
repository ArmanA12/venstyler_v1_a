import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";


const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const { verifyOTP, resendOtp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await verifyOTP(otpCode); // ← using the context function now
      toast({
        title: "Email verified!",
        description: "Your email has been successfully verified.",
      });
      navigate("/ResetPassword");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      await resendOtp();
      toast({
        title: "Code Resent!",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };



  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex items-center justify-center p-4">
      <div className="fashion-card w-full max-w-md p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <Link to="/signin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>

          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to <br />
            <span className="font-medium text-foreground">john@example.com</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-center">Enter verification code</label>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full fashion-button" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-sm text-primary hover:underline font-medium"
          >
            {isLoading ? "Resending..." : "Resend Code"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;