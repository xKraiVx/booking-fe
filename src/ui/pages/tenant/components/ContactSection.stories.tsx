import type { Meta, StoryObj } from "@storybook/tanstack-react";

import ContactSection from "./ContactSection";

const meta = {
  title: "Pages/Tenant/ContactSection",
  component: ContactSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    socialLinks: {
      facebook: "https://facebook.com/sunrise-salon",
      instagram: "https://instagram.com/sunrise-salon",
      website: "https://sunrise-salon.example.com",
    },
  },
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllNetworks: Story = {
  args: {
    socialLinks: {
      facebook: "https://facebook.com/sunrise-salon",
      instagram: "https://instagram.com/sunrise-salon",
      twitter: "https://twitter.com/sunrise-salon",
      linkedin: "https://linkedin.com/company/sunrise-salon",
      website: "https://sunrise-salon.example.com",
    },
  },
};

export const SingleNetwork: Story = {
  args: {
    socialLinks: { instagram: "https://instagram.com/sunrise-salon" },
  },
};

/** With no links at all the component renders nothing. */
export const Empty: Story = {
  args: { socialLinks: {} },
};
