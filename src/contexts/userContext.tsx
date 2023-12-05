"use client";
import { parseJwt } from "@/utils";
import { createContext, useEffect, useState } from "react";

export type User = {
  userId: string | null;
  sub: string | null;
  exp: number | null;
};

export type UserContextProps = {
  user: User;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
};

const initialState = {
  user: {
    userId: null,
    sub: null,
    exp: null,
  },
  token: null,
  setUser: (user: User) => {},
  setToken: (token: string) => {},
};

export const UserContext = createContext<UserContextProps>(initialState);

export const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      const userInfo = parseJwt(token);
      localStorage.setItem("user", JSON.stringify(userInfo));

      setUser(userInfo);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
