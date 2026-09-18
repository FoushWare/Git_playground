export function useLocalStorage<T>(key: string, initialValue: T) {
  const item = localStorage.getItem(key);
  const storedValue = item ? JSON.parse(item) : initialValue;
  
  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue] as const;
}