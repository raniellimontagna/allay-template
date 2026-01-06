import type { PaginatedResponse, PaginationParams } from '@/services/api';
import { api } from '@/services/api';

// Example types - customize for your app
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  avatar?: string;
}

/**
 * User service - example of a domain-specific service
 */
export const userService = {
  /**
   * Get current user profile
   */
  getMe: () => api.get<User>('/users/me'),

  /**
   * Get user by ID
   */
  getById: (id: string) => api.get<User>(`/users/${id}`),

  /**
   * List users with pagination
   */
  list: (params?: PaginationParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    const url = queryParams.toString() ? `/users?${queryParams}` : '/users';
    return api.get<PaginatedResponse<User>>(url);
  },

  /**
   * Create a new user
   */
  create: (data: CreateUserDTO) => api.post<User, CreateUserDTO>('/users', data),

  /**
   * Update user
   */
  update: (id: string, data: UpdateUserDTO) => api.patch<User, UpdateUserDTO>(`/users/${id}`, data),

  /**
   * Delete user
   */
  delete: (id: string) => api.delete<void>(`/users/${id}`),
};
