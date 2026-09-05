import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { useState } from "react";

import { Label } from "../label/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The role picker from the user modals. */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="tenant">Tenant</SelectItem>
        <SelectItem value="client">Client</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="tenant">
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="tenant">Tenant</SelectItem>
        <SelectItem value="client">Client</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="client">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="client">Client</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a master" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hair</SelectLabel>
          <SelectItem value="olena">Olena Kovalenko</SelectItem>
          <SelectItem value="marta">Marta Shevchenko</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Nails</SelectLabel>
          <SelectItem value="iryna">Iryna Bondar</SelectItem>
          <SelectItem value="sofia" disabled>
            Sofia Lysenko (on leave)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const ManyOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a time" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 }).map((_, hour) => (
          <SelectItem key={hour} value={`${hour}`}>
            {`${hour}`.padStart(2, "0")}:00
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [currency, setCurrency] = useState("PLN");

    return (
      <div className="grid gap-2">
        <Label htmlFor="currency">Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger id="currency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["PLN", "USD", "EUR", "GBP"].map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">Selected: {currency}</p>
      </div>
    );
  },
};
