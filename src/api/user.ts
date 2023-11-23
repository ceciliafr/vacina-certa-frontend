import api from "@/service/config";
// import { useContext } from "react";

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  created: boolean;
};

export const userLogin = async (): Promise<LoginResponse> => {
  //   const { documentType, document, password } = useContext(UserContext);

  const { data } = await api.post<LoginResponse>("/user/login", {
    // documentType,
    // document,
    // password,
  });
  return data;
};

export const userRegister = async (): Promise<RegisterResponse> => {
  //   const {
  //     firstName,
  //     lastName,
  //     documentType,
  //     document,
  //     password,
  //     dateOfBirth,
  //     phone,
  //     nickName,
  //   } = useContext(UserContext);

  const { data } = await api.post<RegisterResponse>("/user/register", {
    // firstName,
    // lastName,
    // documentType,
    // document,
    // password,
    // dateOfBirth,
    // phone,
    // nickName,
  });
  return data;
};

export const updateUser = async (): Promise<{}> => {
  //   const { id } = useContext(UserContext);

  const { data } = await api.post<LoginResponse>("/user/login", {
    // id,
    // firstName,
    // lastName,
    // phone,
  });
  return data;
};
