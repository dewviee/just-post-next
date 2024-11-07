import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { EAuthErrCode } from "@/enums/auth";
import type { TApiError } from "@/types/api.type";
import type { RefreshAccessTokenResponse } from "@/types/auth.type";
import { removeUserAccessToken } from "@/utils/user";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import api from "./instance";
import { pathJustPostV1 } from "./path";

export async function errorInterceptor(err: unknown) {
  const axiosErr = err as AxiosError;
  const response = axiosErr.response?.data as TApiError;

  switch (response?.errorCode) {
    case EAuthErrCode.ACCESS_TOKEN_EXPIRED: {
      const accessToken = await refreshAccessToken();
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

      const config = axiosErr.config as AxiosRequestConfig;
      return resolveWithNewToken(accessToken, config, axiosErr);
    }

    case EAuthErrCode.TOKEN_INVALID:
    case EAuthErrCode.ACCESS_TOKEN_INVALID:
    case EAuthErrCode.REFRESH_TOKEN_REVOKE:
    case EAuthErrCode.ACCESS_TOKEN_REVOKE:
    case EAuthErrCode.REFRESH_TOKEN_INVALID: {
      toast("Session Expired. Please login again.");
      removeUserAccessToken();
      window.location.href = "/login";
      break;
    }
  }

  return Promise.reject(err);
}

async function refreshAccessToken() {
  const result = await api.post(
    pathJustPostV1.auth.refreshAccessToken,
    {},
    { withCredentials: true },
  );
  const resPayload = result.data as RefreshAccessTokenResponse;

  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, resPayload.data.token);

  return resPayload.data.token;
}

async function resolveWithNewToken(
  accessToken: string,
  config: AxiosRequestConfig,
  err: AxiosError,
) {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else Promise.reject(err);

  return Promise.resolve(api.request(config));
}
