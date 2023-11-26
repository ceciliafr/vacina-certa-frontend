"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { Vaccines } from "@/components/Vaccines";
import { allVaccinesData } from "@/mocks/all-vaccines";
import { getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";

export default function AllVaccines() {
  const { data } = useQuery({
    queryFn: getVaccines,
    queryKey: ["allVaccines"],
  });

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
