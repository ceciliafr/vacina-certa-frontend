import axios from "axios";
import { JWT } from "@/types/user";
import { useEffect, useState } from "react";

const api = axios.create();

const AxiosInterceptor = ({ children }: { children: any }) => {
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    setIsSet(true);

    api.interceptors.request.use(async (req) => {
      if (req.headers) {
        req.headers.Authorization = `Bearer ${JWT}`;
      }
      return req;
    });

    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
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
