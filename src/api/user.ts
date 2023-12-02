import api from "@/service/config";
import { LoginUser, RegisterUser } from "@/types/user";
import axios, { AxiosResponse } from "axios";
// import { useContext } from "react";

export const userLogin = async (user: LoginUser): Promise<string> => {
  const { data } = await axios.post<AxiosResponse<string>>(
    "https://summer-catfish-296915.uc.r.appspot.com/login",
    user
  );

  return data.data;
};

export const userRegister = async (
  user: RegisterUser
): Promise<AxiosResponse> => {
  const { data } = await axios.post<AxiosResponse>(
    "https://summer-catfish-296915.uc.r.appspot.com/login/register",

    user
  );

  return data;
};

export const updateUser = async (): Promise<{}> => {
  //   const { id } = useContext(UserContext);

  const { data } = await api.post("/user/login", {
    // id,
    // firstName,
    // lastName,
    // phone,
  });
  return data;
};
