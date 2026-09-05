import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Decorator, Meta, StoryObj } from "@storybook/tanstack-react";
import { useState } from "react";
import { fn } from "storybook/test";

import type { GetMasterByIdResponse } from "@/ui/repos/business/business.types";
import { masterKeys } from "@/ui/use-cases/masters/useMasters";

import { MasterModal } from "./MasterModal";

const existingMaster: GetMasterByIdResponse = {
  id: "master-1",
  businessSettingsId: "business-1",
  name: "Olena Kovalenko",
  dateOfBirth: "1990-05-15",
  photo:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  description: "Colour specialist, 12 years behind the chair.",
};

/**
 * In edit mode the modal fills the form from `useGetMasterById`. Seeding the
 * cache keeps the story off the network.
 */
const withCachedMaster = (master: GetMasterByIdResponse): Decorator => {
  const CachedMaster: Decorator = (Story) => {
    const [queryClient] = useState(() => {
      const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      client.setQueryData(masterKeys.detail(master.id), master);
      return client;
    });

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  };

  return CachedMaster;
};

const meta = {
  title: "Features/MasterModal",
  component: MasterModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: fn(),
    editingId: null,
  },
} satisfies Meta<typeof MasterModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `editingId: null` - an empty "Add Master" form. */
export const Create: Story = {};

/** With an `editingId` the title changes and Delete appears. */
export const Edit: Story = {
  args: { editingId: existingMaster.id },
  decorators: [withCachedMaster(existingMaster)],
};

export const EditMinimalMaster: Story = {
  args: { editingId: "master-2" },
  decorators: [
    withCachedMaster({
      id: "master-2",
      businessSettingsId: "business-1",
      name: "Marta Shevchenko",
    }),
  ],
};

export const Closed: Story = {
  args: { open: false },
};
