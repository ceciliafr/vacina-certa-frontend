"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import { Form } from "@/components/Form";

export default function MyProfile() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title
          title="Área de dados pessoais:"
          subtitle="Você pode alterar seus dados a qualquer momento"
        />
        <Form />
      </RightContent>
    </Layout>
  );
}
