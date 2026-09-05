import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Business settings</h4>
        <p className="text-sm text-muted-foreground">
          Working hours, services and masters.
        </p>
      </div>
      <Separator {...args} orientation="horizontal" className="my-4" />
      <p className="text-sm text-muted-foreground">Changes save immediately.</p>
    </div>
  ),
};

/** Needs a height - the nav bar uses `className="h-6"`. */
export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-6 items-center gap-4 text-sm">
      <span>Home</span>
      <Separator {...args} orientation="vertical" />
      <span>Users</span>
      <Separator {...args} orientation="vertical" />
      <span>Actions</span>
    </div>
  ),
};

/**
 * `decorative` defaults to `true`, which hides the separator from assistive
 * technology. Set it to `false` when it genuinely divides content.
 */
export const Semantic: Story = {
  args: { decorative: false },
  render: (args) => (
    <div className="w-80">
      <p className="text-sm">Section one</p>
      <Separator {...args} className="my-4" />
      <p className="text-sm">Section two</p>
    </div>
  ),
};
