import { takenVaccinesData } from "@/mocks/taken-vaccines";
import api from "@/service/config";
import { JWT, UserInfo } from "@/types/user";
import { Vaccine } from "@/types/vaccines";
import { parseJwt } from "@/utils";

const HOST = "https://core-dot-summer-catfish-296915.uc.r.appspot.com";

const userInfo: UserInfo = parseJwt(JWT);

console.log(userInfo);

export const getVaccines = async () => {
  const { data } = await api.get<Vaccine[]>(`${HOST}/vaccine`);

  console.log(data);
  return data;
};

export const getTakenVaccines = async (): Promise<Vaccine[]> => {
  const { data } = await api.get<Vaccine[]>(
    `${HOST}/user/${userInfo.userId}/vaccines`
  );

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
