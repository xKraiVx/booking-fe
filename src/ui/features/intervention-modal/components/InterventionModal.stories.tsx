import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Decorator, Meta, StoryObj } from "@storybook/tanstack-react";
import { useState } from "react";
import { fn } from "storybook/test";

import type { GetInterventionByIdResponse } from "@/ui/repos/business/business.types";
import { interventionKeys } from "@/ui/use-cases/interventions/useInterventions";

import { InterventionModal } from "./InterventionModal";

const masters = [
  { id: "master-1", name: "Olena Kovalenko" },
  { id: "master-2", name: "Marta Shevchenko" },
  { id: "master-3", name: "Iryna Bondar" },
];

const existingIntervention: GetInterventionByIdResponse = {
  id: "intervention-1",
  businessSettingsId: "business-1",
  name: "Balayage",
  price: 650,
  currency: "PLN",
  duration: 180,
  description: "Hand-painted highlights with a gloss finish.",
  images: ["https://example.com/balayage-1.jpg"],
};

/** Edit mode reads the service through `useGetInterventionById`. */
const withCachedIntervention = (
  intervention: GetInterventionByIdResponse
): Decorator => {
  const CachedIntervention: Decorator = (Story) => {
    const [queryClient] = useState(() => {
      const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      client.setQueryData(
        interventionKeys.detail(intervention.id),
        intervention
      );
      return client;
    });

    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  };

  return CachedIntervention;
};

const meta = {
  title: "Features/InterventionModal",
  component: InterventionModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: fn(),
    editingId: null,
    masters,
  },
} satisfies Meta<typeof InterventionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An empty "Add Service" form with the master checkboxes. */
export const Create: Story = {};

export const Edit: Story = {
  args: { editingId: existingIntervention.id },
  decorators: [withCachedIntervention(existingIntervention)],
};

/**
 * The master association is not returned by the API, so the checkboxes stay
 * unticked even in edit mode - see the note in the component.
 */
export const EditWithoutOptionalFields: Story = {
  args: { editingId: "intervention-2" },
  decorators: [
    withCachedIntervention({
      id: "intervention-2",
      businessSettingsId: "business-1",
      name: "Fringe trim",
      price: 40,
      currency: "PLN",
      duration: 15,
    }),
  ],
};

/** With no masters configured yet, the checkbox list is empty. */
export const WithoutMasters: Story = {
  args: { masters: [] },
};

export const Closed: Story = {
  args: { open: false },
};
