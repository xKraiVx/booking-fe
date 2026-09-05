import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { expect, userEvent, within } from "storybook/test";

import { ResetPasswordForm } from "./ResetPasswordForm";

const meta = {
  title: "Common/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    layout: "fullscreen",
    // The form reads the reset token from the URL via useSearch. Parameters are
    // deep-merged, so the token is set per story rather than cleared here.
    tanstack: { router: { path: "/" } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Arrived from a valid reset link (`?token=...`). */
export const WithToken: Story = {
  parameters: {
    tanstack: {
      router: { path: "/", query: { token: "reset-token-from-email" } },
    },
  },
};

/** Without a token the form renders but refuses to submit. */
export const WithoutToken: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("New Password"), "NewPassw0rd!");
    await userEvent.type(
      canvas.getByLabelText("Confirm Password"),
      "NewPassw0rd!"
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Reset Password" })
    );

    await expect(
      await canvas.findByText("Invalid or missing reset token")
    ).toBeInTheDocument();
  },
};

/** The passwords must match - this check runs before the token check. */
export const MismatchedPasswords: Story = {
  parameters: {
    tanstack: {
      router: { path: "/", query: { token: "reset-token-from-email" } },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("New Password"), "NewPassw0rd!");
    await userEvent.type(
      canvas.getByLabelText("Confirm Password"),
      "OtherPassw0rd!"
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Reset Password" })
    );

    await expect(
      await canvas.findByText("Passwords do not match")
    ).toBeInTheDocument();
  },
};
