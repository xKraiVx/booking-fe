import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { fn } from "storybook/test";

import ServiceSelectionStep from "./ServiceSelectionStep";

const meta = {
  title: "Pages/Tenant/Booking/ServiceSelectionStep",
  component: ServiceSelectionStep,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onServiceSelect: fn(),
    services: [
      {
        id: "svc-1",
        name: "Haircut & styling",
        description: "A wash, cut and finish tailored to your hair type.",
        duration: 45,
        price: 60,
      },
      {
        id: "svc-2",
        name: "Balayage",
        description: "Hand-painted highlights with a gloss finish.",
        duration: 180,
        price: 160,
      },
    ],
  },
} satisfies Meta<typeof ServiceSelectionStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleService: Story = {
  args: { services: [meta.args.services[0]!] },
};

/** `price` and `description` are optional; the price block is dropped. */
export const WithoutPriceOrDescription: Story = {
  args: {
    services: [
      { id: "svc-1", name: "Consultation", duration: 15 },
      { id: "svc-2", name: "Fringe trim", duration: 10 },
    ],
  },
};

export const ManyServices: Story = {
  args: {
    services: Array.from({ length: 8 }).map((_, index) => ({
      id: `svc-${index}`,
      name: `Service ${index + 1}`,
      description: "Available with any master.",
      duration: 30 + index * 15,
      price: 40 + index * 20,
    })),
  },
};

/** The empty state shown when a tenant has published no services. */
export const Empty: Story = {
  args: { services: [] },
};
