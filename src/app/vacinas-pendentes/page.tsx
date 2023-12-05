"use client";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { Vaccines } from "@/components/Vaccines";
import { getTakenVaccines, getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { UserContext } from "@/contexts/userContext";
import { HOST } from "@/constants";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function PendingVaccines() {
  const { user, token } = useContext(UserContext);

  const { data: allVaccines, isLoading: isAllVaccinesLoading } = useQuery({
    queryFn: async () => {
      return getVaccines(`${HOST}/vaccine`, token);
    },
    queryKey: ["allVaccines"],
  });

  const { data: takenVaccines, isLoading: isTakenVaccinesLoading } = useQuery({
    queryFn: async () =>
      getTakenVaccines(`${HOST}/user/${user?.userId}/vaccines`, token),
    queryKey: ["takenVaccines"],
  });

  const pendingVaccines = useMemo(() => {
    if (takenVaccines && allVaccines) {
      const setTakenVaccinesData = new Set(
        takenVaccines.map((item) => item["id"])
      );

      return allVaccines.filter(
        (item) => !setTakenVaccinesData.has(item["id"])
      );
    }
    return [];
  }, [takenVaccines, allVaccines]);

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        {pendingVaccines?.length ? (
          <>
            <Title title="Vacinas que você ainda não tomou" />
            <Vaccines vaccines={pendingVaccines} variant="pending" />
          </>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isAllVaccinesLoading || isTakenVaccinesLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </RightContent>
    </Layout>
  );
}
