import { useEffect } from "react";
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
  useCreateMaster,
  useUpdateMaster,
  useDeleteMaster,
  useGetMasterById,
} from "@/use-cases/masters/useMasters";
import type { CreateMasterBody } from "@/repos/business/business.repo";

interface MasterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: string | null;
}

export const MasterModal = ({
  open,
  onOpenChange,
  editingId,
}: MasterModalProps) => {
  const { data: editingMaster } = useGetMasterById(editingId || "");
  const createMutation = useCreateMaster();
  const updateMutation = useUpdateMaster();
  const deleteMutation = useDeleteMaster();

  const form = useForm({
    defaultValues: {
      name: "",
      dateOfBirth: "",
      photo: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const data: CreateMasterBody = {
        name: value.name,
        dateOfBirth: value.dateOfBirth || undefined,
        photo: value.photo || undefined,
        description: value.description || undefined,
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data });
      } else {
        await createMutation.mutateAsync(data);
      }

      onOpenChange(false);
      form.reset();
    },
  });

  useEffect(() => {
    if (editingMaster && open) {
      form.setFieldValue("name", editingMaster.name);
      form.setFieldValue("dateOfBirth", editingMaster.dateOfBirth || "");
      form.setFieldValue("photo", editingMaster.photo || "");
      form.setFieldValue("description", editingMaster.description || "");
    } else if (!open) {
      form.reset();
    }
  }, [editingMaster, open, form]);

  const handleDelete = async () => {
    if (editingId && confirm("Are you sure you want to delete this master?")) {
      await deleteMutation.mutateAsync(editingId);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingId ? "Edit Master" : "Add Master"}</DialogTitle>
          <DialogDescription>
            {editingId
              ? "Update master information"
              : "Add a new team member to your business"}
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
                <Label htmlFor="master-name">Name *</Label>
                <Input
                  id="master-name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Master name"
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="dateOfBirth">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="master-dob">Date of Birth</Label>
                <Input
                  id="master-dob"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="photo">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="master-photo">Photo URL</Label>
                <Input
                  id="master-photo"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="master-description">Description</Label>
                <Textarea
                  id="master-description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Bio, specializations, experience..."
                  rows={3}
                />
              </div>
            )}
          </form.Field>

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
