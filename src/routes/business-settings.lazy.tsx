import { createLazyFileRoute } from "@tanstack/react-router";
import { BusinessSettingsPage } from "@/pages/business-settings/BusinessSettingsPage";
import { ProtectedRoute } from "@/common/ProtectedRoute";

export const Route = createLazyFileRoute("/business-settings")({
  component: () => (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <BusinessSettingsPage />
    </ProtectedRoute>
  ),
});
