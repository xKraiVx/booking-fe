import { createLazyFileRoute } from "@tanstack/react-router";
import UsersPage from "@/ui/pages/users/UsersPage";
import { ProtectedRoute } from "@/ui/common/ProtectedRoute";

export const Route = createLazyFileRoute("/users")({
  component: () => (
    <ProtectedRoute allowedRoles={["admin"]}>
      <UsersPage />
    </ProtectedRoute>
  ),
});
