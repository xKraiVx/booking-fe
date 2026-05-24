import { createFileRoute } from "@tanstack/react-router";
import {
  getPublicBusinessSettingsBySlug,
} from "@/ui/repos/business/business.repo";
import TenantBookingPage from "@/ui/pages/tenant/TenantBookingPage";

export const Route = createFileRoute("/tenant/$tenantId/book")({
  component: TenantBookingPage,
  loader: async ({ params }) => {
    const { tenantId: slug } = params;

    const businessSettings = await getPublicBusinessSettingsBySlug(slug);

    return {
      businessSettings,
      businessSettingsId: businessSettings.id,
    };
  },
});
