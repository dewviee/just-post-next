import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { TGetUserProfileResponse, TUserProfile } from "@/types/user.type";
import { convertDate } from "./date";
import { getLocalStorageItem } from "./localStorage";

export function getUserAccessToken() {
  return `Bearer ${getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`;
}

export function formatUserProfileResponse(response: TGetUserProfileResponse) {
  const user: TUserProfile = {
    id: response.data.id,
    username: response.data.username,
    email: response.data.email,
    createdAt: convertDate(response.data.createdAt),
    updatedAt: convertDate(response.data.updatedAt),
  };

  return user;
}

export function removeUserAccessToken() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}
