import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { fn } from "storybook/test";

import type { User } from "@/ui/repos/user/user.repo";

import { UpdateUserModal } from "./UpdateUserModal";

const user: User = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "olena@example.com",
  firstName: "Olena",
  lastName: "Kovalenko",
  role: "client",
};

const meta = {
  title: "Features/Users/UpdateUserModal",
  component: UpdateUserModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    user,
    isOpen: true,
    onOpenChange: fn(),
  },
} satisfies Meta<typeof UpdateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The form is seeded from the `user` prop. */
export const Open: Story = {};

export const EditingAnAdmin: Story = {
  args: {
    user: {
      ...user,
      firstName: "Andriy",
      lastName: "Melnyk",
      email: "admin@example.com",
      role: "admin",
    },
  },
};

/** OAuth sign-ups can arrive without a name. */
export const WithoutName: Story = {
  args: { user: { ...user, firstName: "", lastName: "" } },
};

export const Closed: Story = {
  args: { isOpen: false },
};
