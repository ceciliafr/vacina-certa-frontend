"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { takenVaccinesData } from "@/mocks/taken-vaccines";
import { Vaccines } from "@/components/Vaccines";
import { useQuery } from "@tanstack/react-query";
import { getTakenVaccines } from "@/api/vaccines";

export default function MyCard() {
  const { data } = useQuery({
    queryFn: getTakenVaccines,
    queryKey: ["takenVaccines"],
  });

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title={data?.length ? "Vacinas que você já tomou" : "Ops!"} />
        <Vaccines vaccines={data} variant="completed" />
      </RightContent>
    </Layout>
  );
}
