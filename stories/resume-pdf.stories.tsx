import type { Meta, StoryObj } from "@storybook/react";
import ResumePDFViewer from "@/components/resume/resume-pdf";
import { ProfileData } from "@/types";
import { SAMPLE_PROFILE_DATA, SAMPLE_PROFILE_DATA_MINIMAL } from "@/lib/config";

const meta: Meta<typeof ResumePDFViewer> = {
  title: "Resume/ResumePDF",
  component: ResumePDFViewer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ResumePDFViewer>;

export const Default: Story = {
  args: {
    profileData: SAMPLE_PROFILE_DATA,
  },
};

export const MinimalData: Story = {
  args: {
    profileData: SAMPLE_PROFILE_DATA_MINIMAL,
  },
};

export const NoData: Story = {
  args: {
    profileData: {} as ProfileData,
  },
};
