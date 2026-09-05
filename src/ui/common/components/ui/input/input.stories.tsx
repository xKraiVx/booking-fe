import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Label } from "../label/label";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "date", "time", "file"],
    },
  },
  args: {
    placeholder: "you@example.com",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "olena@example.com" },
};

export const Email: Story = {
  args: { type: "email" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "••••••••" },
};

export const Date: Story = {
  args: { type: "date", defaultValue: "2026-04-14" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "olena@example.com" },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" type="email" />
    </div>
  ),
};

/** How the auth dialogs surface a server error next to the field. */
export const WithError: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="email-error">Email</Label>
      <Input
        {...args}
        id="email-error"
        type="email"
        aria-invalid
        className="border-destructive focus-visible:ring-destructive"
        defaultValue="not-an-email"
      />
      <p className="text-sm text-destructive">Enter a valid email address.</p>
    </div>
  ),
};
