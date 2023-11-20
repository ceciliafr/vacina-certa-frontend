"use client";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import Box from "@mui/material/Box";
import { VaccineCard } from "@/components/desktop/Vaccines/VaccineCard";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { pendingVaccinesData } from "@/utils/pending-vaccines";
import { Vaccines } from "@/components/desktop/Vaccines";

export default function PendingVaccines() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <div className={styles.vaccines_content}>
            <Title title="Essas são as vacinas que você ainda não tomou:" />
            <Vaccines vaccines={pendingVaccinesData} variant="pending" />
          </div>
        </div>
      </RightContent>
    </Layout>
  );
}
