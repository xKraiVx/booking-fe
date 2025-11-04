import { createFileRoute } from "@tanstack/react-router";
import {
  getPublicBusinessSettings,
  getPublicInterventions,
  getPublicMasters,
} from "@/repos/business.repo";
import TenantPublicPage from "@/pages/tenant/TenantPublicPage";

export const Route = createFileRoute("/tenant/$tenantId")({
  component: TenantPublicPage,
  loader: async ({ params }) => {
    const { tenantId } = params;

    try {
      // Fetch business settings first
      const businessSettings = await getPublicBusinessSettings(tenantId);

      // Then fetch interventions and masters using the business settings ID
      const [interventions, masters] = await Promise.all([
        getPublicInterventions(businessSettings.id),
        getPublicMasters(businessSettings.id),
      ]);

      return {
        businessSettings,
        interventions,
        masters,
      };
    } catch (error) {
      console.error("Error loading tenant data:", error);
      throw error;
    }
  },
});
