import type { Meta, StoryObj } from "@storybook/tanstack-react";

import MastersList from "./MastersList";

const PHOTO =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop";

const meta = {
  title: "Pages/Tenant/MastersList",
  component: MastersList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    masters: [
      {
        name: "Olena Kovalenko",
        photo: PHOTO,
        description: "Colour specialist, 12 years behind the chair.",
      },
      {
        name: "Marta Shevchenko",
        description: "Cuts and styling for curly hair.",
      },
      {
        name: "Iryna Bondar",
        photo: PHOTO,
        description: "Nail art and gel extensions.",
      },
    ],
  },
} satisfies Meta<typeof MastersList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleMaster: Story = {
  args: {
    masters: [{ name: "Olena Kovalenko", photo: PHOTO }],
  },
};

/** Without a photo the card falls back to a gradient with a user glyph. */
export const WithoutPhotos: Story = {
  args: {
    masters: [
      { name: "Olena Kovalenko", description: "Colour specialist." },
      { name: "Marta Shevchenko", description: "Curly hair." },
    ],
  },
};

/** `line-clamp-4` truncates long biographies. */
export const LongDescription: Story = {
  args: {
    masters: [
      {
        name: "Olena Kovalenko",
        photo: PHOTO,
        description:
          "Olena trained in Warsaw and London before opening her chair here in 2014. She specialises in balayage and colour correction, and teaches two workshops a year. Outside the salon she runs half marathons and keeps three cats, all of them named after hair products.",
      },
    ],
  },
};

/** An empty list renders nothing at all. */
export const Empty: Story = {
  args: { masters: [] },
};
