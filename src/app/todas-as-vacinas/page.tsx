"use client";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { Vaccines } from "@/components/desktop/Vaccines";
import { allVaccinesData } from "@/utils/all-vaccines";

export default function AllVaccines() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <div className={styles.vaccines_content}>
            <Title title="Essas são as vacinas que você já tomou:" />
            <Vaccines vaccines={allVaccinesData} variant="information" />
          </div>
        </div>
      </RightContent>
    </Layout>
  );
}
