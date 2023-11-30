import api from "@/service/config";
import { RegisterUser } from "@/types/user";
import axios from "axios";
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

export const userRegister = async (
  user: RegisterUser
): Promise<RegisterResponse> => {
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
  console.log("tô aqui ");
  const { data } = await axios.post<RegisterResponse>(
    "https://summer-catfish-296915.uc.r.appspot.com/login/register",
    {
      user,
    }
  );

  console.log(data);
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
