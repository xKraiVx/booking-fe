import type { WithPagination } from "@/common/types/general.types";
import api from "@/lib/api";

export enum ActionType {
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  PASSWORD_CHANGE = "password_change",
  PASSWORD_RESET = "password_reset",
  USER_CREATE = "user_create",
  USER_UPDATE = "user_update",
  USER_DELETE = "user_delete",
  PROFILE_UPDATE = "profile_update",
  API_REQUEST = "api_request",
  ERROR = "error",
}

export interface ActionsUserData {
  authProvider: string;
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  password: string | null;
  providerId: string;
  resetPasswordExpires: string | null;
  resetPasswordToken: string | null;
  role: string;
  updatedAt: string;
}

export interface ActionsData {
  id: number;
  userId: string;
  action: ActionType;
  entity: string;
  entityId: string;
  method: string;
  path: string;
  statusCode: number;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, string>;
  errorMessage: string;
  createdAt: Date;
  user: ActionsUserData;
}

export type ActionsResponse = WithPagination<ActionsData>;

export const getActions = async () => {
  const response = await api.get<ActionsResponse>("/audit-logs");
  return response.data;
};
