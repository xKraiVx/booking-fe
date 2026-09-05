import type { Meta, StoryObj } from "@storybook/tanstack-react";

import type { GetProfileResponse } from "@/ui/repos/auth/auth.types";

import { UserMenu } from "./UserMenu";

const profile: GetProfileResponse = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "olena@example.com",
  firstName: "Olena",
  lastName: "Kovalenko",
  role: "client",
};

/**
 * `useGetProfile` reads the signed-in user from the root route context rather
 * than from React Query, so stories supply it through the router parameter.
 */
const withProfile = (value: GetProfileResponse | null) => ({
  tanstack: { router: { context: { profile: value } } },
});

const meta = {
  title: "Features/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
    ...withProfile(profile),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Client: Story = {};

export const Admin: Story = {
  parameters: withProfile({
    ...profile,
    firstName: "Andriy",
    lastName: "Melnyk",
    email: "admin@example.com",
    role: "admin",
  }),
};

export const Tenant: Story = {
  parameters: withProfile({
    ...profile,
    firstName: "Marta",
    lastName: "Shevchenko",
    email: "salon@example.com",
    role: "tenant",
  }),
};

export const WithAvatar: Story = {
  parameters: withProfile({
    ...profile,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  }),
};

/** Signed out, the menu renders nothing. */
export const SignedOut: Story = {
  parameters: withProfile(null),
};
