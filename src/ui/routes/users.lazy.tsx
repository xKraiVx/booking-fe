import { createLazyFileRoute } from "@tanstack/react-router";
import UsersPage from "@/ui/pages/users/UsersPage";
import { ProtectedRoute } from "@/ui/common/components/protected-route/ProtectedRoute";

export const Route = createLazyFileRoute("/users")({
  component: () => (
    <ProtectedRoute allowedRoles={["admin"]}>
      <UsersPage />
    </ProtectedRoute>
  ),
});
