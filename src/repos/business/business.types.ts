import type { RequestBody, ResponseData } from "@/lib/api-types";

export type GetAllBusinessSettingsResponse = ResponseData<
  "/business-settings",
  "get",
  200
>;
export type GetMyBusinessSettingsResponse = ResponseData<
  "/business-settings/my-settings",
  "get",
  200
>;
export type GetPublicBusinessSettingsResponse = ResponseData<
  "/business-settings/slug/{slug}",
  "get",
  200
>;
export type CreateBusinessSettingsBody = RequestBody<
  "/business-settings",
  "post"
>;
export type CreateBusinessSettingsResponse = ResponseData<
  "/business-settings",
  "post",
  201
>;
export type UpdateBusinessSettingsBody = RequestBody<
  "/business-settings/{id}",
  "put"
>;
export type UpdateBusinessSettingsResponse = ResponseData<
  "/business-settings/{id}",
  "put",
  200
>;

// Intervention Types
export type GetAllInterventionsResponse = ResponseData<
  "/interventions",
  "get",
  200
>;
export type GetInterventionByIdResponse = ResponseData<
  "/interventions/{id}",
  "get",
  200
>;
export type CreateInterventionBody = RequestBody<"/interventions", "post">;
export type CreateInterventionResponse = ResponseData<
  "/interventions",
  "post",
  201
>;
export type UpdateInterventionBody = RequestBody<"/interventions/{id}", "put">;
export type UpdateInterventionResponse = ResponseData<
  "/interventions/{id}",
  "put",
  200
>;

// Master Types
export type GetAllMastersResponse = ResponseData<"/masters", "get", 200>;
export type GetMasterByIdResponse = ResponseData<"/masters/{id}", "get", 200>;
export type CreateMasterBody = RequestBody<"/masters", "post">;
export type CreateMasterResponse = ResponseData<"/masters", "post", 201>;
export type UpdateMasterBody = RequestBody<"/masters/{id}", "put">;
export type UpdateMasterResponse = ResponseData<"/masters/{id}", "put", 200>;
