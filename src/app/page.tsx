"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { useQuery } from "@tanstack/react-query";
import { HOST } from "@/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import { getTakenVaccines } from "@/api/vaccines";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import { VaccineCard } from "@/components/VaccineCard";

export default function MyCard() {
  const router = useRouter();

  const { user, token } = useContext(UserContext);
  const url = `${HOST}/user/${user?.userId}/vaccines`;

  const { data, isLoading } = useQuery({
    queryFn: async () => getTakenVaccines(url, token),
    queryKey: ["takenVaccines"],
  });

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  return (
    <Layout>
      <DesktopMenu />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <RightContent>
          {data?.length ? (
            <>
              <Title title="Vacinas que você já tomou" />
              <Box display="flex" flexDirection="column" gap={4}>
                {data.map((vaccine) => (
                  <VaccineCard
                    key={vaccine.vaccineViewModel.id}
                    id={vaccine.vaccineViewModel.id}
                    popularName={vaccine.vaccineViewModel.popularName}
                    description={vaccine.vaccineViewModel.description}
                    manufacturer={vaccine.vaccineViewModel.manufacturer}
                    fullName={vaccine.vaccineViewModel.fullName}
                    age={vaccine.vaccineViewModel.age}
                    year={vaccine.vaccineViewModel.year}
                    required={vaccine.vaccineViewModel.required}
                    variant="completed"
                  />
                ))}
              </Box>
            </>
          ) : (
            <>
              <Title title="Ops!" />
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
                      src="/no_vaccine.png"
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
                      Parece que você não tem nenhuma vacina registada ainda,
                      que tal cadastrar uma agora?
                    </h3>

                    <Button
                      className={styles.button}
                      variant="contained"
                      fullWidth
                      onClick={() => router.push("/registrar-vacinacao")}
                    >
                      <span>Faça seu primeiro cadastro</span>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </RightContent>
      )}
    </Layout>
  );
}
