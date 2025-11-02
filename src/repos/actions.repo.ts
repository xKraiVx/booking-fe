import api from "@/lib/api";
import type { ResponseData } from "@/lib/api-types";

export type ActionsResponse = ResponseData<"/audit-logs", "get", 200>;

export const getActions = async () => {
  const response = await api.get<ActionsResponse>("/audit-logs");
  return response.data;
};
