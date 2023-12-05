import { useContext } from "react";
import api from "@/service/config";
import { HOST } from "@/constants";
import { Vaccine } from "@/types/vaccines";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/contexts/userContext";

export const useVaccines = () => {
  const { user, token } = useContext(UserContext);

  const request = async (): Promise<Vaccine[]> => {
    const { data } = await api.get<Vaccine[]>(
      `${HOST}/user/${user?.userId}/vaccines`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  };

  return useQuery({
    queryFn: request,
    queryKey: ["takenVaccines"],
  });
};
