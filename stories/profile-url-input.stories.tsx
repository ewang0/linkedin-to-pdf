import type { Meta, StoryObj } from "@storybook/react";
import { ProfileUrlInput } from "../components/resume/profile-url-input";

const meta: Meta<typeof ProfileUrlInput> = {
  title: "Resume/Profile URL Input",
  component: ProfileUrlInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isAuthenticated: {
      control: "boolean",
      description: "Whether the user is authenticated with LinkedIn",
    },
    isGenerating: {
      control: "boolean",
      description: "Whether the resume generation is in progress",
    },
    isUrlValid: {
      control: "boolean",
      description: "Whether the entered LinkedIn URL is valid",
    },
    handleGenerate: {
      action: "generate clicked",
      description: "Function called when the generate button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileUrlInput>;

// Basic states
export const NotAuthenticated: Story = {
  args: {
    isAuthenticated: false,
    linkedinUrl: "",
    isUrlValid: false,
    isGenerating: false,
    updateLinkedinUrl: () => {},
  },
};

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    linkedinUrl: "",
    isUrlValid: false,
    isGenerating: false,
    updateLinkedinUrl: () => {},
  },
};

export const WithValidUrl: Story = {
  args: {
    isAuthenticated: true,
    linkedinUrl: "https://www.linkedin.com/in/johndoe",
    isUrlValid: true,
    isGenerating: false,
    updateLinkedinUrl: () => {},
  },
};

export const WithInvalidUrl: Story = {
  args: {
    isAuthenticated: true,
    linkedinUrl: "https://www.example.com/johndoe",
    isUrlValid: false,
    isGenerating: false,
    updateLinkedinUrl: () => {},
  },
};

export const Generating: Story = {
  args: {
    isAuthenticated: true,
    linkedinUrl: "https://www.linkedin.com/in/johndoe",
    isUrlValid: true,
    isGenerating: true,
    updateLinkedinUrl: () => {},
  },
};
