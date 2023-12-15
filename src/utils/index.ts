import moment from "moment";

export const getDocumentMask = (documentType: string): string => {
  if (documentType) {
    if (documentType === "CPF") {
      return "999.999.999-99";
    } else {
      return "aa999999";
    }
  }
  return "";
};

export const getDocumentLabel = (documentType: string): string => {
  if (documentType) {
    if (documentType === "CPF") {
      return "Ex.: 123.456.789-00";
    } else {
      return "Ex.: AB123456";
    }
  }
  return "Digite seu documento";
};

export const formatDate = (date: string): string => {
  const originalDate = new Date(date);

  const year = originalDate.getUTCFullYear();
  const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const formatDateToPtBr = (date: string): string => {
  return moment(date).format("DD/MM/YYYY");
};

export const getFirstName = (name: string): string => {
  const namesArray = name.split(" ");
  return namesArray[0];
};

export const getLastNames = (name: string): string => {
  const namesArray = name.split(" ");
  return namesArray.slice(1).join(" ");
};

export const removeSpecialCharacters = (characters: string) => {
  return characters.replace(/[^a-z0-9]/gi, "");
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
