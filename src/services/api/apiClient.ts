import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import type { ApiConfig, ApiError, ApiResponse } from './api.types';

const DEFAULT_CONFIG: ApiConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

class ApiClient {
  private instance: AxiosInstance;
  private authToken: string | null = null;

  constructor(config: Partial<ApiConfig> = {}) {
    this.instance = axios.create({
      ...DEFAULT_CONFIG,
      ...config,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - add auth token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.authToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An unexpected error occurred',
          code: error.response?.data?.code || error.code || 'UNKNOWN_ERROR',
          status: error.response?.status || 500,
        };

        // Handle specific status codes
        if (error.response?.status === 401) {
          this.clearToken();
          // You can emit an event here to notify the app about unauthorized access
        }

        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Set the authentication token for all requests
   */
  setToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear the authentication token
   */
  clearToken(): void {
    this.authToken = null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return { data: response.data, status: response.status };
  }

  /**
   * POST request
   */
  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return { data: response.data, status: response.status };
  }

  /**
   * PUT request
   */
  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return { data: response.data, status: response.status };
  }

  /**
   * PATCH request
   */
  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<T>(url, data, config);
    return { data: response.data, status: response.status };
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return { data: response.data, status: response.status };
  }
}

// Singleton instance
export const api = new ApiClient();

// Export class for custom instances
export { ApiClient };
