import type { RequestBody, ResponseData } from "@/lib/api-types";

export type GetAllUsersResponse = ResponseData<"/auth/users", "get", 200>;

export type GetUserByIdResponse = ResponseData<"/auth/users/{id}", "get", 200>;

export type CreateUserBody = RequestBody<"/auth/users", "post">;

export type CreateUserResponse = ResponseData<"/auth/users", "post", 201>;

export type UpdateUserBody = RequestBody<"/auth/users/{id}", "put">;

export type UpdateUserResponse = ResponseData<"/auth/users/{id}", "put", 200>;

export type UserData = GetUserByIdResponse;

export type UserRole = GetUserByIdResponse["role"];
