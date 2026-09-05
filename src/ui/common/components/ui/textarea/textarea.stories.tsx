import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Label } from "../label/label";
import { Textarea } from "./textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Describe the service…",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue:
      "A wash, cut and finish tailored to your hair type. Includes a scalp massage.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Cannot be edited." },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="description">Description</Label>
      <Textarea {...args} id="description" />
    </div>
  ),
};

/** `min-h-[60px]` is the floor; grow it with `rows` or a utility class. */
export const Tall: Story = {
  args: { rows: 8 },
};
