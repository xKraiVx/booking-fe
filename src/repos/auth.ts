import type { User } from "@/lib/api";
import api from "@/lib/api";

export const getProfile = async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
}

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
};