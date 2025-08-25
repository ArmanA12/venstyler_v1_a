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
  verifyOTP: (otp: string, email?: string) => Promise<string | undefined>;
  resetPassword: (password: string, resetToken?: string) => Promise<void>;
  resendOtp: (email?: string) => Promise<string | undefined>;
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
          "https://venstyler.armanshekh.com/api/auth/userAuthChecker",
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
        "https://venstyler.armanshekh.com/api/auth/login",
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
        "https://venstyler.armanshekh.com/api/auth/register",
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

  const signOut = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "https://venstyler.armanshekh.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("fashionconnect_user");
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://venstyler.armanshekh.com/api/auth/forgotPassowrd",
        { email },
        { withCredentials: true }
      );
      // server sends { data: { emailMasked } }
      return data?.data?.emailMasked as string | undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string, email?: string) => {
    const { data } = await axios.post(
      "https://venstyler.armanshekh.com/api/auth/verifyOtp",
      email ? { otp, email } : { otp },
      { withCredentials: true }
    );

    // backend may return: { data: "<jwt>" } OR { data: { resetToken: "<jwt>" } }
    const body = data?.data;
    const token = typeof body === "string" ? body : body?.resetToken;
    return token;
  };

  const resetPassword = async (password: string, resetToken?: string) => {
    await axios.post(
      "https://venstyler.armanshekh.com/api/auth/resetPassword",
      { password, resetToken }, // ⬅️ include body token as fallback
      { withCredentials: true }
    );
  };

  const resendOtp = async (email?: string) => {
    const { data } = await axios.post(
      "https://venstyler.armanshekh.com/api/auth/resendOtp",
      email ? { email } : {},
      { withCredentials: true }
    );
    return data?.data?.emailMasked as string | undefined;
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
