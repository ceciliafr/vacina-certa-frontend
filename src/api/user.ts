import { AUTH_HOST } from "@/constants";
import api from "@/service/config";
import { LoginUser, RegisterUser, UserProfile } from "@/types/user";
import axios, { AxiosResponse } from "axios";

export const userLogin = async (user: LoginUser): Promise<string> => {
  const { data } = await axios.post<string>(`${AUTH_HOST}/login`, user);

  return data;
};

export const userRegister = async (
  user: RegisterUser
): Promise<AxiosResponse> => {
  const { data } = await axios.post<AxiosResponse>(
    `${AUTH_HOST}/login/register`,
    user
  );

  return data;
};

export const updateUser = async (
  url: string,
  user: Omit<UserProfile, "id">,
  token: string | null
): Promise<UserProfile> => {
  const { data } = await api.put<UserProfile>(url, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updatePassword = async (
  userId: string | null | undefined,
  password: {
    actualPassword: string;
    newPassword: string;
  }
): Promise<AxiosResponse> => {
  const { data } = await api.put<AxiosResponse>(
    `${AUTH_HOST}/login/update-password/${userId}`,
    password
  );

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
