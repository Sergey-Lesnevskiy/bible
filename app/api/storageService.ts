import { Platform } from 'react-native';

interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

class WebStorage implements IStorage {
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}

class NativeStorage implements IStorage {
  private AsyncStorage: any;

  constructor() {
    this.AsyncStorage =
      require('@react-native-async-storage/async-storage').default;
  }

  async getItem(key: string): Promise<string | null> {
    return await this.AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.AsyncStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await this.AsyncStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.AsyncStorage.clear();
  }
}

export class StorageService {
  private storage: IStorage;

  constructor() {
    this.storage =
      Platform.OS === 'web' ? new WebStorage() : new NativeStorage();
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await this.storage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.storage.setItem(key, serializedValue);
    } catch (error) {
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (error) {
      throw error;
    }
  }

  async hasItem(key: string): Promise<boolean> {
    const value = await this.storage.getItem(key);
    return value !== null;
  }
}
