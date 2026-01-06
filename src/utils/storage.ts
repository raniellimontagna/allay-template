import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Typed wrapper for AsyncStorage operations
 */
export const storage = {
  /**
   * Get a value from storage
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  },

  /**
   * Set a value in storage
   */
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Remove a value from storage
   */
  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get all keys in storage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch {
      return [];
    }
  },

  /**
   * Get multiple values at once
   */
  async getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.reduce(
        (result, [key, value]) => {
          result[key] = value ? (JSON.parse(value) as T) : null;
          return result;
        },
        {} as Record<string, T | null>
      );
    } catch {
      return {};
    }
  },
};

// Storage keys constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER: 'user',
  SETTINGS: 'settings',
  ONBOARDING: 'onboarding-completed',
} as const;
