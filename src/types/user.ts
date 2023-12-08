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

export type UserResponseFromLogin = {
  exp: number;
  sub: string;
  userId: string;
};

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  documentType: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  nickname: string;
};
