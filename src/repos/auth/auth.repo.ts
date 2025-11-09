import api from "@/lib/api";
import type {
  AuthResponse,
  ChangePasswordData,
  ForgotPasswordData,
  GetProfileResponse,
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "@/repos/auth/auth.types";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordData,
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/forgot-password",
    data,
  );
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordData,
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/reset-password",
    data,
  );
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordData,
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/change-password",
    data,
  );
  return response.data;
};

export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await api.get<GetProfileResponse>("/auth/profile");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  localStorage.removeItem("auth_token");
};
