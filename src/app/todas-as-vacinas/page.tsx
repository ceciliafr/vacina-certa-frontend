"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { Vaccines } from "@/components/desktop/Vaccines";
import { allVaccinesData } from "@/utils/all-vaccines";

export default function AllVaccines() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Vacinas que você já tomou:" />
        <Vaccines vaccines={allVaccinesData} variant="information" />
      </RightContent>
    </Layout>
  );
}
