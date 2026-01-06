import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiError, ApiResponse, PaginatedResponse, PaginationParams } from '@/services/api';
import { api } from '@/services/api';

/**
 * Generic hook for GET requests with React Query
 */
export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: key,
    queryFn: () => api.get<T>(endpoint),
    ...options,
  });
}

/**
 * Generic hook for paginated GET requests
 */
export function usePaginatedQuery<T>(
  key: string[],
  endpoint: string,
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<PaginatedResponse<T>>, ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  const url = queryParams.toString() ? `${endpoint}?${queryParams}` : endpoint;

  return useQuery<ApiResponse<PaginatedResponse<T>>, ApiError>({
    queryKey: [...key, params],
    queryFn: () => api.get<PaginatedResponse<T>>(url),
    ...options,
  });
}

/**
 * Generic hook for POST mutations
 */
export function useApiMutation<TData, TVariables = unknown>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>, 'mutationFn'>
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => api.post<TData, TVariables>(endpoint, variables),
    ...options,
  });
}

/**
 * Generic hook for PUT mutations
 */
export function useApiUpdateMutation<TData, TVariables = unknown>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>, 'mutationFn'>
) {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: (variables) => api.put<TData, TVariables>(endpoint, variables),
    ...options,
  });
}

/**
 * Generic hook for DELETE mutations
 */
export function useApiDeleteMutation<TData = void>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<TData>, ApiError, string | number>, 'mutationFn'>
) {
  return useMutation<ApiResponse<TData>, ApiError, string | number>({
    mutationFn: (id) => api.delete<TData>(`${endpoint}/${id}`),
    ...options,
  });
}

/**
 * Hook to invalidate queries
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidate: (keys: string[]) => queryClient.invalidateQueries({ queryKey: keys }),
    invalidateAll: () => queryClient.invalidateQueries(),
    removeQueries: (keys: string[]) => queryClient.removeQueries({ queryKey: keys }),
  };
}
