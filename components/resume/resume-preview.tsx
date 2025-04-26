import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ResumePDF } from "@/components/resume/resume-pdf";
import { CheckCircle, Eye, EyeOff, FileDown } from "lucide-react";
import { ProfileData } from "@/types";

interface ResumePreviewProps {
  profileData: ProfileData;
  showPreview: boolean;
  togglePreview: () => void;
}

function ResumePreviewComponent({
  profileData,
  showPreview,
  togglePreview,
}: ResumePreviewProps) {
  console.log("ResumePreview rendering");
  console.log("profileData reference:", profileData);
  console.log("showPreview:", showPreview);
  console.log("togglePreview:", togglePreview);

  return (
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
            <PDFDownloadLink
              document={<ResumePDF profileData={profileData} />}
              fileName="linkedin-resume.pdf"
              className="inline-flex w-full sm:w-auto"
            >
              {({ loading, error }) => {
                if (error) console.error("PDF generation error:", error);

                return (
                  <Button
                    variant="outline"
                    className="h-12 sm:h-10 text-base sm:text-sm cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white hover:text-white border-emerald-500 hover:border-emerald-600 w-full"
                    disabled={loading}
                  >
                    <FileDown className="h-4 w-4" />
                    {loading ? "Generating PDF..." : "Download Resume"}
                  </Button>
                );
              }}
            </PDFDownloadLink>
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
            <PDFViewer width="100%" height={800} className="border-0">
              <ResumePDF profileData={profileData} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export const ResumePreview = React.memo(ResumePreviewComponent);
