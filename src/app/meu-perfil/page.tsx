"use client";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Layout } from "@/components/Layout";
import Box from "@mui/material/Box";
import { EditableLabel } from "@/components/Input";
import { RightContent } from "@/components/Layout/RightContent";
import Grid from "@mui/material/Grid";

export default function MyProfile() {
  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <DesktopNavbar name={"Cecília Fernandes de Oliveira"} />
        <div className={styles.content}>
          <Title
            title="Área de dados pessoais:"
            subtitle="Você pode alterar
              seus dados a qualquer momento"
          />

          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            gap="5rem"
            marginTop={4}
          >
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              width="100%"
            >
              <div className={styles.user_info_container}>
                <Grid
                  container
                  rowSpacing="4rem"
                  columnSpacing={{ xs: 1, sm: 3, md: 12 }}
                  columns={8}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    <EditableLabel
                      lableName="CPF"
                      labelValue="114.255.916-55"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <EditableLabel
                      lableName="Data de Nascimento"
                      labelValue="15/06/2000"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <EditableLabel
                      lableName="Nome completo"
                      labelValue="Cecília Fernandes de Oliveira"
                      isEditable
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <EditableLabel
                      lableName="Telefole"
                      labelValue="+55 (31) 99285-0842"
                      isEditable
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <EditableLabel
                      lableName="Como gostaria que chamassemos você"
                      labelValue="Cissa"
                      isEditable
                    />
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Box>
        </div>
      </RightContent>
    </Layout>
  );
}
