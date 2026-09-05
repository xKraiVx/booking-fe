import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { useState } from "react";

import { Label } from "../label/label";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

/** Pair with a `Label` and share an id so the text toggles the box. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="recurring" />
      <Label htmlFor="recurring">Repeat this appointment weekly</Label>
    </div>
  ),
};

/** The controlled pattern used by `InterventionModal` for working days. */
export const Controlled: Story = {
  render: () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const [selected, setSelected] = useState<string[]>(["Mon", "Wed"]);

    return (
      <div className="flex flex-col gap-3">
        {days.map((day) => (
          <div key={day} className="flex items-center gap-2">
            <Checkbox
              id={day}
              checked={selected.includes(day)}
              onCheckedChange={(checked) =>
                setSelected((prev) =>
                  checked ? [...prev, day] : prev.filter((d) => d !== day)
                )
              }
            />
            <Label htmlFor={day}>{day}</Label>
          </div>
        ))}
        <p className="text-sm text-muted-foreground">
          Working days: {selected.join(", ") || "none"}
        </p>
      </div>
    );
  },
};
