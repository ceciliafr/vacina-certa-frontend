import api from "@/service/config";
import { HOST } from "@/constants";
import { Vaccine } from "@/types/vaccines";

export const getVaccines = async (url: string, token: string | null) => {
  const { data } = await api.get<Vaccine[]>(`${HOST}/vaccine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getTakenVaccines = async (
  url: string,
  token: string | null
): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
