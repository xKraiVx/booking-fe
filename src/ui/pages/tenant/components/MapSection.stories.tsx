import type { Meta, StoryObj } from "@storybook/tanstack-react";

import MapSection from "./MapSection";

const meta = {
  title: "Pages/Tenant/MapSection",
  component: MapSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    address: "ul. Floriańska 12, 31-019 Kraków, Poland",
  },
} satisfies Meta<typeof MapSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongAddress: Story = {
  args: {
    address:
      "Sunrise Salon & Wellness Studio, Building C, 3rd floor, ul. Jana Pawła II 43A, 31-864 Kraków, Małopolskie, Poland",
  },
};

/** The address is URL-encoded into the Google Maps link. */
export const AddressWithSpecialCharacters: Story = {
  args: { address: "Rynek Główny 1/2, Kraków (obok Sukiennic)" },
};
