"use client";
import { UserProfile } from "@/types/user";
import { parseJwt } from "@/utils";
import { createContext, useEffect, useState } from "react";

export type User = {
  userId: string | null;
  sub: string | null;
  exp: number | null;
};

export type UserContextProps = {
  user: User;
  userProfile: UserProfile;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  resetUserProfile: () => void;
  setUserProfile: (userProfile: UserProfile) => void;
};

const initialState = {
  user: {
    userId: null,
    sub: null,
    exp: null,
  },
  userProfile: {
    id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    document: "",
    documentType: "",
    createdAt: "",
    updatedAt: "",
    phone: "",
    nickname: "",
  },
  token: null,
  setUser: (user: User) => {},
  setToken: (token: string) => {},
  resetUserProfile: () => {},
  setUserProfile: (userProfile: UserProfile) => {},
};

export const UserContext = createContext<UserContextProps>(initialState);

export const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [userProfile, setUserProfile] = useState<UserProfile>(
    JSON.parse(localStorage.getItem("userProfile") || "{}")
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

  const resetUserProfile = () => {
    localStorage.clear();
    setToken(null);
    setUser({} as User);
    setUserProfile({} as UserProfile);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userProfile,
        token,
        setUser,
        setToken,
        resetUserProfile,
        setUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
