import { useState } from "react";
import { Route } from "@/routes/tenant/$tenantId/book";
import { Card, CardContent } from "@/common/components/ui/card/card";
import { Button } from "@/common/components/ui/button/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ServiceSelectionStep,
  CalendarStep,
  AuthenticationStep,
} from "./components/booking";
import { useAuthStore } from "@/store/authStore";

export type BookingStep = "service" | "calendar" | "auth" | "complete";

export interface BookingData {
  serviceId?: string;
  serviceName?: string;
  masterId?: string;
  masterName?: string;
  startTime?: string;
  endTime?: string;
  reservationId?: string;
}

export default function TenantBookingPage() {
  const { businessSettings, businessSettingsId } = Route.useLoaderData();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [bookingData, setBookingData] = useState<BookingData>({});

  const interventions = businessSettings.interventions || [];

  const handleBack = () => {
    if (currentStep === "service") {
      navigate({ to: "/tenant/$tenantId", params: { tenantId: businessSettings.slug } });
    } else if (currentStep === "calendar") {
      setCurrentStep("service");
    } else if (currentStep === "auth") {
      setCurrentStep("calendar");
    }
  };

  const handleServiceSelect = (serviceId: string, serviceName: string) => {
    setBookingData({ ...bookingData, serviceId, serviceName });
    setCurrentStep("calendar");
  };

  const handleTimeSelect = async (
    masterId: string,
    masterName: string,
    startTime: string,
    endTime: string,
    reservationId: string
  ) => {
    setBookingData({
      ...bookingData,
      masterId,
      masterName,
      startTime,
      endTime,
      reservationId,
    });

    // If user is already authenticated, skip auth step
    if (user) {
      setCurrentStep("complete");
    } else {
      setCurrentStep("auth");
    }
  };

  const handleAuthComplete = () => {
    setCurrentStep("complete");
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "service":
        return "Select a Service";
      case "calendar":
        return "Choose Date & Time";
      case "auth":
        return "Sign In to Complete Booking";
      case "complete":
        return "Booking Confirmed!";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {businessSettings.title}
          </h1>
          <p className="text-gray-600">{getStepTitle()}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "service"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "calendar" || currentStep === "auth" || currentStep === "complete"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "auth" || currentStep === "complete"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            {currentStep === "service" && (
              <ServiceSelectionStep
                services={interventions}
                onServiceSelect={handleServiceSelect}
              />
            )}

            {currentStep === "calendar" && bookingData.serviceId && (
              <CalendarStep
                businessSettingsId={businessSettingsId}
                serviceId={bookingData.serviceId}
                serviceName={bookingData.serviceName || ""}
                onTimeSelect={handleTimeSelect}
                onBack={() => setCurrentStep("service")}
              />
            )}

            {currentStep === "auth" && (
              <AuthenticationStep
                businessSettingsId={businessSettingsId}
                bookingData={bookingData}
                onAuthComplete={handleAuthComplete}
              />
            )}

            {currentStep === "complete" && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-2">
                  Service: {bookingData.serviceName}
                </p>
                <p className="text-gray-600 mb-2">
                  Master: {bookingData.masterName}
                </p>
                <p className="text-gray-600 mb-8">
                  Time: {bookingData.startTime && new Date(bookingData.startTime).toLocaleString()}
                </p>
                <Button
                  onClick={() =>
                    navigate({ to: "/tenant/$tenantId", params: { tenantId: businessSettings.slug } })
                  }
                >
                  Back to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
