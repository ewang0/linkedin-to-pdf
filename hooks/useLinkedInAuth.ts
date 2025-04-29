import { useState, useEffect } from "react";
import { useErrorContext } from "@/contexts/ErrorContext";

export function useLinkedInAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setError, clearError } = useErrorContext();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/check-auth-status", {
        method: "GET",
      });

      const data = await response.json();

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error checking authentication status:", err);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      clearError();

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError("LinkedIn login failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred during login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        clearError();
      } else {
        console.error("Failed to logout properly");
        setError("Logout failed on the server.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setIsAuthenticated(false);
      setError("An unexpected error occurred during logout.");
    }
  };

  return {
    isAuthenticated,
    isLoggingIn,
    handleLogin,
    handleLogout,
  };
}
