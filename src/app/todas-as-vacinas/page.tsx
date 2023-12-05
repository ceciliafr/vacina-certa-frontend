"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { Vaccines } from "@/components/Vaccines";
import { getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";
import { HOST } from "@/constants";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AllVaccines() {
  const { token } = useContext(UserContext);
  const url = `${HOST}/vaccine`;

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return getVaccines(url, token);
    },
    queryKey: ["allVaccines"],
  });

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        {data?.length ? (
          <>
            <Title title="Todas as vacinas" />
            <Vaccines vaccines={data} variant="information" />
          </>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </RightContent>
    </Layout>
  );
}
