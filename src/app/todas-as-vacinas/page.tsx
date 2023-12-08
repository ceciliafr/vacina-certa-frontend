"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";
import { HOST } from "@/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { VaccineCard } from "@/components/VaccineCard";
import { useRouter } from "next/navigation";

export default function AllVaccines() {
  const router = useRouter();

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

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
            <Box display="flex" flexDirection="column" gap={4}>
              {data.map((vaccine) => (
                <VaccineCard
                  key={vaccine.id}
                  id={vaccine.id}
                  popularName={vaccine.popularName}
                  description={vaccine.description}
                  manufacturer={vaccine.manufacturer}
                  fullName={vaccine.fullName}
                  age={vaccine.age}
                  year={vaccine.year}
                  required={vaccine.required}
                  variant="information"
                />
              ))}
            </Box>
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
