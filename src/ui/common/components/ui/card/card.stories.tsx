import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Button } from "../button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Haircut &amp; styling</CardTitle>
        <CardDescription>45 minutes with Olena Kovalenko</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A wash, cut and finish tailored to your hair type.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-lg font-bold">250 PLN</span>
        <Button size="sm">Book</Button>
      </CardFooter>
    </Card>
  ),
};

/** Header and content only - the shape used by `ServiceSelectionStep`. */
export const HeaderAndContent: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg">Manicure</CardTitle>
        <CardDescription>Classic, with cuticle care</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">60 min</span>
          <span className="text-lg font-bold text-blue-600">180 PLN</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-96">
      <CardContent className="pt-6">
        <p className="text-sm">
          No appointments booked yet. Pick a service to get started.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Grid: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {["Haircut", "Manicure", "Massage"].map((name) => (
        <Card key={name}>
          <CardHeader>
            <CardTitle className="text-base">{name}</CardTitle>
            <CardDescription>Available today</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            From 150 PLN
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
