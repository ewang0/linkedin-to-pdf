import type { Meta, StoryObj } from "@storybook/react";
import { LinkedInLoginSection } from "../components/resume/linkedin-login-section";

const meta: Meta<typeof LinkedInLoginSection> = {
  title: "Resume/LinkedIn Login Section",
  component: LinkedInLoginSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isAuthenticated: {
      control: "boolean",
      description: "Whether the user is authenticated with LinkedIn",
    },
    isLoggingIn: {
      control: "boolean",
      description: "Whether the login process is in progress",
    },
    handleLogin: {
      action: "login clicked",
      description: "Function called when the login button is clicked",
    },
    handleLogoutWithCleanup: {
      action: "logout clicked",
      description: "Function called when the logout button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkedInLoginSection>;

export const LoggedOut: Story = {
  args: {
    isAuthenticated: false,
    isLoggingIn: false,
  },
};

export const LoggingIn: Story = {
  args: {
    isAuthenticated: false,
    isLoggingIn: true,
  },
};

export const LoggedIn: Story = {
  render: (args) => (
    <div className="w-[864px]">
      <LinkedInLoginSection {...args} />
    </div>
  ),
  args: {
    isAuthenticated: true,
    isLoggingIn: false,
  },
};

export const InResumeContext: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Import from LinkedIn</h2>
      <p className="text-gray-600 mb-6">
        Connect your LinkedIn account to automatically import your professional
        experience, education, and skills to your resume.
      </p>

      <div className="mb-6">
        <LinkedInLoginSection {...args} />
      </div>

      {args.isAuthenticated && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">
            LinkedIn Data Ready to Import
          </h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Professional Experience (3 positions)</li>
            <li>Education (2 institutions)</li>
            <li>Skills (12 skills)</li>
          </ul>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
            Import Data
          </button>
        </div>
      )}
    </div>
  ),
  args: {
    isAuthenticated: true,
    isLoggingIn: false,
  },
};
