import { createLazyFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "@/common/ResetPasswordForm";

export const Route = createLazyFileRoute("/auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ResetPasswordForm />
    </div>
  );
}
