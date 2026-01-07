import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS, storage } from './storage';

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return parsed value when key exists', async () => {
      const mockValue = { name: 'test', value: 123 };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockValue));

      const result = await storage.get<typeof mockValue>('test-key');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toEqual(mockValue);
    });

    it('should return null when key does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await storage.get('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null on error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const result = await storage.get('error-key');

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should return true on successful set', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.set('key', { data: 'value' });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ data: 'value' }));
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Write error'));

      const result = await storage.set('key', 'value');

      expect(result).toBe(false);
    });
  });

  describe('remove', () => {
    it('should return true on successful remove', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.remove('key');

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('key');
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error('Remove error'));

      const result = await storage.remove('key');

      expect(result).toBe(false);
    });
  });

  describe('clear', () => {
    it('should return true on successful clear', async () => {
      (AsyncStorage.clear as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.clear();

      expect(AsyncStorage.clear).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      (AsyncStorage.clear as jest.Mock).mockRejectedValue(new Error('Clear error'));

      const result = await storage.clear();

      expect(result).toBe(false);
    });
  });

  describe('getAllKeys', () => {
    it('should return array of keys', async () => {
      const mockKeys = ['key1', 'key2', 'key3'];
      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(mockKeys);

      const result = await storage.getAllKeys();

      expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
      expect(result).toEqual(mockKeys);
    });

    it('should return empty array on error', async () => {
      (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValue(new Error('Keys error'));

      const result = await storage.getAllKeys();

      expect(result).toEqual([]);
    });
  });

  describe('getMultiple', () => {
    it('should return object with parsed values', async () => {
      const mockPairs: [string, string | null][] = [
        ['user', JSON.stringify({ id: 1, name: 'Test' })],
        ['settings', JSON.stringify({ theme: 'dark' })],
      ];
      (AsyncStorage.multiGet as jest.Mock).mockResolvedValue(mockPairs);

      const result = await storage.getMultiple(['user', 'settings']);

      expect(AsyncStorage.multiGet).toHaveBeenCalledWith(['user', 'settings']);
      expect(result).toEqual({
        user: { id: 1, name: 'Test' },
        settings: { theme: 'dark' },
      });
    });

    it('should handle null values in result', async () => {
      const mockPairs: [string, string | null][] = [
        ['exists', JSON.stringify({ data: true })],
        ['missing', null],
      ];
      (AsyncStorage.multiGet as jest.Mock).mockResolvedValue(mockPairs);

      const result = await storage.getMultiple(['exists', 'missing']);

      expect(result).toEqual({
        exists: { data: true },
        missing: null,
      });
    });

    it('should return empty object on error', async () => {
      (AsyncStorage.multiGet as jest.Mock).mockRejectedValue(new Error('Multi error'));

      const result = await storage.getMultiple(['key1', 'key2']);

      expect(result).toEqual({});
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have expected keys', () => {
      expect(STORAGE_KEYS.AUTH_TOKEN).toBe('auth-token');
      expect(STORAGE_KEYS.USER).toBe('user');
      expect(STORAGE_KEYS.SETTINGS).toBe('settings');
      expect(STORAGE_KEYS.ONBOARDING).toBe('onboarding-completed');
    });
  });
});
