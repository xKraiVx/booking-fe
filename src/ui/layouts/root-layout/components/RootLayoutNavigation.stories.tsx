import type { Meta, StoryObj } from "@storybook/tanstack-react";

import type { GetProfileResponse } from "@/ui/repos/auth/auth.types";

import RootLayoutNavigation from "./RootLayoutNavigation";

const profile: GetProfileResponse = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "olena@example.com",
  firstName: "Olena",
  lastName: "Kovalenko",
  role: "client",
};

const meta = {
  title: "Layouts/RootLayoutNavigation",
  component: RootLayoutNavigation,
  parameters: {
    layout: "padded",
    // The nested UserMenu reads the profile from the root route context.
    tanstack: { router: { path: "/", context: { profile } } },
  },
  tags: ["autodocs"],
  args: {
    profile,
  },
  decorators: [
    (Story) => (
      <div className="border-b p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RootLayoutNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A client sees only Home. */
export const Client: Story = {};

/** Admins additionally get Users and Actions. */
export const Admin: Story = {
  args: { profile: { ...profile, role: "admin" } },
  parameters: {
    tanstack: {
      router: { path: "/", context: { profile: { ...profile, role: "admin" } } },
    },
  },
};

/** Tenants get the Business Settings link instead. */
export const Tenant: Story = {
  args: { profile: { ...profile, role: "tenant" } },
  parameters: {
    tanstack: {
      router: {
        path: "/",
        context: { profile: { ...profile, role: "tenant" } },
      },
    },
  },
};

/** Signed out, the user menu is replaced by the login dialog trigger. */
export const SignedOut: Story = {
  args: { profile: null },
  parameters: {
    tanstack: { router: { path: "/", context: { profile: null } } },
  },
};

/** The Users route is active, so its link renders in the `default` variant. */
export const OnUsersRoute: Story = {
  args: { profile: { ...profile, role: "admin" } },
  parameters: {
    tanstack: {
      router: {
        path: "/users",
        context: { profile: { ...profile, role: "admin" } },
      },
    },
  },
};
