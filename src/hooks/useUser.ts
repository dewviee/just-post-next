import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { TGetUserProfileResponse, TUserProfile } from "@/types/user.type";
import { handleApiRequest } from "@/utils/api";
import { formatUserProfileResponse, getUserAccessToken } from "@/utils/user";

export function useUser() {
  const getUserProfileFromAccessToken = async (
    onSuccess: (user: TUserProfile) => void,
    onError?: () => void,
    controller?: AbortController,
  ) => {
    const accessToken = getUserAccessToken();
    const request = api.get(pathJustPostV1.user.getUserProfile, {
      headers: { Authorization: accessToken },
      signal: controller?.signal,
    });
    const { result, error } = await handleApiRequest(request);

    if (error) {
      onError?.();
      return;
    }

    const response = result?.data as TGetUserProfileResponse;
    const userProfile: TUserProfile = formatUserProfileResponse(response);

    onSuccess(userProfile);
  };

  const updateUserProfile = async (
    user: TUserProfile,
    onSuccess: () => void,
    onError?: (error?: unknown) => void,
    controller?: AbortController,
  ) => {
    const accessToken = getUserAccessToken();
    const request = api.put(pathJustPostV1.user.updateUserProfile, user, {
      headers: { Authorization: accessToken },
      signal: controller?.signal,
    });
    const { error } = await handleApiRequest(request);

    if (error) {
      onError?.(error);
      return;
    }

    onSuccess();
  };

  return { getUserProfileFromAccessToken, updateUserProfile };
}
