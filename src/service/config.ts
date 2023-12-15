"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { HTTP_STATUS } from "@/constants";

const api = axios.create();

const AxiosInterceptor = ({ children }: { children: any }) => {
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    setIsSet(true);

    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      const status = error.response?.status || error.status;

      if (
        status === HTTP_STATUS.INTERNAL_ERROR ||
        status === HTTP_STATUS.UNAUTHORIZED
      ) {
        window.location.pathname = "/login";
        return;
      }

      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);
  return isSet && children;
};

export default api;
export { AxiosInterceptor };
