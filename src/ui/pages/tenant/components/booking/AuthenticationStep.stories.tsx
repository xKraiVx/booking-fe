import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { fn } from "storybook/test";

import AuthenticationStep from "./AuthenticationStep";

const meta = {
  title: "Pages/Tenant/Booking/AuthenticationStep",
  component: AuthenticationStep,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    businessSettingsId: "business-1",
    onAuthComplete: fn(),
    bookingData: {
      serviceId: "svc-1",
      serviceName: "Haircut & styling",
      masterId: "master-1",
      masterName: "Olena Kovalenko",
      startTime: "2026-04-14T10:00:00.000Z",
      endTime: "2026-04-14T10:45:00.000Z",
      reservationId: "reservation-1",
    },
  },
} satisfies Meta<typeof AuthenticationStep>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The last step of the booking flow for a signed-out visitor. Once the auth
 * store holds a user, the component posts the booking instead of rendering
 * the form.
 */
export const SignedOut: Story = {};

/** The same step reached without a slot picked yet. */
export const WithoutSelectedSlot: Story = {
  args: { bookingData: {} },
};
