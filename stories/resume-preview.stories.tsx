import type { Meta, StoryObj } from "@storybook/react";
import { ResumePreview } from "@/components/resume/resume-preview";
import { useState } from "react";
import { SAMPLE_PROFILE_DATA } from "@/lib/config";

// Wrapper component to handle state
const ResumePreviewWithState = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <ResumePreview
      profileData={SAMPLE_PROFILE_DATA}
      showPreview={showPreview}
      togglePreview={() => setShowPreview(!showPreview)}
    />
  );
};

const meta = {
  title: "Resume/ResumePreview",
  component: ResumePreviewWithState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResumePreviewWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Story with preview initially shown
const WithPreviewOpenComponent = () => {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <ResumePreview
      profileData={SAMPLE_PROFILE_DATA}
      showPreview={showPreview}
      togglePreview={() => setShowPreview(!showPreview)}
    />
  );
};

export const WithPreviewOpen: Story = {
  render: () => <WithPreviewOpenComponent />,
};
