"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  FileDown,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/resume-pdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLinkedInAuth } from "@/hooks/useLinkedInAuth";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";
import { useResumeGenerator } from "@/hooks/useResumeGenerator";

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
    togglePreview,
    resetGenerator,
  } = useResumeGenerator();

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
          {!isAuthenticated ? (
            <div className="flex flex-col gap-4 items-start">
              <Button
                onClick={handleLogin}
                className="bg-[#0A66C2] hover:bg-[#004182] text-white font-bold h-10 px-8 cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                    Log in with LinkedIn
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">LinkedIn User</span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    LinkedIn Connected
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogoutWithCleanup}
                className="h-8 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="linkedin-url"
              className={`text-sm font-medium ${
                !isAuthenticated ? "text-muted-foreground" : ""
              }`}
            >
              LinkedIn Profile URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {!isAuthenticated ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-1">
                        <Input
                          id="linkedin-url"
                          placeholder="https://www.linkedin.com/in/yourprofile"
                          value={linkedinUrl}
                          onChange={(e) => updateLinkedinUrl(e.target.value)}
                          disabled={true}
                          className="flex-1 min-h-10 text-base w-full"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Log in with LinkedIn to generate a resume</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Input
                  id="linkedin-url"
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  value={linkedinUrl}
                  onChange={(e) => updateLinkedinUrl(e.target.value)}
                  disabled={isGenerating}
                  className="flex-1 min-h-10 text-base"
                />
              )}
              <Button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  !linkedinUrl ||
                  !isAuthenticated ||
                  !isUrlValid
                }
                className="h-12 sm:h-10 text-base sm:text-sm font-medium"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Generate Resume"
                )}
              </Button>
            </div>
            {/* Optionally show a hint if the URL is invalid and the input is focused/dirty */}
            {isAuthenticated && linkedinUrl && !isUrlValid && (
              <p className="text-xs text-destructive mt-1">
                Please enter a valid LinkedIn profile URL (must include
                &quot;linkedin.com/in/&quot;).
              </p>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="p-3 sm:p-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium">Error</AlertTitle>
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {profileData && !isGenerating && (
            <div className="space-y-4">
              <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900 p-3 mb-6 sm:p-4">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <AlertTitle className="text-sm font-bold">
                  Resume Generated Successfully!
                </AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                  <p className="text-sm">
                    Your resume has been created based on your LinkedIn profile.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-1">
                    {profileData ? (
                      <PDFDownloadLink
                        document={<ResumePDF profileData={profileData} />}
                        fileName="linkedin-resume.pdf"
                        className="inline-flex"
                      >
                        {({ loading, error }) => {
                          if (error)
                            console.error("PDF generation error:", error);

                          return (
                            <Button
                              variant="outline"
                              className="h-12 sm:h-10 text-base sm:text-sm cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white hover:text-white border-emerald-500 hover:border-emerald-600"
                              disabled={loading}
                            >
                              <FileDown className="h-4 w-4" />
                              {loading
                                ? "Generating PDF..."
                                : "Download Resume"}
                            </Button>
                          );
                        }}
                      </PDFDownloadLink>
                    ) : null}
                    <Button
                      variant="outline"
                      className="h-12 sm:h-10 text-base sm:text-sm cursor-pointer"
                      onClick={togglePreview}
                    >
                      {showPreview ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide Preview
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show Preview
                        </>
                      )}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>

              {showPreview && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-3 border-b flex justify-between items-center">
                    <h3 className="font-medium">Resume Preview</h3>
                  </div>
                  <div className="bg-white">
                    {profileData && (
                      <PDFViewer width="100%" height={800} className="border-0">
                        <ResumePDF profileData={profileData} />
                      </PDFViewer>
                    )}
                  </div>
                </div>
              )}
            </div>
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
