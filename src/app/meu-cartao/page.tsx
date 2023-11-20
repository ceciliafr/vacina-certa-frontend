"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { takenVaccinesTaken } from "@/utils/taken-vaccines";
import { Vaccines } from "@/components/desktop/Vaccines";

export default function MyCard() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Vacinas que você já tomou:" />
        <Vaccines vaccines={takenVaccinesTaken} variant="completed" />
      </RightContent>
    </Layout>
  );
}
