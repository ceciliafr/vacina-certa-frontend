"use client";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { DesktopNavbar } from "@/components/desktop/Navbar";
import { Layout } from "@/components/Layout";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { yellow } from "@mui/material/colors";

export default function MyProfile() {
  return (
    <Layout>
      <DesktopMenu />
      <div className={styles.content}>
        <div className={styles.right_content}>
          <Box>
            <Title>
              Bem-vindo(a) à sua área de dados pessoais, você pode alterar seus
              dados a qualquer momento:
            </Title>
          </Box>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            gap="5rem"
            marginTop="6rem"
          >
            {/* <div style={{ maxWidth: "100rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                }}
              >
                <Image
                  src="/edit_user4.png"
                  alt="vacina_certa_logo"
                  width={600}
                  height={1000}
                  style={{
                    width: "50%",
                    height: "auto",
                  }}
                  sizes="100vw"
                  // fill
                />
              </div>
            </div> */}
            {/* <div className={styles.vertical_line}></div> */}
            <Box display="flex" flexDirection="column" height="100%">
              <div className={styles.user_info_container}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  marginBottom={4}
                >
                  <h2 className={styles.user_name}>
                    Cecília Fernandes de Oliveira
                  </h2>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    className={styles.edit_button}
                  >
                    <EditRoundedIcon fontSize="inherit" color="action" />
                  </IconButton>
                </Box>

                <div className={styles.personal_data}>
                  <Box>
                    <h4 className={styles.label_title}>CPF</h4>
                    <h4 className={styles.label_value}>114.255.916-55</h4>
                  </Box>
                  <Box>
                    <h4 className={styles.label_title}>Data de Nascimento</h4>
                    <h4 className={styles.label_value}>15/06/2000</h4>
                  </Box>

                  <div>
                    <h4 className={styles.label_title}>Telefole</h4>
                    <Box display="flex" alignItems="center" gap={2}>
                      <h4 className={styles.label_value}>
                        +55 (31) 99285-0842
                      </h4>

                      <IconButton
                        aria-label="edit"
                        size="small"
                        className={styles.edit_button}
                      >
                        <EditRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </div>
                  <div>
                    <h4 className={styles.label_title}>
                      Como gostaria que chamassemos você
                    </h4>
                    <Box display="flex" alignItems="center" gap={2}>
                      <h4 className={styles.label_value}>Cissa</h4>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        className={styles.edit_button}
                      >
                        <EditRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </div>

                  {/* <div>
                    <h4 className={styles.label_title}>Senha</h4>
                    <Box display="flex" alignItems="baseline" gap={2}>
                      <h4 className={styles.label_value}>*********</h4>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        className={styles.edit_button}
                      >
                        <EditRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </div> */}
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </Layout>
  );
}
