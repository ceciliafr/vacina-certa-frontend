import api from "@/service/config";
import { HOST } from "@/constants";
import { Vaccine } from "@/types/vaccines";
import { AxiosResponse } from "axios";

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

[
  {
    vaccineDTO: {
      id: "ff8080818c256abf018c256accc50000",
    },
    appliedAt: "2020-05-05",
  },
  {
    vaccineDTO: {
      id: "ff8080818c256abf018c256aef950001",
    },
    appliedAt: "2020-10-01",
  },
];

type CreateVaccination = {
  vaccineDTO: {
    id: string;
  };
  appliedAt: string;
};

export const registerVaccine = async (
  url: string,
  token: string | null,
  vaccines: CreateVaccination[]
): Promise<{}> => {
  const { data } = await api.post<AxiosResponse>(url, vaccines, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
  return data;
};
