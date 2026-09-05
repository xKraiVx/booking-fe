import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Checkbox } from "../checkbox/checkbox";
import { Input } from "../input/input";
import { Label } from "./label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "First name",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label {...args} htmlFor="first-name" />
      <Input id="first-name" placeholder="Olena" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">I accept the terms of service</Label>
    </div>
  ),
};

/**
 * `peer-disabled:opacity-70` dims the label when the control it labels is
 * disabled - the control must be a preceding sibling with `peer`.
 */
export const WithDisabledControl: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled className="peer" />
      <Label htmlFor="terms-disabled">Unavailable option</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="email-required">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="email-required" type="email" required />
    </div>
  ),
};
