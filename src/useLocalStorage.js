import { useState } from "react";

export function useStorage(key, initialValue) {
  console.log("useStorage called");
  console.log("key: ", key);
  // Get from local storage then
  // parse stored json or if none return initialValue
  const readValue = () => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value) => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === "undefined") {
      console.warn(
        `${key} could not be stored as localStorage is not available in this environment`
      );
      setStoredValue(value);
      return;
    }

    let newValue;

    // Allow value to be a function so we have same API as useState
    if (typeof value === "function") {
      newValue = value(storedValue);
      setStoredValue(newValue);
    } else {
      newValue = value;
      setStoredValue(value);
    }

    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, setValue];
}
