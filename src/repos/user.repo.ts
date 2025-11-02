import api from "@/lib/api";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'admin' | 'tenant' | 'client';
}

export const UserRole = {
    ADMIN: 'admin',
    TENANT: 'tenant',
    CLIENT: 'client',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const AuthProvider = {
    LOCAL: 'local',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
} as const;

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider];

export interface CreateUserDto {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: UserRole;
    authProvider?: AuthProvider;
    providerId?: string;
    isActive?: boolean;
}

export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: UserRole;
    isActive?: boolean;
}

// Get all users (Admin only)
export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/auth/users');
    return response.data;
};

// Get user by ID (Admin only)
export const getUserById = async (id: string): Promise<User> => {
    const response = await api.get<User>(`/auth/users/${id}`);
    return response.data;
};

// Create a new user (Admin only)
export const createUser = async (userData: CreateUserDto): Promise<User> => {
    const response = await api.post<User>('/auth/users', userData);
    return response.data;
};

// Update user (Admin only)
export const updateUser = async (id: string, userData: UpdateUserDto): Promise<User> => {
    const response = await api.put<User>(`/auth/users/${id}`, userData);
    return response.data;
};

// Delete user (Admin only)
export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/auth/users/${id}`);
};

// Update user role (Admin only)
export const updateUserRole = async (userId: string, role: UserRole): Promise<User> => {
    const response = await api.put<User>(`/auth/users/${userId}`, { role });
    return response.data;
};
