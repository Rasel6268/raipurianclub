"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/config/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Update your AuthProvider.js file

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Add these computed properties
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isMember = user?.role === "member";
  const isReviewPending = user?.status === "pending";

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const res = await api.get("/auth/me");
      console.log(res.data);

      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const userData = res?.data?.user || res?.data?.data?.user;

      setUser(userData);

      toast.success(`Welcome back, ${userData.name}!`);

      const adminRoles = ["admin", "super_admin"];

      if (adminRoles.includes(userData.role)) {
        router.push("/dashboard");
      } else if (userData.role === "member") {
        router.push("/profile");
      }

      return { success: true, user: userData };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/login");
      return { success: true };
    } catch (error) {
      toast.error("Failed to log out");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    return api.post("/auth/forgot-password", { email });
  };

  const resetPassword = async (token, password) => {
    return api.post("/auth/reset-password", {
      token,
      password,
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated, // Add this
    isAdmin, // Add this
    isMember, // Add this
    isReviewPending, // Add this
    login,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
