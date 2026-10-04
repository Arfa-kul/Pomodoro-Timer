import { useState, useEffect, useCallback } from 'react';

/**
 * Generic localStorage hook with JSON serialization.
 * Optionally resets the value each new day if `resetDaily` is true.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  resetDaily = false
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;

      if (resetDaily) {
        const dateKey = `${key}_date`;
        const savedDate = localStorage.getItem(dateKey);
        const today = new Date().toISOString().split('T')[0];
        if (savedDate !== today) {
          localStorage.setItem(dateKey, today);
          localStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      }

      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
          if (resetDaily) {
            const dateKey = `${key}_date`;
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem(dateKey, today);
          }
        } catch {
          // localStorage full — fail silently
        }
        return newValue;
      });
    },
    [key, resetDaily]
  );

  return [storedValue, setValue];
}
