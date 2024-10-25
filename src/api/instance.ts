import axios from "axios";
import { errorInterceptor } from "./error.interceptor";
import { CONST_API_TIMEOUT_ERR_MSG as API_TIMEOUT_ERR_MSG } from "@/constants/message";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api`,
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: API_TIMEOUT_ERR_MSG,
});

api.interceptors.response.use((response) => response, errorInterceptor);

export default api;
