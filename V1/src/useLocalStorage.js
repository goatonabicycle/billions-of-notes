import { useState } from "react";

export function useStorage(key, initialValue) {
  // Get from local storage then
  // parse stored json or if none return initialValue
  const readValue = () => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (valueOrFunc) => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === "undefined") {
      console.warn(
        `${key} could not be stored as localStorage is not available in this environment`
      );
      setStoredValue(valueOrFunc);
      return;
    }

    setStoredValue((currentValue) => {
      let newValue;

      if (typeof valueOrFunc === "function") {
        newValue = valueOrFunc(currentValue);
      } else {
        newValue = valueOrFunc;
      }

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      return newValue;
    });
  };

  return [storedValue, setValue];
}
