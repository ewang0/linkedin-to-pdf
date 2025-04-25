import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut } from "lucide-react";

interface LinkedInLoginSectionProps {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  handleLogin: () => void;
  handleLogoutWithCleanup: () => void;
}

export function LinkedInLoginSection({
  isAuthenticated,
  isLoggingIn,
  handleLogin,
  handleLogoutWithCleanup,
}: LinkedInLoginSectionProps) {
  if (!isAuthenticated) {
    return (
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
    );
  }

  return (
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
  );
}
