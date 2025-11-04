import { Route } from "@/routes/tenant/$tenantId";
import HeroSection from "./components/HeroSection";
import ServicesSlider from "@/pages/tenant/components/ServicesSlider";
import MastersList from "@/pages/tenant/components/MastersList";
import MapSection from "@/pages/tenant/components/MapSection";
import ContactSection from "@/pages/tenant/components/ContactSection";


export default function TenantPublicPage() {
  const { businessSettings, interventions, masters } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <HeroSection
        title={businessSettings.title}
        description={businessSettings.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {interventions.length > 0 && (
          <section id="services">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Services
            </h2>
            <ServicesSlider services={interventions} />
          </section>
        )}

        {masters.length > 0 && (
          <section id="masters">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Team
            </h2>
            <MastersList masters={masters} />
          </section>
        )}

        {businessSettings.address && (
          <section id="location">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Find Us
            </h2>
            <MapSection address={businessSettings.address} />
          </section>
        )}

        {businessSettings.socialLinks && (
          <section id="contact">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Connect With Us
            </h2>
            <ContactSection socialLinks={businessSettings.socialLinks} />
          </section>
        )}
      </div>
    </div>
  );
}
