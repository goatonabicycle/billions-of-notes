import { useState } from "react";

export function useStorage(key, initialValue) {
  // Get from local storage then
  // parse stored json or if none return initialValue
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(() => readValue());

  const setValue = (value) => {
    if (typeof window === "undefined") {
      console.warn(
        `${key} could not be stored as localStorage is not available in this environment`
      );
      setStoredValue(value);
      return;
    }

    try {
      let newValue;

      if (typeof value === "function") {
        newValue = value(storedValue);
        setStoredValue(newValue);
      } else {
        newValue = value;
        setStoredValue(value);
      }

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}
