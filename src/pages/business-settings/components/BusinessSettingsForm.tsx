import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/common/components/ui/button/button";
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import { Textarea } from "@/common/components/ui/textarea/textarea";
import { Checkbox } from "@/common/components/ui/checkbox/checkbox";
import {
  useCreateBusinessSettings,
  useUpdateBusinessSettings,
} from "@/use-cases/business-settings/useBusinessSettings";
import type { CreateBusinessSettingsBody } from "@/repos/business.repo";

interface WorkingHours {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed?: boolean;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

interface BusinessSettingsFormProps {
  businessSettings?: {
    id: string;
    title: string;
    description?: string;
    address?: string;
    workingHours: WorkingHours[];
    googleCalendarId?: string;
    socialLinks?: SocialLinks;
  };
}

const DEFAULT_WORKING_HOURS: WorkingHours[] = [
  { day: "Monday", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { day: "Tuesday", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { day: "Wednesday", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { day: "Thursday", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { day: "Friday", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { day: "Saturday", openTime: "10:00", closeTime: "16:00", isClosed: false },
  { day: "Sunday", openTime: "00:00", closeTime: "00:00", isClosed: true },
];

export const BusinessSettingsForm = ({
  businessSettings,
}: BusinessSettingsFormProps) => {
  const createMutation = useCreateBusinessSettings();
  const updateMutation = useUpdateBusinessSettings();

  // Manage working hours state
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>(
    businessSettings?.workingHours || DEFAULT_WORKING_HOURS,
  );

  const updateWorkingHour = (
    index: number,
    field: keyof WorkingHours,
    value: string | boolean,
  ) => {
    const updated = [...workingHours];
    updated[index] = { ...updated[index], [field]: value };
    setWorkingHours(updated);
  };

  const form = useForm({
    defaultValues: {
      title: businessSettings?.title || "",
      description: businessSettings?.description || "",
      address: businessSettings?.address || "",
      googleCalendarId: businessSettings?.googleCalendarId || "",
      facebook: businessSettings?.socialLinks?.facebook || "",
      instagram: businessSettings?.socialLinks?.instagram || "",
      twitter: businessSettings?.socialLinks?.twitter || "",
      linkedin: businessSettings?.socialLinks?.linkedin || "",
      website: businessSettings?.socialLinks?.website || "",
    },
    onSubmit: async ({ value }) => {
      const socialLinks: SocialLinks = {
        facebook: value.facebook || undefined,
        instagram: value.instagram || undefined,
        twitter: value.twitter || undefined,
        linkedin: value.linkedin || undefined,
        website: value.website || undefined,
      };

      const data: CreateBusinessSettingsBody = {
        title: value.title,
        description: value.description || undefined,
        address: value.address || undefined,
        workingHours: workingHours,
        googleCalendarId: value.googleCalendarId || undefined,
        socialLinks: Object.values(socialLinks).some((v) => v)
          ? socialLinks
          : undefined,
      };

      if (businessSettings?.id) {
        await updateMutation.mutateAsync({ id: businessSettings.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="title">Business Title *</Label>
              <Input
                id="title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter business title"
                required
              />
            </div>
          )}
        </form.Field>

        <form.Field name="googleCalendarId">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="googleCalendarId">Google Calendar ID</Label>
              <Input
                id="googleCalendarId"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="calendar@example.com"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="address">
          {(field) => (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Street, City, ZIP"
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe your business..."
              rows={4}
            />
          </div>
        )}
      </form.Field>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Working Hours</h3>
        <div className="space-y-3">
          {workingHours.map((hours, index) => (
            <div
              key={hours.day}
              className="grid grid-cols-[120px_1fr_1fr_auto] md:grid-cols-[140px_1fr_1fr_auto] gap-3 items-center"
            >
              <Label className="font-medium">{hours.day}</Label>
              <Input
                type="time"
                value={hours.openTime}
                onChange={(e) =>
                  updateWorkingHour(index, "openTime", e.target.value)
                }
                disabled={hours.isClosed}
                className="text-sm"
              />
              <Input
                type="time"
                value={hours.closeTime}
                onChange={(e) =>
                  updateWorkingHour(index, "closeTime", e.target.value)
                }
                disabled={hours.isClosed}
                className="text-sm"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`closed-${index}`}
                  checked={hours.isClosed}
                  onCheckedChange={(checked) =>
                    updateWorkingHour(index, "isClosed", checked === true)
                  }
                />
                <label
                  htmlFor={`closed-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Closed
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="facebook">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="instagram">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="twitter">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://twitter.com/yourbusiness"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="linkedin">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://linkedin.com/company/yourbusiness"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="website">
            {(field) => (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://www.yourbusiness.com"
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : businessSettings?.id
              ? "Update Settings"
              : "Create Settings"}
        </Button>
      </div>
    </form>
  );
};
