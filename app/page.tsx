import ResumeGenerator from "@/components/resume-generator";
import { ErrorProvider } from "@/contexts/ErrorContext";

export default function LinkedInResumeGenerator() {
  return (
    <ErrorProvider>
      <div className="container max-w-4xl py-6 sm:py-10 px-4 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
          LinkedIn to Resume Generator
        </h1>
        <ResumeGenerator />
      </div>
    </ErrorProvider>
  );
}
