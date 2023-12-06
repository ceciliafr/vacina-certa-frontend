import api from "@/service/config";
import { LoginUser, RegisterUser, UserProfile } from "@/types/user";
import axios, { AxiosResponse } from "axios";
// import { useContext } from "react";

export const userLogin = async (user: LoginUser): Promise<string> => {
  const { data } = await axios.post<string>(
    "https://summer-catfish-296915.uc.r.appspot.com/login",
    user
  );

  return data;
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

export const updateUser = async (
  url: string,
  user: {},
  token: string | null
): Promise<{}> => {
  const { data } = await api.post(url, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getUser = async (
  url: string,
  token: string | null
): Promise<UserProfile> => {
  const { data } = await axios.get<UserProfile>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};