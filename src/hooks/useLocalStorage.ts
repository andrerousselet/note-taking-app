import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T | (() => T)) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue) return JSON.parse(jsonValue);
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue(key, initialValue);
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}