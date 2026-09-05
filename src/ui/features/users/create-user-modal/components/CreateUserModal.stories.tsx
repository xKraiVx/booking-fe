import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { fn } from "storybook/test";

import { CreateUserModal } from "./CreateUserModal";

const meta = {
  title: "Features/Users/CreateUserModal",
  component: CreateUserModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    onOpenChange: fn(),
  },
} satisfies Meta<typeof CreateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The empty form, with the role defaulting to `client`. */
export const Open: Story = {};

export const Closed: Story = {
  args: { isOpen: false },
};
