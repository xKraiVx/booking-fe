import { ProtectedRoute } from "@/ui/common/components/protected-route/ProtectedRoute";

import ActionsPage from "@/ui/pages/actions/ActionsPage";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/actions")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <ActionsPage />
    </ProtectedRoute>
  );
}
