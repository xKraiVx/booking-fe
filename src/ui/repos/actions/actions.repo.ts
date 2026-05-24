import api from "@/ui/lib/api";
import type { ActionsResponse } from "@/ui/repos/actions/actions.types";

export const getActions = async () => {
  const response = await api.get<ActionsResponse>("/audit-logs");
  return response.data;
};
