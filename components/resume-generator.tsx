"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLinkedInAuth } from "@/hooks/useLinkedInAuth";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";
import { useResumeGenerator } from "@/hooks/useResumeGenerator";
import { LinkedInLoginSection } from "./resume/linkedin-login-section";
import { ProfileUrlInput } from "./resume/profile-url-input";
import { ErrorAlert } from "./resume/error-alert";
import { ResumePreview } from "./resume/resume-preview";
import { useCallback, useMemo } from "react";

export default function LinkedInResumeGenerator() {
  const { isAuthenticated, isLoggingIn, authError, handleLogin, handleLogout } =
    useLinkedInAuth();

  const {
    linkedinUrl,
    updateLinkedinUrl,
    isUrlValid,
    urlError,
    extractUsername,
    resetUrl,
  } = useLinkedInProfile();

  const {
    profileData,
    isGenerating,
    showPreview,
    generationError,
    generateResume,
    togglePreview: originalTogglePreview,
    resetGenerator,
  } = useResumeGenerator();

  // Memoize the togglePreview function
  const memoizedTogglePreview = useCallback(() => {
    originalTogglePreview();
  }, [originalTogglePreview]);

  // Combine errors for display
  const error = authError || urlError || generationError;

  const handleGenerate = async () => {
    const username = extractUsername();
    if (username) {
      await generateResume(username);
    }
  };

  // Handle logout with cleanup
  const handleLogoutWithCleanup = async () => {
    await handleLogout();
    resetUrl();
    resetGenerator();
  };

  // Memoize all props for ResumePreview
  const resumePreviewProps = useMemo(
    () => ({
      profileData,
      showPreview,
      togglePreview: memoizedTogglePreview,
    }),
    [profileData, showPreview, memoizedTogglePreview]
  );

  return (
    <Card className="shadow-md">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">
          Generate Your Resume
        </CardTitle>
        <CardDescription className="text-sm sm:text-base mt-1">
          Log in with LinkedIn to quickly generate a professional resume based
          on your profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pt-3 sm:pt-4">
        <div className="flex flex-col gap-4 sm:gap-6">
          <LinkedInLoginSection
            isAuthenticated={isAuthenticated}
            isLoggingIn={isLoggingIn}
            handleLogin={handleLogin}
            handleLogoutWithCleanup={handleLogoutWithCleanup}
          />

          <Separator className="my-2" />

          <ProfileUrlInput
            isAuthenticated={isAuthenticated}
            linkedinUrl={linkedinUrl}
            updateLinkedinUrl={updateLinkedinUrl}
            isUrlValid={isUrlValid}
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
          />

          {error && <ErrorAlert error={error} />}

          {profileData && !isGenerating && (
            <ResumePreview {...resumePreviewProps} />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start text-xs sm:text-sm text-muted-foreground px-4 sm:px-6 border-t">
        <p>
          Note: This tool extracts information from your LinkedIn profile to
          create a PDF resume.
        </p>
      </CardFooter>
    </Card>
  );
}
