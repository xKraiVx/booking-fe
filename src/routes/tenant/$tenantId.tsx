import { createFileRoute } from "@tanstack/react-router";
import {
  getPublicBusinessSettingsBySlug,
} from "@/repos/business/business.repo";
import TenantPublicPage from "@/pages/tenant/TenantPublicPage";

export const Route = createFileRoute("/tenant/$tenantId")({
  component: TenantPublicPage,
  loader: async ({ params }) => {
    const { tenantId: slug } = params;

    const businessSettings = await getPublicBusinessSettingsBySlug(slug);


    return {
      businessSettings,
    };
  },
});
