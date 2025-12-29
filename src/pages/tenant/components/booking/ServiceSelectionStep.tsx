import { Button } from "@/common/components/ui/button/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card/card";

interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price?: number;
}

interface ServiceSelectionStepProps {
  services: Service[];
  onServiceSelect: (serviceId: string, serviceName: string) => void;
}

export default function ServiceSelectionStep({
  services,
  onServiceSelect,
}: ServiceSelectionStepProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onServiceSelect(service.id, service.name)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              {service.description && (
                <CardDescription>{service.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{service.duration} min</span>
                </div>
                {service.price && (
                  <div className="text-lg font-bold text-blue-600">
                    ${service.price}
                  </div>
                )}
              </div>
              <Button className="w-full mt-4" variant="default">
                Select Service
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
