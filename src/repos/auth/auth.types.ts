import type { RequestBody, ResponseData } from "@/lib/api-types";

export type RegisterResponse = ResponseData<"/auth/register", "post", 201>;
export type LoginResponse = ResponseData<"/auth/login", "post", 200>;
export type GetProfileResponse = ResponseData<"/auth/profile", "get", 200>;

export type RegisterData = RequestBody<"/auth/register", "post">;
export type LoginData = RequestBody<"/auth/login", "post">;
export type ForgotPasswordData = RequestBody<"/auth/forgot-password", "post">;
export type ResetPasswordData = RequestBody<"/auth/reset-password", "post">;
export type ChangePasswordData = RequestBody<"/auth/change-password", "post">;

export type AuthResponse = RegisterResponse & LoginResponse;
