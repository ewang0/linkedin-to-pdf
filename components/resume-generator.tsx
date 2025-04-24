"use client";

import { useState, useEffect } from "react";
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
import { ResumePreview } from "@/components/resume-preview";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/resume-pdf";

export default function LinkedInResumeGenerator() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

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
      setError(null);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setLinkedinUrl("https://www.linkedin.com/in/ericwang20");
      } else {
        setError("LinkedIn login failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call API to delete the auth cookies file
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Update UI state after successful logout
        setIsAuthenticated(false);
        setLinkedinUrl("");
      } else {
        console.error("Failed to logout properly");
      }
    } catch (err) {
      console.error("Logout error:", err);
      // Still update UI state even if there's an error
      setIsAuthenticated(false);
      setLinkedinUrl("");
    }
  };

  const handleGenerate = async () => {
    // Validate URL
    if (!linkedinUrl.includes("linkedin.com/")) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }

    // Extract username from LinkedIn URL
    const usernameMatch = linkedinUrl.match(/linkedin\.com\/in\/([^\/]+)/);
    if (!usernameMatch || !usernameMatch[1]) {
      setError("Could not extract username from LinkedIn URL");
      return;
    }
    const username = usernameMatch[1];

    setError(null);
    setIsGenerating(true);
    setResumeUrl(null);
    setShowPreview(true);

    // Call the API to load LinkedIn profile
    try {
      // Start the profile loading process
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

      // Get the profile data from the response
      const profileData = await loadResponse.json();
      console.log("Load response:", profileData);

      // Save the profile data in state
      setProfileData(profileData);

      // Remove the simulation steps and directly set the resume URL
      setResumeUrl("/sample-resume.pdf");
      setIsGenerating(false);
    } catch (err) {
      console.error(err);
      setError(
        `An error occurred: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setIsGenerating(false);
    }
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
      <CardContent className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* LinkedIn Login Section */}
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
                  <span className="font-medium">
                    {linkedinUrl
                      ? linkedinUrl.match(/linkedin\.com\/in\/([^\/]+)/)?.[1] ||
                        "User"
                      : "User"}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    LinkedIn Connected
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8"
              >
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                Sign Out
              </Button>
            </div>
          )}

          {/* Horizontal Divider */}
          <Separator className="my-2" />

          {/* LinkedIn URL Input */}
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
              <Input
                id="linkedin-url"
                placeholder="https://www.linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                disabled={isGenerating || !isAuthenticated}
                className="flex-1 min-h-10 text-base"
              />
              <Button
                onClick={async () => {
                  setIsGenerating(true);
                  // Add 1-second delay to simulate loading
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  handleGenerate();
                }}
                disabled={isGenerating || !linkedinUrl || !isAuthenticated}
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
          </div>

          {error && (
            <Alert variant="destructive" className="p-3 sm:p-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm font-medium">Error</AlertTitle>
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {resumeUrl && !isGenerating && (
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900 p-3 sm:p-4">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-sm font-medium">
                  Resume Generated Successfully!
                </AlertTitle>
                <AlertDescription className="flex flex-col gap-3 mt-1.5">
                  <p className="text-sm">
                    Your resume has been created based on your LinkedIn profile.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {profileData ? (
                      <PDFDownloadLink
                        document={<ResumePDF data={profileData} />}
                        fileName="linkedin-resume.pdf"
                        className="inline-flex"
                      >
                        {({ loading, error }) => {
                          if (error)
                            console.error("PDF generation error:", error);

                          return (
                            <Button
                              variant="outline"
                              className="h-12 sm:h-10 text-base sm:text-sm"
                              disabled={loading}
                            >
                              <FileDown className="h-4 w-4 mr-2" />
                              {loading
                                ? "Generating PDF..."
                                : "Download Resume"}
                            </Button>
                          );
                        }}
                      </PDFDownloadLink>
                    ) : (
                      <Button
                        variant="outline"
                        className="h-12 sm:h-10 text-base sm:text-sm"
                        onClick={() => window.open(resumeUrl, "_blank")}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Resume
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      className="h-12 sm:h-10 text-base sm:text-sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hide Preview
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
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
                    {profileData ? (
                      <PDFViewer width="100%" height={800} className="border-0">
                        <ResumePDF data={profileData} />
                      </PDFViewer>
                    ) : (
                      <ResumePreview />
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
          Note: This tool extracts public information from your LinkedIn profile
          to create a resume.
        </p>
      </CardFooter>
    </Card>
  );
}
