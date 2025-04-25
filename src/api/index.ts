import { ACCESS_TOKEN, getToken, hasToken } from "@/utils/auth";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_STAGING
    : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;

const service = axios.create({
  baseURL,

});

// Request Interceptor
service.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Ensure headers is an instance of AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (hasToken() && getToken() !== false) {
      config.headers.set("Authorization", `Bearer ${String(getToken())}`);
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data; 
  },

  async (error: AxiosError) => {
    const { response } = error;
    console.log("Axios", error);

    if (error?.response?.status == 401 || error?.status == 401) {
      // removeToken();
      Cookies.remove(ACCESS_TOKEN);
      console.log("Authentication Got here");
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      } else {
        redirect("/sign-in");
      }
    }

    if (!response) {
      return Promise.reject(error);
    } else {
      return Promise.reject(response);
    }
  }
);

export default service;
