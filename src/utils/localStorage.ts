import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

export const setLocalStorageItem = (
  key: keyof typeof LOCAL_STORAGE_KEYS,
  value: string,
) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS[key], value);
};

export const getLocalStorageItem = (key: keyof typeof LOCAL_STORAGE_KEYS) => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
  return item ?? null;
};
