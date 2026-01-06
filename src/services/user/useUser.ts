import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiError, ApiResponse, PaginatedResponse, PaginationParams } from '@/services/api';
import { type CreateUserDTO, type UpdateUserDTO, type User, userService } from './userService';

// Query keys for cache management
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery<ApiResponse<User>, ApiError>({
    queryKey: userKeys.me(),
    queryFn: userService.getMe,
  });
}

/**
 * Hook to get user by ID
 */
export function useUser(id: string) {
  return useQuery<ApiResponse<User>, ApiError>({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook to list users with pagination
 */
export function useUsers(params?: PaginationParams) {
  return useQuery<ApiResponse<PaginatedResponse<User>>, ApiError>({
    queryKey: userKeys.list(params),
    queryFn: () => userService.list(params),
  });
}

/**
 * Hook to create a user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, CreateUserDTO>({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

/**
 * Hook to update a user
 */
export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, UpdateUserDTO>({
    mutationFn: (data) => userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, ApiError, string>({
    mutationFn: userService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
