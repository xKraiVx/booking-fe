import { Button } from "@/common/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import type { User } from "@/lib/api";
import type { UserRole } from "@/repos/user";
import { useUpdateUserForm } from "../hooks";

interface UpdateUserModalProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateUserModal = ({
  user,
  isOpen,
  onOpenChange,
}: UpdateUserModalProps) => {
  const { form, isPending } = useUpdateUserForm({
    user,
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form.Field name="email">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {field.state.meta.errors && (
                    <span className="text-sm text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="firstName">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="edit-firstName">First Name *</Label>
                  <Input
                    id="edit-firstName"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {field.state.meta.errors && (
                    <span className="text-sm text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="lastName">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="edit-lastName">Last Name *</Label>
                  <Input
                    id="edit-lastName"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {field.state.meta.errors && (
                    <span className="text-sm text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role *</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as UserRole)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <span className="text-sm text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
