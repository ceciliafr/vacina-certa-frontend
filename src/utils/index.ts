export const getDocumentMask = (documentType: string): string => {
  if (documentType) {
    if (documentType === "CPF") {
      return "999.999.999-99";
    } else {
      return "aaaaaaaaa";
    }
  }
  return "";
};

export const formatDate = (date: string): string => {
  const originalDate = new Date(date);

  const year = originalDate.getUTCFullYear();
  const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const getFirstName = (name: string): string => {
  const namesArray = name.split(" ");
  return namesArray[0];
};

export const getLastNames = (name: string): string => {
  const namesArray = name.split(" ");
  return namesArray.slice(1).join(" ");
};
