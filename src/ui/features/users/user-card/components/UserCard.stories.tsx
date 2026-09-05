import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { fn } from "storybook/test";

import type { User } from "@/ui/repos/user/user.repo";

import { UserCard } from "./UserCard";

const baseUser: User = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "olena@example.com",
  firstName: "Olena",
  lastName: "Kovalenko",
  role: "client",
};

const meta = {
  title: "Features/Users/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    user: baseUser,
    onEdit: fn(),
    onDelete: fn(),
    onUpdateRole: fn(),
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Client: Story = {};

export const Admin: Story = {
  args: {
    user: {
      ...baseUser,
      id: "223e4567-e89b-12d3-a456-426614174001",
      email: "admin@example.com",
      firstName: "Andriy",
      lastName: "Melnyk",
      role: "admin",
    },
  },
};

export const Tenant: Story = {
  args: {
    user: {
      ...baseUser,
      id: "323e4567-e89b-12d3-a456-426614174002",
      email: "salon@example.com",
      firstName: "Marta",
      lastName: "Shevchenko",
      role: "tenant",
    },
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      ...baseUser,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
  },
};

/**
 * `firstName` can come back empty from OAuth sign-ups, in which case the
 * avatar falls back to the first letter of the email.
 */
export const WithoutName: Story = {
  args: {
    user: { ...baseUser, firstName: "", lastName: "" },
  },
};

export const List: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {(["admin", "tenant", "client"] as const).map((role) => (
        <UserCard
          {...args}
          key={role}
          user={{ ...baseUser, id: `${role}-0000-0000-0000-000000000000`, role }}
        />
      ))}
    </div>
  ),
};
