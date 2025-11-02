import api from "@/lib/api";
import type { RequestBody, ResponseData } from "@/lib/api-types";

type GetAllUsersResponse = ResponseData<"/auth/users", "get", 200>;

type GetUserByIdResponse = ResponseData<"/auth/users/{id}", "get", 200>;

type CreateUserBody = RequestBody<"/auth/users", "post">;

type CreateUserResponse = ResponseData<"/auth/users", "post", 201>;

type UpdateUserBody = RequestBody<"/auth/users/{id}", "put">;

type UpdateUserResponse = ResponseData<"/auth/users/{id}", "put", 200>;

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
  role: UpdateUserBody["role"],
): Promise<UpdateUserResponse> => {
  const response = await api.put<UpdateUserResponse>(`/auth/users/${userId}`, {
    role,
  });
  return response.data;
};
