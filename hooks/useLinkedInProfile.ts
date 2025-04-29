import { useState } from "react";
import { useErrorContext } from "@/contexts/ErrorContext";

export function useLinkedInProfile() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const { setError, clearError } = useErrorContext();

  // Derived state for URL validity
  const isUrlValid = linkedinUrl.includes("linkedin.com/in/");

  const updateLinkedinUrl = (url: string) => {
    setLinkedinUrl(url);
    if (url.includes("linkedin.com/in/") || url === "") {
      clearError();
    }
  };

  const extractUsername = (): string | null => {
    const usernameMatch = linkedinUrl.match(/linkedin\.com\/in\/([^\/?#]+)/);
    if (!usernameMatch || !usernameMatch[1]) {
      if (linkedinUrl && !linkedinUrl.includes("linkedin.com/in/")) {
        setError(
          "Invalid LinkedIn URL format. It should look like linkedin.com/in/yourprofile"
        );
      } else {
        clearError();
      }
      return null;
    }
    clearError();
    return usernameMatch[1];
  };

  const resetUrl = () => {
    setLinkedinUrl("");
    clearError();
  };

  return {
    linkedinUrl,
    updateLinkedinUrl,
    isUrlValid,
    extractUsername,
    resetUrl,
  };
}
