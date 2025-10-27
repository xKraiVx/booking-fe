import { createLazyFileRoute } from "@tanstack/react-router";
import UsersPage from "@/pages/users/UsersPage";
import { ProtectedRoute } from "@/common/ProtectedRoute";

export const Route = createLazyFileRoute("/users")({
  component: () => (
    <ProtectedRoute allowedRoles={["admin"]}>
      <UsersPage />
    </ProtectedRoute>
  ),
});
