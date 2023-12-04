import Box from "@mui/material/Box";
import { VaccineCard } from "./VaccineCard";
import { Vaccine, VaccineStatus } from "@/types/vaccines";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export const Vaccines: React.FC<{
  vaccines: Vaccine[];
  variant: VaccineStatus;
}> = ({ vaccines, variant }) => {
  const router = useRouter();

  return (
    <>
      {vaccines.length ? (
        <Box display="flex" flexDirection="column" gap={4}>
          {vaccines.map((vaccine) => (
            <VaccineCard
              key={vaccine.id}
              id={vaccine.id}
              popularName={vaccine?.popularName}
              dose={vaccine.dose}
              description={vaccine.description}
              manufacturer={vaccine?.manufacturer}
              vaccinationDate={vaccine.vaccinationDate}
              variant={variant}
            />
          ))}
        </Box>
      ) : (
        <Grid
          container
          columns={{ xs: 1, sm: 8, md: 8 }}
          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          className={styles.empty_page_container}
        >
          <Grid item xs={1} sm={2.5} md={2.5}>
            <div className={styles.image_container}>
              <Image
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
                Parece que você não tem nenhuma vacina registada ainda, que tal
                cadastrar uma agora?
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
      )}
    </>
  );
};
