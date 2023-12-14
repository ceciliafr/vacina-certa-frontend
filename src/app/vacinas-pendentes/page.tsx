"use client";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { getTakenVaccines, getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { UserContext } from "@/contexts/userContext";
import { HOST } from "@/constants";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { VaccineCard } from "@/components/VaccineCard";
import Grid from "@mui/material/Grid";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function PendingVaccines() {
  const router = useRouter();

  const { user, token } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const {
    data: allVaccines,
    isLoading: isAllVaccinesLoading,
    isFetching: isAllVaccinesFetching,
  } = useQuery({
    queryFn: async () => {
      return getVaccines(`${HOST}/vaccine`, token);
    },
    queryKey: ["allVaccines"],
  });

  const {
    data: takenVaccines,
    isLoading: isTakenVaccinesLoading,
    isFetching: isTakenVaccinesFetching,
  } = useQuery({
    queryFn: async () =>
      getTakenVaccines(`${HOST}/user/${user?.userId}/vaccines`, token),
    queryKey: ["takenVaccines"],
  });

  const pendingVaccines = useMemo(() => {
    if (takenVaccines && allVaccines) {
      const setTakenVaccinesData = new Set(
        takenVaccines.map((item) => item.vaccineViewModel["id"])
      );

      return allVaccines.filter(
        (item) => !setTakenVaccinesData.has(item["id"])
      );
    }
    return [];
  }, [takenVaccines, allVaccines]);

  const showLoading =
    isAllVaccinesLoading ||
    isTakenVaccinesLoading ||
    isTakenVaccinesFetching ||
    isAllVaccinesFetching;

  return (
    token && (
      <Layout>
        <DesktopMenu />
        <RightContent>
          {pendingVaccines?.length ? (
            <>
              <Title title="Vacinas que você ainda não tomou" />
              <Box display="flex" flexDirection="column" gap={4}>
                {pendingVaccines.map((vaccine) => (
                  <VaccineCard
                    key={vaccine.id}
                    id={vaccine.id}
                    dosage={vaccine.dosage}
                    popularName={vaccine.popularName}
                    description={vaccine.description}
                    manufacturer={vaccine.manufacturer}
                    fullName={vaccine.fullName}
                    age={vaccine.age}
                    year={vaccine.year}
                    required={vaccine.required}
                    variant="pending"
                  />
                ))}
              </Box>
            </>
          ) : (
            <>
              {showLoading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={showLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <>
                  <Title title="Muito bem! Parece que você já tomou todas as vacinas necessárias" />
                  <Grid
                    container
                    columns={{ xs: 1, sm: 8, md: 8 }}
                    columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    className={styles.empty_page_container}
                  >
                    <Grid item xs={1} sm={2.5} md={2.5}>
                      <div className={styles.image_container}>
                        <Image
                          priority
                          src="/checked.png"
                          fill
                          style={{
                            objectFit: "contain",
                          }}
                          alt="empty_vaccine_image"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={1} sm={3} md={3}>
                      <Box className={styles.empty_text_container}>
                        <h3 className={styles.text}>
                          Quando novas vacinas ficarem pendentes elas ficarão
                          nesta página, você pode voltar sempre que quiser para
                          verificar.
                        </h3>

                        <Button
                          className={styles.button}
                          variant="contained"
                          fullWidth
                          onClick={() => router.push("/")}
                        >
                          <span>Voltar para o cartão de vacinas</span>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          )}
        </RightContent>
      </Layout>
    )
  );
}
