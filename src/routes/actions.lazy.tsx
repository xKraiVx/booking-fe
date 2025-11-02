import { ProtectedRoute } from "@/common/ProtectedRoute";

import ActionsPage from "@/pages/actions/ActionsPage";

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
