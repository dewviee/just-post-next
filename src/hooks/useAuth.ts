import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import { TApiError } from "@/types/api.type";
import { TLoginRequest, TLoginResponse } from "@/types/auth.type";
import { handleApiRequest } from "@/utils/api";
import { setLocalStorageItem } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const login = async (onError?: (error: TApiError) => void) => {
    const payload: TLoginRequest = {
      identifier: identifier,
      password: password,
    };

    const { result, error } = await handleApiRequest(
      api.post(pathJustPostV1.auth.login, payload),
      setIsFetching,
    );

    if (onError && (error as TApiError)?.message) {
      onError(error as TApiError);
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    const accessToken = (result?.data as TLoginResponse).accessToken;
    setLocalStorageItem("ACCESS_TOKEN", accessToken);
    router.push("/");
  };

  const handleSetIdentifier = (newIdentifier: string) => {
    setIdentifier(newIdentifier);
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  return {
    identifier,
    password,
    isFetching,
    setIsFetching,
    login,
    handleSetIdentifier,
    handleSetPassword,
  };
};
