import { takenVaccinesData } from "@/mocks/taken-vaccines";
import api from "@/service/config";
import { Vaccine } from "@/types/vaccines";

export const getVaccines = async (): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>("/get-vaccines");
  return data;
};

export const getTakenVaccines = async (): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>("/get-taken-vaccines");
  return takenVaccinesData;
};

export const registerVaccine = async (): Promise<{ created: boolean }> => {
  const { data } = await api.post<{ created: boolean }>("/get-vaccines", {
    // vaccineId,
    // date,
    // userId,
  });
  return data;
};
