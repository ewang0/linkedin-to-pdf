import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileUrlInputProps {
  isAuthenticated: boolean;
  linkedinUrl: string;
  updateLinkedinUrl: (url: string) => void;
  isUrlValid: boolean;
  isGenerating: boolean;
  handleGenerate: () => void;
}

export function ProfileUrlInput({
  isAuthenticated,
  linkedinUrl,
  updateLinkedinUrl,
  isUrlValid,
  isGenerating,
  handleGenerate,
}: ProfileUrlInputProps) {
  return (
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
            isGenerating || !linkedinUrl || !isAuthenticated || !isUrlValid
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
  );
}
