import { useState, useEffect } from "react";
import { Button } from "@/common/components/ui/button/button";
import { Card, CardContent } from "@/common/components/ui/card/card";
import { getAvailability, createReservation } from "@/repos/booking/booking.repo";
import type { TimeSlot } from "@/repos/booking/booking.repo";
import { format, addDays, isSameDay, parseISO } from "date-fns";

interface CalendarStepProps {
  businessSettingsId: string;
  serviceId: string;
  serviceName: string;
  onTimeSelect: (
    masterId: string,
    masterName: string,
    startTime: string,
    endTime: string,
    reservationId: string
  ) => void;
  onBack: () => void;
}

export default function CalendarStep({
  businessSettingsId,
  serviceId,
  serviceName,
  onTimeSelect,
  onBack,
}: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  // Generate week dates starting from today
  useEffect(() => {
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i));
    setWeekDates(dates);
  }, []);

  // Fetch availability when date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true);
      setError("");
      try {
        const startDate = format(selectedDate, "yyyy-MM-dd");
        const endDate = format(addDays(selectedDate, 1), "yyyy-MM-dd");

        const response = await getAvailability({
          serviceId,
          startDate,
          endDate,
        });

        setAvailableSlots(response.availableSlots || []);
      } catch (err) {
        console.error("Error fetching availability:", err);
        setError("Failed to load available time slots. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [serviceId, selectedDate]);

  const handleSlotSelect = async (slot: TimeSlot) => {
    setIsLoading(true);
    setError("");
    try {
      const reservation = await createReservation({
        businessSettingsId,
        interventionId: serviceId,
        masterId: slot.masterId,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });

      onTimeSelect(
        slot.masterId,
        slot.masterName,
        slot.startTime,
        slot.endTime,
        reservation.id
      );
    } catch (err) {
      console.error("Error creating reservation:", err);
      setError("Failed to reserve time slot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeSlot = (startTime: string, endTime: string) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Service: {serviceName}</h3>
        <p className="text-sm text-gray-600">
          Select a date and time for your appointment
        </p>
      </div>

      {/* Week Selector */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`p-3 rounded-lg text-center transition-colors ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              <div className="text-xs font-medium">
                {format(date, "EEE")}
              </div>
              <div className="text-lg font-bold">{format(date, "d")}</div>
              <div className="text-xs">{format(date, "MMM")}</div>
            </button>
          );
        })}
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="font-medium mb-3">
          Available Times - {format(selectedDate, "MMMM d, yyyy")}
        </h4>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading available times...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {!isLoading && !error && availableSlots.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No available time slots for this date. Please select another date.
          </div>
        )}

        {!isLoading && !error && availableSlots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableSlots.map((slot, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSlotSelect(slot)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">
                      {formatTimeSlot(slot.startTime, slot.endTime)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {slot.masterName}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Change Service
        </Button>
      </div>
    </div>
  );
}
