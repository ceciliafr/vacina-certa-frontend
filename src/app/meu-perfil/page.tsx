"use client";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Layout } from "@/components/Layout";
import Box from "@mui/material/Box";
import { EditableLabel } from "@/components/Input";

export default function MyProfile() {
  return (
    <Layout>
      <DesktopMenu />
      <div className={styles.content}>
        <div className={styles.right_content}>
          <Box>
            <Title
              title=" Olá, Cissa! Essa é sua área de dados pessoais"
              subtitle="você pode alterar
              seus dados a qualquer momento"
            />
          </Box>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            gap="5rem"
            marginTop="6rem"
          >
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              width="100%"
            >
              <div className={styles.user_info_container}>
                <EditableLabel lableName="CPF" labelValue="114.255.916-55" />
                <EditableLabel
                  lableName="Data de Nascimento"
                  labelValue="15/06/2000"
                />
                <EditableLabel
                  lableName="Seu Nome"
                  labelValue="Cecília Fernandes de Oliveira"
                  isEditable
                />

                <EditableLabel
                  lableName="Telefole"
                  labelValue="+55 (31) 99285-0842"
                  isEditable
                />
                <div className={styles.personal_data}>
                  <EditableLabel
                    lableName="Como gostaria que chamassemos você"
                    labelValue="Cissa"
                    isEditable
                  />
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </Layout>
  );
}
