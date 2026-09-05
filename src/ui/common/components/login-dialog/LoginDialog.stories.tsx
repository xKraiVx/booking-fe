import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { expect, userEvent, within } from "storybook/test";

import { LoginDialog } from "./LoginDialog";

const meta = {
  title: "Common/LoginDialog",
  component: LoginDialog,
  parameters: {
    layout: "centered",
    // The dialog calls useRouter().invalidate() after a successful sign-in.
    tanstack: { router: { path: "/" } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The closed state - the dialog owns its `open` state behind this trigger. */
export const Trigger: Story = {};

/** Opened on the sign-in tab, with the Google and Facebook buttons. */
export const SignIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));

    // The content is portalled to the body, so query outside the canvas.
    const dialog = within(document.body);
    await expect(
      await dialog.findByText("Sign in to your account")
    ).toBeInTheDocument();
  },
};

/** Toggled to the register tab, which adds the first/last name fields. */
export const Register: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));

    const dialog = within(document.body);
    await userEvent.click(
      await dialog.findByRole("button", {
        name: "Don't have an account? Sign up",
      })
    );
    await expect(
      await dialog.findByText("Create an account")
    ).toBeInTheDocument();
    await expect(dialog.getByLabelText("First Name")).toBeInTheDocument();
  },
};
