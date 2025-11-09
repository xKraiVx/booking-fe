import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog/dialog";
import { Button } from "@/common/components/ui/button/button";
import { Input } from "@/common/components/ui/input/input";
import { Label } from "@/common/components/ui/label/label";
import { Textarea } from "@/common/components/ui/textarea/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select/select";
import { Checkbox } from "@/common/components/ui/checkbox/checkbox";
import {
  useCreateIntervention,
  useUpdateIntervention,
  useDeleteIntervention,
  useGetInterventionById,
} from "@/use-cases/interventions/useInterventions";
import type { CreateInterventionBody } from "@/repos/business/business.repo";

interface InterventionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: string | null;
  masters: Array<{ id: string; name: string }>;
}

export const InterventionModal = ({
  open,
  onOpenChange,
  editingId,
  masters,
}: InterventionModalProps) => {
  const { data: editingIntervention } = useGetInterventionById(editingId || "");
  const createMutation = useCreateIntervention();
  const updateMutation = useUpdateIntervention();
  const deleteMutation = useDeleteIntervention();

  const [selectedMasterIds, setSelectedMasterIds] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      currency: "PLN" as "PLN" | "USD" | "EUR" | "GBP",
      duration: 60,
      description: "",
      images: "",
    },
    onSubmit: async ({ value }) => {
      const imagesArray = value.images
        ? value.images
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
        : undefined;

      const data: CreateInterventionBody = {
        name: value.name,
        price: Number(value.price),
        currency: value.currency,
        duration: Number(value.duration),
        description: value.description || undefined,
        images: imagesArray,
        masterIds: selectedMasterIds.length > 0 ? selectedMasterIds : undefined,
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data });
      } else {
        await createMutation.mutateAsync(data);
      }

      onOpenChange(false);
      form.reset();
      setSelectedMasterIds([]);
    },
  });

  useEffect(() => {
    if (editingIntervention && open) {
      form.setFieldValue("name", editingIntervention.name);
      form.setFieldValue("price", editingIntervention.price);
      form.setFieldValue("currency", editingIntervention.currency || "PLN");
      form.setFieldValue("duration", editingIntervention.duration);
      form.setFieldValue("description", editingIntervention.description || "");
      form.setFieldValue(
        "images",
        editingIntervention.images?.join(", ") || "",
      );
      // Note: masters association is not returned in the DTO, so we can't pre-populate it
    } else if (!open) {
      form.reset();
      setSelectedMasterIds([]);
    }
  }, [editingIntervention, open, form]);

  const handleDelete = async () => {
    if (editingId && confirm("Are you sure you want to delete this service?")) {
      await deleteMutation.mutateAsync(editingId);
      onOpenChange(false);
    }
  };

  const toggleMaster = (masterId: string) => {
    setSelectedMasterIds((prev) =>
      prev.includes(masterId)
        ? prev.filter((id) => id !== masterId)
        : [...prev, masterId],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Service" : "Add Service"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "Update service information"
              : "Add a new service to your business"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="intervention-name">Service Name *</Label>
                <Input
                  id="intervention-name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g., Classic Manicure"
                  required
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="intervention-price">Price *</Label>
                  <Input
                    id="intervention-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="currency">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="intervention-currency">Currency *</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as "PLN" | "USD" | "EUR" | "GBP")
                    }
                  >
                    <SelectTrigger id="intervention-currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLN">PLN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="duration">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="intervention-duration">
                  Duration (minutes) *
                </Label>
                <Input
                  id="intervention-duration"
                  type="number"
                  min="5"
                  step="5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="intervention-description">Description</Label>
                <Textarea
                  id="intervention-description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Service description..."
                  rows={3}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="images">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="intervention-images">
                  Image URLs (comma-separated)
                </Label>
                <Textarea
                  id="intervention-images"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={2}
                />
              </div>
            )}
          </form.Field>

          {masters && masters.length > 0 && (
            <div className="space-y-2">
              <Label>Masters who can perform this service</Label>
              <div className="space-y-2 border rounded-md p-3 max-h-32 overflow-y-auto">
                {masters.map((master) => (
                  <div key={master.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`master-${master.id}`}
                      checked={selectedMasterIds.includes(master.id)}
                      onCheckedChange={() => toggleMaster(master.id)}
                    />
                    <label
                      htmlFor={`master-${master.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {master.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            {editingId && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            )}
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingId
                  ? "Update"
                  : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
