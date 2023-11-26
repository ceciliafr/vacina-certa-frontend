"use client";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { allVaccinesData } from "@/mocks/all-vaccines";
import { takenVaccinesData } from "@/mocks/taken-vaccines";
import { Vaccines } from "@/components/Vaccines";
import { getTakenVaccines, getVaccines } from "@/api/vaccines";
import { useQuery } from "@tanstack/react-query";

export default function PendingVaccines() {
  const { data: allVaccines } = useQuery({
    queryFn: getVaccines,
    queryKey: ["allVaccines"],
  });

  const { data: takenVaccines } = useQuery({
    queryFn: getTakenVaccines,
    queryKey: ["takenVaccines"],
  });

  const getPendingVaccines = () => {
    const setTakenVaccinesData = new Set(
      takenVaccinesData.map((item) => item["id"])
    );

    return allVaccinesData.filter(
      (item) => !setTakenVaccinesData.has(item["id"])
    );
  };

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Vacinas que você ainda não tomou:" />
        <Vaccines vaccines={getPendingVaccines()} variant="pending" />
      </RightContent>
    </Layout>
  );
}
