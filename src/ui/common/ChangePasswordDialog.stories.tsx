import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "./components/ui/button/button";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

const meta = {
  title: "Common/ChangePasswordDialog",
  component: ChangePasswordDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChangePasswordDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without a `trigger` prop it renders its own outline button. */
export const DefaultTrigger: Story = {};

/** `UserMenu` passes a dropdown item as the trigger instead. */
export const CustomTrigger: Story = {
  args: {
    trigger: <Button variant="ghost">Change my password</Button>,
  },
};

export const Opened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Change Password" })
    );

    const dialog = within(document.body);
    await expect(
      await dialog.findByLabelText("Current Password")
    ).toBeInTheDocument();
    await expect(dialog.getByLabelText("New Password")).toBeInTheDocument();
    await expect(
      dialog.getByLabelText("Confirm New Password")
    ).toBeInTheDocument();
  },
};

/** The client-side check that runs before the request is sent. */
export const MismatchedPasswords: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Change Password" })
    );

    const dialog = within(document.body);
    await userEvent.type(
      await dialog.findByLabelText("Current Password"),
      "OldPassw0rd!"
    );
    await userEvent.type(dialog.getByLabelText("New Password"), "NewPassw0rd!");
    await userEvent.type(
      dialog.getByLabelText("Confirm New Password"),
      "DifferentPassw0rd!"
    );
    await userEvent.click(
      dialog.getByRole("button", { name: "Change Password" })
    );

    await expect(
      await dialog.findByText("New passwords do not match")
    ).toBeInTheDocument();
  },
};
