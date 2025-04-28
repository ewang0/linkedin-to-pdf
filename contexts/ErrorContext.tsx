"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create context with a default value (can be undefined or a specific shape)
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Provider component
export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  // Ensure setError also clears previous errors if needed, or handle accumulation
  const setAndClearError = (newError: string | null) => {
    setError(newError); // Replace current error
  };

  return (
    <ErrorContext.Provider
      value={{ error, setError: setAndClearError, clearError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to use the error context
export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
