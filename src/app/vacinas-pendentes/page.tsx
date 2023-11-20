"use client";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { pendingVaccinesData } from "@/mocks/pending-vaccines";
import { Vaccines } from "@/components/Vaccines";

export default function PendingVaccines() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Vacinas que você ainda não tomou:" />
        <Vaccines vaccines={pendingVaccinesData} variant="pending" />
      </RightContent>
    </Layout>
  );
}
