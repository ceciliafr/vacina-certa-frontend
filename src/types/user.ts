export type RegisterUser = {
  login: string;
  documentsType: string;
  password: string;
  roles: string[];
  usersViewModel: {
    firstName: string;
    nickname: string;
    lastName: string;
    dateOfBirth: string;
    document: string;
    documentType: string;
    phone: string;
  };
};

export type LoginUser = {
  login: string;
  documentsType: string;
  password: string;
};

export type UserInfo = {
  exp: number;
  sub: string;
  userId: string;
};

export const JWT =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMuMjQzLjQzNC0zNC9DUEYiLCJ1c2VySWQiOiJmZjgwODA4MThjMzcyZDYwMDE4YzM3MmUyNWZkMDAwMCIsImV4cCI6MTcwMTc0OTI5M30.--XbPZdpo-WQrZYd4ET993AL6te4vS5TqiKx9dUA3GpMwwKCSLAIgoSyuyu9aavBwZlegKBxQ0h_Q7lwM6KDRQ";
