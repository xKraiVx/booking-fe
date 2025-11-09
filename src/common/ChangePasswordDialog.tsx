import { useState } from "react";
import { Button } from "./components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog/dialog";
import { Input } from "./components/ui/input/input";
import { Label } from "./components/ui/label/label";
import { changePassword } from "../repos/auth/auth.repo";

interface ChangePasswordDialogProps {
  trigger?: React.ReactNode;
}

export function ChangePasswordDialog({ trigger }: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await changePassword({ currentPassword, newPassword });
      setSuccess(response.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close dialog after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "An error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Change Password</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters with uppercase, lowercase, and
              number/special character
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">Confirm New Password</Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={8}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
              {success}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
