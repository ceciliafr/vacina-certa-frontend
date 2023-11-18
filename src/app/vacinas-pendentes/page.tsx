"use client";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import Box from "@mui/material/Box";
import { VaccineCard } from "@/components/desktop/VaccineCard";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";

export default function pendingVaccines() {
  const MY_VACCINES = [
    {
      id: 1,
      dose: "REFORÇO",
      description:
        "Previne as formas graves de tuberculose, principalmente miliar e meníngea",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: "BCG",
    },
    {
      id: 2,
      dose: "REFORÇO",
      description: "Previne a hepatite do tipo B",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: " Hepatite B",
    },
    {
      id: 3,
      dose: "REFORÇO",
      description:
        "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: "Pentavalente (DTP/HB/Hib)",
    },
    {
      id: 7,
      dose: "REFORÇO",
      description: "Previne a doença meningocócica C",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: "Pneumo 10",
    },
    {
      id: 8,
      dose: "REFORÇO",
      description:
        "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por Haemóphilus influenza e tipo B",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: " Meningo C",
    },
    {
      id: 120,
      dose: "REFORÇO",
      description:
        "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
      producer: "Fiocrus",
      vaccinationDate: "03/09/2023",
      name: " Pneumocócica 23-valente (Pneumo 23)",
    },
  ];

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <div className={styles.vaccines_content}>
            <Title>Essas são as vacinas que você ainda não tomou:</Title>
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              className={styles.vaccines_box}
            >
              {MY_VACCINES.map((vaccine) => (
                <VaccineCard
                  key={vaccine.id}
                  id={vaccine.id}
                  name={vaccine.name}
                  dose={vaccine.dose}
                  description={vaccine.description}
                  producer={vaccine.producer}
                  vaccinationDate={vaccine.vaccinationDate}
                  isPending
                />
              ))}
            </Box>
          </div>
        </div>
      </RightContent>
    </Layout>
  );
}
