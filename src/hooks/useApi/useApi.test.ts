import { act, renderHookWithProviders, waitFor } from '@/testing/test-utils';
import {
  useApiDeleteMutation,
  useApiMutation,
  useApiQuery,
  useApiUpdateMutation,
  useInvalidateQueries,
  usePaginatedQuery,
} from './useApi';

// Mock the api client
jest.mock('@/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import { api } from '@/services/api';

const mockApi = api as jest.Mocked<typeof api>;

describe('useApi hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useApiQuery', () => {
    it('should fetch data and return success state', async () => {
      const mockData = { id: 1, name: 'Test User' };
      mockApi.get.mockResolvedValueOnce({ data: mockData, status: 200 });

      const { result } = renderHookWithProviders(() => useApiQuery(['users', '1'], '/users/1'));

      // Initially loading
      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual({ data: mockData, status: 200 });
      expect(mockApi.get).toHaveBeenCalledWith('/users/1');
    });

    it('should handle error state', async () => {
      const mockError = { message: 'Not found', code: 'NOT_FOUND', status: 404 };
      mockApi.get.mockRejectedValueOnce(mockError);

      const { result } = renderHookWithProviders(() => useApiQuery(['users', '999'], '/users/999'));

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('usePaginatedQuery', () => {
    it('should fetch paginated data', async () => {
      const mockData = {
        data: [{ id: 1 }, { id: 2 }],
        page: 1,
        limit: 10,
        total: 2,
      };
      mockApi.get.mockResolvedValueOnce({ data: mockData, status: 200 });

      const { result } = renderHookWithProviders(() =>
        usePaginatedQuery(['users'], '/users', { page: 1, limit: 10 })
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.get).toHaveBeenCalledWith('/users?page=1&limit=10');
    });

    it('should work without pagination params', async () => {
      mockApi.get.mockResolvedValueOnce({ data: { data: [] }, status: 200 });

      const { result } = renderHookWithProviders(() => usePaginatedQuery(['users'], '/users'));

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.get).toHaveBeenCalledWith('/users');
    });
  });

  describe('useApiMutation', () => {
    it('should post data and return success', async () => {
      const mockResponse = { data: { id: 1, name: 'Created' }, status: 201 };
      mockApi.post.mockResolvedValueOnce(mockResponse);

      const { result } = renderHookWithProviders(() =>
        useApiMutation<{ id: number; name: string }, { name: string }>('/users')
      );

      act(() => {
        result.current.mutate({ name: 'Created' });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockApi.post).toHaveBeenCalledWith('/users', { name: 'Created' });
    });
  });

  describe('useApiUpdateMutation', () => {
    it('should put data and return success', async () => {
      const mockResponse = { data: { id: 1, name: 'Updated' }, status: 200 };
      mockApi.put.mockResolvedValueOnce(mockResponse);

      const { result } = renderHookWithProviders(() =>
        useApiUpdateMutation<{ id: number; name: string }, { name: string }>('/users/1')
      );

      act(() => {
        result.current.mutate({ name: 'Updated' });
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.put).toHaveBeenCalledWith('/users/1', { name: 'Updated' });
    });
  });

  describe('useApiDeleteMutation', () => {
    it('should delete and return success', async () => {
      mockApi.delete.mockResolvedValueOnce({ data: null, status: 204 });

      const { result } = renderHookWithProviders(() => useApiDeleteMutation('/users'));

      act(() => {
        result.current.mutate(1);
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.delete).toHaveBeenCalledWith('/users/1');
    });
  });

  describe('useInvalidateQueries', () => {
    it('should return invalidation functions', () => {
      const { result } = renderHookWithProviders(() => useInvalidateQueries());

      expect(result.current).toHaveProperty('invalidate');
      expect(result.current).toHaveProperty('invalidateAll');
      expect(result.current).toHaveProperty('removeQueries');
      expect(typeof result.current.invalidate).toBe('function');
    });
  });
});
