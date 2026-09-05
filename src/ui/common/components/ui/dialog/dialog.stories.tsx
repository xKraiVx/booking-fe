import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { Button } from "../button/button";
import { Input } from "../input/input";
import { Label } from "../label/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Opened by default so the content is visible without interaction. */
export const Default: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel appointment</DialogTitle>
          <DialogDescription>
            The client will be notified by email. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Keep it</Button>
          <Button variant="destructive">Cancel appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithTrigger: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment details</DialogTitle>
          <DialogDescription>
            Tuesday, 14 April - 10:00 with Olena Kovalenko.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

/** The form layout shared by the create/update modals. */
export const WithForm: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a master</DialogTitle>
          <DialogDescription>
            They will appear on the public booking page.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="dialog-name">Name</Label>
            <Input id="dialog-name" placeholder="Olena Kovalenko" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dialog-photo">Photo URL</Label>
            <Input id="dialog-photo" placeholder="https://..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Last updated 1 January 2026</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index}>
              Section {index + 1}. Bookings may be rescheduled up to 24 hours
              before the appointment starts. Late cancellations may be charged.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
};
