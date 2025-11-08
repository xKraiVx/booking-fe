import { useState } from "react";
import { useGetAllBusinessSettings } from "@/use-cases/business-settings/useBusinessSettings";
import { useGetAllInterventions } from "@/use-cases/interventions/useInterventions";
import { useGetAllMasters } from "@/use-cases/masters/useMasters";
import { Button } from "@/common/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card/card";
import Loader from "@/common/Loader";
import { BusinessSettingsForm } from "./components/BusinessSettingsForm";
import { Plus, Users, Scissors, ExternalLink, Copy, Check } from "lucide-react";
import { MasterModal } from "@/features/master-modal/components/MasterModal";
import { InterventionModal } from "@/features/intervention-modal/components/InterventionModal";

export const BusinessSettingsPage = () => {
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState<string | null>(null);
  const [editingInterventionId, setEditingInterventionId] = useState<
    string | null
  >(null);
  const [isCopied, setIsCopied] = useState(false);

  const { data: businessSettings, isLoading: isLoadingSettings } =
    useGetAllBusinessSettings();
  const { data: interventions, isLoading: isLoadingInterventions } =
    useGetAllInterventions();
  const { data: masters, isLoading: isLoadingMasters } = useGetAllMasters();

  if (isLoadingSettings || isLoadingInterventions || isLoadingMasters) {
    return <Loader />;
  }

  const handleEditMaster = (id: string) => {
    setEditingMasterId(id);
    setShowMasterModal(true);
  };

  const handleEditIntervention = (id: string) => {
    setEditingInterventionId(id);
    setShowInterventionModal(true);
  };

  const handleCloseMasterModal = () => {
    setShowMasterModal(false);
    setEditingMasterId(null);
  };

  const handleCloseInterventionModal = () => {
    setShowInterventionModal(false);
    setEditingInterventionId(null);
  };

  const handleCopyLink = async () => {
    if (businessSettings?.[0]?.slug) {
      const publicUrl = `${window.location.origin}/tenant/${businessSettings[0].slug}`;
      try {
        await navigator.clipboard.writeText(publicUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleOpenPublicPage = () => {
    if (businessSettings?.[0]?.slug) {
      const publicUrl = `${window.location.origin}/tenant/${businessSettings[0].slug}`;
      window.open(publicUrl, "_blank");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Business Settings</h1>
      </div>

      {/* Public Page Link Section */}
      {businessSettings?.[0]?.id && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <ExternalLink className="h-5 w-5" />
              Public Page
            </CardTitle>
            <CardDescription className="text-blue-700">
              Share your business page with customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-white rounded-md border border-blue-200">
              <code className="flex-1 text-sm text-gray-700 break-all">
                {`${window.location.origin}/tenant/${businessSettings[0].slug}`}
              </code>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex items-center gap-2"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                onClick={handleOpenPublicPage}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open Public Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Business Settings Form */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Configure your business details, working hours, and contact
            information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessSettingsForm businessSettings={businessSettings?.[0]} />
        </CardContent>
      </Card>

      {/* Masters Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Masters
            </CardTitle>
            <CardDescription>
              Manage your team members and their specializations
            </CardDescription>
          </div>
          <Button onClick={() => setShowMasterModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Master
          </Button>
        </CardHeader>
        <CardContent>
          {!masters || masters.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No masters added yet. Click "Add Master" to create your first team
              member.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {masters.map((master) => (
                <Card
                  key={master.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleEditMaster(master.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {master.photo ? (
                        <img
                          src={master.photo}
                          alt={master.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{master.name}</h3>
                        {master.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {master.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interventions/Services Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Services
            </CardTitle>
            <CardDescription>
              Manage your services, pricing, and duration
            </CardDescription>
          </div>
          <Button onClick={() => setShowInterventionModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          {!interventions || interventions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No services added yet. Click "Add Service" to create your first
              service.
            </p>
          ) : (
            <div className="space-y-3">
              {interventions.map((intervention) => (
                <Card
                  key={intervention.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleEditIntervention(intervention.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{intervention.name}</h3>
                        {intervention.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {intervention.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{intervention.duration} min</span>
                          <span className="font-semibold text-foreground">
                            {intervention.price}{" "}
                            {intervention.currency || "PLN"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <MasterModal
        open={showMasterModal}
        onOpenChange={handleCloseMasterModal}
        editingId={editingMasterId}
      />

      <InterventionModal
        open={showInterventionModal}
        onOpenChange={handleCloseInterventionModal}
        editingId={editingInterventionId}
        masters={masters || []}
      />
    </div>
  );
};
