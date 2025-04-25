import { useState } from "react";
import { ProfileData } from "@/types";

export function useResumeGenerator() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const generateResume = async (username: string) => {
    setGenerationError(null);
    setIsGenerating(true);
    setShowPreview(true);

    try {
      const loadResponse = await fetch("/api/load-profile-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!loadResponse.ok) {
        const errorData = await loadResponse.json();
        throw new Error(errorData.error || "Failed to load LinkedIn profile");
      }

      const profileData = await loadResponse.json();
      setProfileData(profileData.data);
    } catch (err) {
      console.error(err);
      setGenerationError(
        `An error occurred: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const resetGenerator = () => {
    setProfileData(null);
    setGenerationError(null);
  };

  return {
    profileData,
    isGenerating,
    showPreview,
    generationError,
    generateResume,
    togglePreview,
    resetGenerator,
    setGenerationError,
  };
}
