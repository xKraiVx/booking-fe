import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Avatar } from "./avatar";

const PHOTO =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    src: { control: "text" },
  },
  args: {
    alt: "Olena Kovalenko",
    fallbackText: "O",
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: { src: PHOTO },
};

/** Without `src` the initial is rendered on a neutral circle. */
export const Fallback: Story = {
  args: { src: null },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="sm" src={PHOTO} />
      <Avatar {...args} size="md" src={PHOTO} />
      <Avatar {...args} size="lg" src={PHOTO} />
    </div>
  ),
};
