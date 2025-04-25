import { useState } from "react";

export function useLinkedInProfile() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

  // Derived state for URL validity
  const isUrlValid = linkedinUrl.includes("linkedin.com/in/");

  const updateLinkedinUrl = (url: string) => {
    setLinkedinUrl(url);

    // Clear error when user types if it was a URL validation error
    if (
      urlError ===
      "Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/yourprofile)"
    ) {
      setUrlError(null);
    }
  };

  const extractUsername = (): string | null => {
    const usernameMatch = linkedinUrl.match(/linkedin\.com\/in\/([^\/]+)/);
    if (!usernameMatch || !usernameMatch[1]) {
      setUrlError("Could not extract username from LinkedIn URL");
      return null;
    }
    return usernameMatch[1];
  };

  const resetUrl = () => {
    setLinkedinUrl("");
    setUrlError(null);
  };

  return {
    linkedinUrl,
    updateLinkedinUrl,
    isUrlValid,
    urlError,
    setUrlError,
    extractUsername,
    resetUrl,
  };
}
