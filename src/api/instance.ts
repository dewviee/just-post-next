import axios from "axios";
import { errorInterceptor } from "./error.interceptor";

const api = axios.create({
  baseURL: `${process.env.API_HOSTNAME}/api`,
  withCredentials: true,
});

api.interceptors.response.use((response) => response, errorInterceptor);

export default api;
