"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import "date-fns/locale/pt-BR";
import { useState } from "react";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useMutation } from "@tanstack/react-query";

import TextField from "@mui/material/TextField";
import { Navbar } from "../Navbar";
import Grid from "@mui/material/Grid";
import MaskedInput from "react-input-mask";

//documentsType
const DOCUMENT_TYPE = [
  { name: "CPF", value: "CPF" },
  { name: "Passaporte", value: "PASSPORT" },
];

export const LoginForm = () => {
  const router = useRouter();
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState("");

  const getDocumentMask = () => {
    if (documentType) {
      if (documentType === "CPF") {
        return "999.999.999-99";
      } else {
        return "aaaaaaaaa";
      }
    }
    return "";
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Navbar />

        <div className={styles.content}>
          <Title title="Faça seu login" />
          <FormControl className={styles.form_control}>
            <Grid
              container
              rowSpacing={{ xs: 0, sm: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 8 }}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid item xs={1} sm={3} md={3}>
                <DemoItem label="Tipo do documento">
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    fullWidth
                    variant="outlined"
                    defaultValue="Selecione"
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em style={{ color: "#656565" }}>Selecione</em>;
                      }
                      return DOCUMENT_TYPE.filter(
                        (doc) => doc.value === selected
                      )[0].name;
                    }}
                  >
                    <MenuItem disabled value="Selecione">
                      <em>Selecione</em>
                    </MenuItem>

                    {DOCUMENT_TYPE.map((document) => (
                      <MenuItem key={document.value} value={document.value}>
                        {document.name}
                      </MenuItem>
                    ))}
                  </Select>
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={5} md={5}>
                <DemoItem label="Digite seu documento">
                  <MaskedInput
                    mask={getDocumentMask()}
                    value={document}
                    disabled={!documentType}
                    placeholder="Digite o documento"
                    alwaysShowMask
                    onChange={(e) => setDocument(e.target.value)}
                  >
                    <TextField id="outlined-basic" variant="outlined" />
                  </MaskedInput>
                </DemoItem>
              </Grid>

              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Digite sua senha">
                  <TextField
                    id="outlined-basic"
                    label="Digite"
                    variant="outlined"
                  />
                </DemoItem>
              </Grid>
            </Grid>

            <Box className={styles.buttons_container}>
              <Button
                fullWidth
                variant="contained"
                className={styles.save_button}
                onClick={() => router.replace("/")}
              >
                Login
              </Button>

              <Button
                fullWidth
                variant="outlined"
                className={styles.save_button}
                onClick={() => router.replace("/cadastro")}
              >
                Cadastro
              </Button>
            </Box>
          </FormControl>
        </div>
      </div>
    </Layout>
  );
};
