import api from "@/api/instance";
import { pathJustPostV1 } from "@/api/path";
import {
  CONST_CONFIRM_PASSWORD_ERROR_MSG,
  CONST_REGISTER_ERROR_MSG,
  CONST_REGISTER_SUCCESS_MSG,
} from "@/constants/message";
import { TApiError, TOnApiError } from "@/types/api.type";
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
} from "@/types/auth.type";
import { handleApiRequest } from "@/utils/api";
import { setLocalStorageItem } from "@/utils/localStorage";
import { getFieldName } from "@/utils/typeUtils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

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

  const handleSetIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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

type TRegisterForm = TRegisterRequest & { confirmPassword: string };

export const useRegister = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState<TRegisterForm>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onRegisterError: TOnApiError = (error) => {
    if (error?.message) {
      let errorMsg: string;
      if (Array.isArray(error?.message))
        errorMsg = `${CONST_REGISTER_ERROR_MSG} ${error.message.join(", ")}`;
      else errorMsg = error?.message;
      toast.error(errorMsg);
    }
  };

  const handleCheckPasswordMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleCheckPasswordMatch()) {
      toast.error(CONST_CONFIRM_PASSWORD_ERROR_MSG);
      return;
    }
    register();
  };

  const register = async () => {
    const payload: TRegisterRequest = { ...formData };

    const { error } = await handleApiRequest(
      api.post(pathJustPostV1.auth.register, payload),
      setIsFetching,
    );

    if ((error as TApiError)?.message) {
      onRegisterError(error as TApiError);
      return;
    }
    if (error) {
      console.error(error);
      return;
    }

    toast.success(CONST_REGISTER_SUCCESS_MSG);
    router.push("login");
  };

  return {
    formData,
    isFetching,
    handleFormDataChange,
    getFormDataName: getFieldName<TRegisterForm>,
    handleSubmit,
  };
};
