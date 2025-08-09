import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { CloudCog } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
  resendOtp: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/userAuthChecker",
          {
            withCredentials: true,
          }
        );

        const userFromToken = res.data?.data?.userFromToken;
        if (userFromToken) {
          setUser(userFromToken);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res, "while signin");
      const user = res.data?.data?.user;
      setUser(user);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password, name },
        { withCredentials: true }
      );

      const registeredUser = response.data?.user;

      if (registeredUser) {
        const user: User = {
          id: registeredUser._id || registeredUser.id,
          email: registeredUser.email,
          name: registeredUser.name,
        };
        setUser(user);
        localStorage.setItem("fashionconnect_user", JSON.stringify(user));
      }
    } catch (error) {
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("fashionconnect_user");
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgotPassowrd",
        { email },
        { withCredentials: true }
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/verifyOtp",
        { otp },
        { withCredentials: true }
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/resetPassword",
        { password },
        { withCredentials: true }
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/resendOtp",
        {},
        { withCredentials: true }
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    verifyOTP,
    resetPassword,
    resendOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
