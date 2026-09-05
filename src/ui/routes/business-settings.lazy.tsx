import { createLazyFileRoute } from "@tanstack/react-router";
import { BusinessSettingsPage } from "@/ui/pages/business-settings/BusinessSettingsPage";
import { ProtectedRoute } from "@/ui/common/components/protected-route/ProtectedRoute";

export const Route = createLazyFileRoute("/business-settings")({
  component: () => (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <BusinessSettingsPage />
    </ProtectedRoute>
  ),
});
