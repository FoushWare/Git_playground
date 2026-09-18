export const StorageKeys = {
  USER_PREFERENCES: 'user_preferences',
  SESSION_DATA: 'session_data',
  CACHE_DATA: 'cache_data'
};

export function setItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}