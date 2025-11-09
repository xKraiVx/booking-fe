import api from "@/lib/api";
import type { ActionsResponse } from "@/repos/actions/actions.types";

export const getActions = async () => {
  const response = await api.get<ActionsResponse>("/audit-logs");
  return response.data;
};
