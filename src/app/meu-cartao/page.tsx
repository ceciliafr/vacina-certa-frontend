"use client";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { takenVaccinesTaken } from "@/utils/taken-vaccines";
import { Vaccines } from "@/components/desktop/Vaccines";

export default function MyCard() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <div className={styles.vaccines_content}>
            <Title>Essas são as vacinas que você já tomou:</Title>
            <Vaccines vaccines={takenVaccinesTaken} variant="completed" />
          </div>
        </div>
      </RightContent>
    </Layout>
  );
}
