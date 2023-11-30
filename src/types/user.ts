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