import type { User } from "@/lib/api";
import api, { type AuthResponse } from "@/lib/api";

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
};

export const forgotPassword = async (data: ForgotPasswordData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
};

export const resetPassword = async (data: ResetPasswordData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
};

export const getProfile = async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
}

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
};