import type { Meta, StoryObj } from "@storybook/react";
import { ErrorAlert } from "@/components/resume/error-alert";

const meta: Meta<typeof ErrorAlert> = {
  title: "Resume/ErrorAlert",
  component: ErrorAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorAlert>;

export const Default: Story = {
  args: {
    error: "Something went wrong. Please try again later.",
  },
};

export const LongError: Story = {
  args: {
    error:
      "This is a longer error message that explains in detail what went wrong with the application. It might span multiple lines when displayed in the UI.",
  },
};

export const ShortError: Story = {
  args: {
    error: "Network error.",
  },
};
