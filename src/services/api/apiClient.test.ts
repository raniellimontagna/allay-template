import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from './api.types';
import { ApiClient, api } from './apiClient';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

describe('ApiClient', () => {
  let client: ApiClient;
  let mockAxiosInstance: {
    get: jest.Mock;
    post: jest.Mock;
    put: jest.Mock;
    patch: jest.Mock;
    delete: jest.Mock;
    interceptors: {
      request: { use: jest.Mock; eject: jest.Mock };
      response: { use: jest.Mock; eject: jest.Mock };
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    client = new ApiClient();
    mockAxiosInstance = (axios.create as jest.Mock).mock.results[0].value;
  });

  describe('initialization', () => {
    it('should create axios instance with default config', () => {
      expect(axios.create).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('token management', () => {
    it('should not be authenticated initially', () => {
      expect(client.isAuthenticated()).toBe(false);
    });

    it('should be authenticated after setting token', () => {
      client.setToken('test-token');
      expect(client.isAuthenticated()).toBe(true);
    });

    it('should not be authenticated after clearing token', () => {
      client.setToken('test-token');
      client.clearToken();
      expect(client.isAuthenticated()).toBe(false);
    });
  });

  describe('interceptors logic', () => {
    it('should add Authorization header if token exists', () => {
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      client.setToken('my-secret-token');
      const config = { headers: {} } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBe('Bearer my-secret-token');
    });

    it('should not add Authorization header if token is missing', () => {
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      client.clearToken();
      const config = { headers: {} } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });

    it('should pass through successful response', () => {
      const responseSuccessInterceptor =
        mockAxiosInstance.interceptors.response.use.mock.calls[0][0];
      const response = { data: { test: true }, status: 200 };

      const result = responseSuccessInterceptor(response);

      expect(result).toBe(response);
    });

    it('should reject request error', async () => {
      const requestErrorInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][1];
      const error = new Error('Request error');

      await expect(requestErrorInterceptor(error)).rejects.toThrow('Request error');
    });

    it('should map axios error to ApiError with defaults', async () => {
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const axiosError = {
        response: {
          data: {}, // No message or code
        },
        message: 'Network error',
      } as unknown as AxiosError;

      try {
        await responseErrorInterceptor(axiosError);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        expect(apiError.message).toBe('Network error');
        expect(apiError.code).toBe('UNKNOWN_ERROR');
        expect(apiError.status).toBe(500);
      }
    });

    it('should map axios error to ApiError', async () => {
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const axiosError = {
        response: {
          status: 400,
          data: { message: 'Bad request', code: 'INVALID_DATA' },
        },
        message: 'Request failed',
      } as unknown as AxiosError;

      try {
        await responseErrorInterceptor(axiosError);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        expect(apiError.message).toBe('Bad request');
        expect(apiError.code).toBe('INVALID_DATA');
        expect(apiError.status).toBe(400);
      }
    });

    it('should clear token and map error on 401', async () => {
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      client.setToken('expired-token');
      const axiosError = {
        response: { status: 401, data: {} },
      } as unknown as AxiosError;

      try {
        await responseErrorInterceptor(axiosError);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        expect(apiError.status).toBe(401);
        expect(client.isAuthenticated()).toBe(false);
      }
    });
  });

  describe('HTTP methods', () => {
    it('get should return ApiResponse', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { id: 1 }, status: 200 });
      const result = await client.get('/test');
      expect(result).toEqual({ data: { id: 1 }, status: 200 });
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
    });

    it('post should return ApiResponse', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: { ok: true }, status: 201 });
      const result = await client.post('/test', { name: 'new' });
      expect(result).toEqual({ data: { ok: true }, status: 201 });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', { name: 'new' }, undefined);
    });

    it('put should return ApiResponse', async () => {
      mockAxiosInstance.put.mockResolvedValue({ data: { ok: true }, status: 200 });
      const result = await client.put('/test/1', { name: 'update' });
      expect(result).toEqual({ data: { ok: true }, status: 200 });
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', { name: 'update' }, undefined);
    });

    it('patch should return ApiResponse', async () => {
      mockAxiosInstance.patch.mockResolvedValue({ data: { ok: true }, status: 200 });
      const result = await client.patch('/test/1', { name: 'patch' });
      expect(result).toEqual({ data: { ok: true }, status: 200 });
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', { name: 'patch' }, undefined);
    });

    it('delete should return ApiResponse', async () => {
      mockAxiosInstance.delete.mockResolvedValue({ data: null, status: 204 });
      const result = await client.delete('/test/1');
      expect(result).toEqual({ data: null, status: 204 });
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', undefined);
    });
  });

  describe('singleton instance', () => {
    it('should export a singleton api instance', () => {
      expect(api).toBeInstanceOf(ApiClient);
    });
  });
});
