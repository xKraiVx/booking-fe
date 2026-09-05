import type { Meta, StoryObj } from "@storybook/tanstack-react";

import Loader from "./Loader";

const meta = {
  title: "Common/Loader",
  component: Loader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without `message` the loader falls back to "Loading...". */
export const Default: Story = {};

export const WithMessage: Story = {
  args: { message: "Loading your appointments…" },
};

export const LongMessage: Story = {
  args: {
    message: "Checking availability with every master for the selected day…",
  },
};
