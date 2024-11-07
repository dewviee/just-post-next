import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { getLocalStorageItem } from "./localStorage";

export function getUserAccessToken() {
  return `Bearer ${getLocalStorageItem("ACCESS_TOKEN")}`;
}

export function removeUserAccessToken() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}
