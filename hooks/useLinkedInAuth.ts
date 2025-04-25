import { useState, useEffect } from "react";

export function useLinkedInAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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
      setAuthError(null);

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
        setAuthError(
          "LinkedIn login failed: " + (data.error || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Login error:", err);
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
        setAuthError(null);
      } else {
        console.error("Failed to logout properly");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setIsAuthenticated(false);
      setAuthError(null);
    }
  };

  return {
    isAuthenticated,
    isLoggingIn,
    authError,
    handleLogin,
    handleLogout,
  };
}
