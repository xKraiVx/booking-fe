import type { Meta, StoryObj } from "@storybook/tanstack-react";

import ServicesSlider from "./ServicesSlider";

const IMAGE =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop";

const meta = {
  title: "Pages/Tenant/ServicesSlider",
  component: ServicesSlider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    services: [
      {
        name: "Haircut & styling",
        price: 250,
        currency: "PLN",
        duration: 45,
        images: [IMAGE],
        description: "A wash, cut and finish tailored to your hair type.",
      },
      {
        name: "Balayage",
        price: 650,
        currency: "PLN",
        duration: 180,
        description: "Hand-painted highlights with a gloss finish.",
      },
      {
        name: "Manicure",
        price: 180,
        currency: "PLN",
        duration: 60,
        images: [IMAGE],
        description: "Classic manicure with cuticle care.",
      },
    ],
  },
} satisfies Meta<typeof ServicesSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Exactly three services - the arrows and dots stay hidden. */
export const Default: Story = {};

/** More than three services turns on the arrows and the dot indicator. */
export const Scrollable: Story = {
  args: {
    services: [
      ...meta.args.services,
      {
        name: "Pedicure",
        price: 220,
        currency: "PLN",
        duration: 75,
        description: "Includes a foot soak and callus treatment.",
      },
      {
        name: "Deep tissue massage",
        price: 300,
        currency: "EUR",
        duration: 90,
        images: [IMAGE],
      },
    ],
  },
};

export const SingleService: Story = {
  args: { services: [meta.args.services[0]!] },
};

/** Without images the card shows a gradient with the service initial. */
export const WithoutImages: Story = {
  args: {
    services: meta.args.services.map(({ images: _images, ...rest }) => rest),
  },
};

export const MixedCurrencies: Story = {
  args: {
    services: [
      { ...meta.args.services[0]!, currency: "PLN" },
      { ...meta.args.services[1]!, currency: "EUR" },
      { ...meta.args.services[2]!, currency: "GBP" },
    ],
  },
};

/** An empty list renders nothing at all. */
export const Empty: Story = {
  args: { services: [] },
};
