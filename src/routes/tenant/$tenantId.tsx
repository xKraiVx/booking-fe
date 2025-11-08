import { createFileRoute } from "@tanstack/react-router";
import {
  getPublicBusinessSettingsBySlug,
  getPublicInterventions,
  getPublicMasters,
} from "@/repos/business.repo";
import TenantPublicPage from "@/pages/tenant/TenantPublicPage";

export const Route = createFileRoute("/tenant/$tenantId")({
  component: TenantPublicPage,
  loader: async ({ params }) => {
    const { tenantId: slug } = params;

    // Fetch by slug only
    const businessSettings = await getPublicBusinessSettingsBySlug(slug);

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
  },
});
