import { ApiClient, api } from './apiClient';

describe('ApiClient', () => {
  describe('token management', () => {
    let client: ApiClient;

    beforeEach(() => {
      client = new ApiClient();
    });

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

  describe('singleton instance', () => {
    it('should export a singleton api instance', () => {
      expect(api).toBeInstanceOf(ApiClient);
    });

    it('should share token state within singleton', () => {
      api.setToken('shared-token');
      expect(api.isAuthenticated()).toBe(true);
      api.clearToken();
      expect(api.isAuthenticated()).toBe(false);
    });
  });
});
