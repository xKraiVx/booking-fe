import api from "@/ui/lib/api";
import type { CreateUserBody, CreateUserResponse, GetAllUsersResponse, GetUserByIdResponse, UpdateUserBody, UpdateUserResponse, UserRole } from "@/ui/repos/user/user.types";

export type CreateUserDto = CreateUserBody;
export type UpdateUserDto = UpdateUserBody;
export type User = GetUserByIdResponse;
export type { UserRole };

// Get all users (Admin only)
export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await api.get<GetAllUsersResponse>("/auth/users");
  return response.data;
};

// Get user by ID (Admin only)
export const getUserById = async (id: string): Promise<GetUserByIdResponse> => {
  const response = await api.get<GetUserByIdResponse>(`/auth/users/${id}`);
  return response.data;
};

// Create a new user (Admin only)
export const createUser = async (
  userData: CreateUserBody,
): Promise<CreateUserResponse> => {
  const response = await api.post<CreateUserResponse>("/auth/users", userData);
  return response.data;
};

// Update user (Admin only)
export const updateUser = async (
  id: string,
  userData: UpdateUserBody,
): Promise<UpdateUserResponse> => {
  const response = await api.put<UpdateUserResponse>(
    `/auth/users/${id}`,
    userData,
  );
  return response.data;
};

// Delete user (Admin only)
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/auth/users/${id}`);
};

// Update user role (Admin only)
export const updateUserRole = async (
  userId: string,
  role: UserRole,
): Promise<UpdateUserResponse> => {
  const response = await api.put<UpdateUserResponse>(`/auth/users/${userId}`, {
    role,
  });
  return response.data;
};
