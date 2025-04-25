import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  error: string;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="p-3 sm:p-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-sm font-medium">Error</AlertTitle>
      <AlertDescription className="text-sm">{error}</AlertDescription>
    </Alert>
  );
}
