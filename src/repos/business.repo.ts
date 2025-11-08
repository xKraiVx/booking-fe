import api from "@/lib/api";
import type { RequestBody, ResponseData } from "@/lib/api-types";

// Business Settings Types
type GetAllBusinessSettingsResponse = ResponseData<
  "/business-settings",
  "get",
  200
>;
type GetBusinessSettingsByIdResponse = ResponseData<
  "/business-settings/{id}",
  "get",
  200
>;
type CreateBusinessSettingsBody = RequestBody<"/business-settings", "post">;
type CreateBusinessSettingsResponse = ResponseData<
  "/business-settings",
  "post",
  201
>;
type UpdateBusinessSettingsBody = RequestBody<"/business-settings/{id}", "put">;
type UpdateBusinessSettingsResponse = ResponseData<
  "/business-settings/{id}",
  "put",
  200
>;

// Intervention Types
type GetAllInterventionsResponse = ResponseData<"/interventions", "get", 200>;
type GetInterventionByIdResponse = ResponseData<
  "/interventions/{id}",
  "get",
  200
>;
type CreateInterventionBody = RequestBody<"/interventions", "post">;
type CreateInterventionResponse = ResponseData<"/interventions", "post", 201>;
type UpdateInterventionBody = RequestBody<"/interventions/{id}", "put">;
type UpdateInterventionResponse = ResponseData<
  "/interventions/{id}",
  "put",
  200
>;

// Master Types
type GetAllMastersResponse = ResponseData<"/masters", "get", 200>;
type GetMasterByIdResponse = ResponseData<"/masters/{id}", "get", 200>;
type CreateMasterBody = RequestBody<"/masters", "post">;
type CreateMasterResponse = ResponseData<"/masters", "post", 201>;
type UpdateMasterBody = RequestBody<"/masters/{id}", "put">;
type UpdateMasterResponse = ResponseData<"/masters/{id}", "put", 200>;

// ============ Business Settings ============
export const getAllBusinessSettings =
  async (): Promise<GetAllBusinessSettingsResponse> => {
    const response =
      await api.get<GetAllBusinessSettingsResponse>("/business-settings");
    return response.data;
  };

export const getBusinessSettingsById = async (
  id: string,
): Promise<GetBusinessSettingsByIdResponse> => {
  const response = await api.get<GetBusinessSettingsByIdResponse>(
    `/business-settings/${id}`,
  );
  return response.data;
};

export const createBusinessSettings = async (
  data: CreateBusinessSettingsBody,
): Promise<CreateBusinessSettingsResponse> => {
  const response = await api.post<CreateBusinessSettingsResponse>(
    "/business-settings",
    data,
  );
  return response.data;
};

export const updateBusinessSettings = async (
  id: string,
  data: UpdateBusinessSettingsBody,
): Promise<UpdateBusinessSettingsResponse> => {
  const response = await api.put<UpdateBusinessSettingsResponse>(
    `/business-settings/${id}`,
    data,
  );
  return response.data;
};

export const deleteBusinessSettings = async (id: string): Promise<void> => {
  await api.delete(`/business-settings/${id}`);
};

// ============ Interventions ============
export const getAllInterventions =
  async (): Promise<GetAllInterventionsResponse> => {
    const response =
      await api.get<GetAllInterventionsResponse>("/interventions");
    return response.data;
  };

export const getInterventionById = async (
  id: string,
): Promise<GetInterventionByIdResponse> => {
  const response = await api.get<GetInterventionByIdResponse>(
    `/interventions/${id}`,
  );
  return response.data;
};

export const createIntervention = async (
  data: CreateInterventionBody,
): Promise<CreateInterventionResponse> => {
  const response = await api.post<CreateInterventionResponse>(
    "/interventions",
    data,
  );
  return response.data;
};

export const updateIntervention = async (
  id: string,
  data: UpdateInterventionBody,
): Promise<UpdateInterventionResponse> => {
  const response = await api.put<UpdateInterventionResponse>(
    `/interventions/${id}`,
    data,
  );
  return response.data;
};

export const deleteIntervention = async (id: string): Promise<void> => {
  await api.delete(`/interventions/${id}`);
};

// ============ Masters ============
export const getAllMasters = async (): Promise<GetAllMastersResponse> => {
  const response = await api.get<GetAllMastersResponse>("/masters");
  return response.data;
};

export const getMasterById = async (
  id: string,
): Promise<GetMasterByIdResponse> => {
  const response = await api.get<GetMasterByIdResponse>(`/masters/${id}`);
  return response.data;
};

export const createMaster = async (
  data: CreateMasterBody,
): Promise<CreateMasterResponse> => {
  const response = await api.post<CreateMasterResponse>("/masters", data);
  return response.data;
};

export const updateMaster = async (
  id: string,
  data: UpdateMasterBody,
): Promise<UpdateMasterResponse> => {
  const response = await api.put<UpdateMasterResponse>(`/masters/${id}`, data);
  return response.data;
};

export const deleteMaster = async (id: string): Promise<void> => {
  await api.delete(`/masters/${id}`);
};

// ============ Public API (No Auth Required) ============
export const getPublicBusinessSettingsBySlug = async (
  slug: string,
): Promise<GetBusinessSettingsByIdResponse> => {
  const response = await api.get<GetBusinessSettingsByIdResponse>(
    `/business-settings/slug/${slug}`,
  );
  return response.data;
};

export const getPublicInterventions = async (
  businessSettingsId: string,
): Promise<GetAllInterventionsResponse> => {
  const response = await api.get<GetAllInterventionsResponse>(
    `/interventions?businessSettingsId=${businessSettingsId}`,
  );
  return response.data;
};

export const getPublicMasters = async (
  businessSettingsId: string,
): Promise<GetAllMastersResponse> => {
  const response = await api.get<GetAllMastersResponse>(
    `/masters?businessSettingsId=${businessSettingsId}`,
  );
  return response.data;
};

// Export types for use in components
export type {
  CreateBusinessSettingsBody,
  UpdateBusinessSettingsBody,
  CreateInterventionBody,
  UpdateInterventionBody,
  CreateMasterBody,
  UpdateMasterBody,
  GetAllBusinessSettingsResponse,
  GetAllInterventionsResponse,
  GetAllMastersResponse,
};
