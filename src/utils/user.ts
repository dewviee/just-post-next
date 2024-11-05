import { getLocalStorageItem } from "./localStorage";

export function getUserAccessToken() {
  return `Bearer ${getLocalStorageItem("ACCESS_TOKEN")}`;
}
