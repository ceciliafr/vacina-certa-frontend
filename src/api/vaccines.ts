import api from "@/service/config";

type Vaccine = {
  id: number;
  dose: string;
  description: string;
  manufacturer: string;
  vaccinationDate: string;
  completedName: string;
  popularName: string;
  age: number;
  year: number;
  required: boolean;
};

export const getVaccines = async (): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>("/get-vaccines");
  return data;
};

export const getTakenVaccined = async (): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>("/get-taken-vaccines");
  return data;
};

export const registerVaccine = async (): Promise<{ created: boolean }> => {
  const { data } = await api.post<{ created: boolean }>("/get-vaccines", {
    // vaccineId,
    // date,
    // userId,
  });
  return data;
};
