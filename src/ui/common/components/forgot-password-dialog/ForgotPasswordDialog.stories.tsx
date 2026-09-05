import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { expect, userEvent, within } from "storybook/test";

import { ForgotPasswordDialog } from "@/ui/common/components/forgot-password-dialog/ForgotPasswordDialog";

const meta = {
  title: "Common/ForgotPasswordDialog",
  component: ForgotPasswordDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForgotPasswordDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The inline link rendered under the password field in `LoginDialog`. */
export const Trigger: Story = {};

export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = within(document.body);
    await expect(
      await dialog.findByText("Reset your password")
    ).toBeInTheDocument();
  },
};
