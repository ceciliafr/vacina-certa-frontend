"use client";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import { Title } from "@/components/Title";
import { VaccineCard } from "@/components/desktop/VaccineCard";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Menu } from "@/components/Menu";
import { MobileNavbar } from "@/components/Navbar";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";

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
    id: 4,
    dose: "REFORÇO",
    description: "Previne poliomielite ou paralisia infantil",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Pólio inativada",
  },
  {
    id: 5,
    dose: "REFORÇO",
    description:
      "Previne pneumonia, otite, meningite e outras doenças causadas pelo Pneumococo",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Pólio oral",
  },
  {
    id: 6,
    dose: "REFORÇO",
    description: "Previne diarreia por rotavírus",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Rotavírus",
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
    id: 9,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Febre amarela",
  },
  {
    id: 10,
    dose: "REFORÇO",
    description: "Previne a poliomielite ou paralisia infantil",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Tríplice viral (sarampo, caxumba e rubéola)",
  },
  {
    id: 11,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Tetra viral (sarampo, caxumba, rubéola e varicela)",
  },
  {
    id: 12,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " DTP",
  },
  {
    id: 13,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Hepatite A",
  },
  {
    id: 14,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Varicela",
  },
  {
    id: 15,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Difteria e tétano adulto (dT)",
  },
  {
    id: 16,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Meningocócica ACWY",
  },
  {
    id: 17,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " HPV quadrivalente",
  },
  {
    id: 18,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " dTpa",
  },
  {
    id: 19,
    dose: "REFORÇO",
    description:
      "Previne difteria, tétano, coqueluche, hepatite B e meningite e infecções por HiB",
    producer: "Fiocrus",
    vaccinationDate: "03/09/2023",
    name: " Influenza (ofertada durante Campanha anual)",
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

export default function myCard() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <div className={styles.vaccines_content}>
            <Title>Essas são as vacinas que você já tomou:</Title>
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
                />
              ))}
            </Box>
          </div>
        </div>
      </RightContent>
    </Layout>
  );
}
