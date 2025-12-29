import api from "@/lib/api";

export interface AvailabilityParams {
  serviceId: string;
  masterId?: string;
  startDate?: string;
  endDate?: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  masterId: string;
  masterName: string;
}

export interface AvailabilityResponse {
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  availableSlots: TimeSlot[];
}

export interface CreateReservationParams {
  businessSettingsId: string;
  interventionId: string;
  masterId: string;
  startTime: string;
  endTime: string;
}

export interface ReservationResponse {
  id: string;
  businessSettingsId: string;
  interventionId: string;
  masterId: string;
  startTime: string;
  endTime: string;
  expiresAt: string;
}

export interface CreateBookingParams {
  businessSettingsId: string;
  interventionId: string;
  masterId: string;
  startTime: string;
  endTime: string;
  reservationId?: string;
}

export interface BookingResponse {
  id: string;
  businessSettingsId: string;
  interventionId: string;
  masterId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const getAvailability = async (
  params: AvailabilityParams
): Promise<AvailabilityResponse> => {
  const response = await api.get<AvailabilityResponse>(
    "/booking/availability/check",
    { params }
  );
  return response.data;
};

export const createReservation = async (
  data: CreateReservationParams
): Promise<ReservationResponse> => {
  const response = await api.post<ReservationResponse>(
    "/booking/reservation",
    data
  );
  return response.data;
};

export const createBooking = async (
  data: CreateBookingParams
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>("/booking", data);
  return response.data;
};
