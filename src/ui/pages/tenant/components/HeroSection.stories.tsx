import type { Meta, StoryObj } from "@storybook/tanstack-react";

import HeroSection from "./HeroSection";

const meta = {
  title: "Pages/Tenant/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    // "Book now" calls useNavigate({ to: "/tenant/$tenantId/book" }), so the
    // story is mounted on the matching route.
    tanstack: {
      router: {
        path: "/tenant/$tenantId",
        params: { tenantId: "sunrise-salon" },
      },
    },
  },
  tags: ["autodocs"],
  args: {
    title: "Sunrise Salon",
    description: "Hair, nails and skincare in the heart of Kraków.",
    tenantSlug: "sunrise-salon",
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `description` is optional - the subtitle block is dropped entirely. */
export const WithoutDescription: Story = {
  args: { description: undefined },
};

export const LongTitle: Story = {
  args: {
    title: "Sunrise Salon & Wellness Studio",
    description:
      "Twelve masters, seven days a week. Walk-ins welcome, but booking ahead guarantees your preferred time and stylist.",
  },
};

export const ShortTitle: Story = {
  args: { title: "Barb", description: "Cuts only. Cash only." },
};
