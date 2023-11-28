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
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useMutation } from "@tanstack/react-query";
import { DocumentType } from "@/types/vaccines";
import TextField from "@mui/material/TextField";
import { Navbar } from "../Navbar";
import Grid from "@mui/material/Grid";
import MaskedInput from "react-input-mask";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  formatDate,
  getDocumentMask,
  getFirstName,
  getLastNames,
} from "@/utils";

const DOCUMENT_TYPE: DocumentType[] = [
  { name: "CPF", value: "CPF" },
  { name: "Passaporte", value: "PASSPORT" },
];

export const RegisterUserForm = () => {
  const router = useRouter();

  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [password, setPassword] = useState("");

  const user = {
    login: document,
    documentsType: documentType,
    password,
    roles: ["USER"],
    usersViewModel: {
      firstName: getFirstName(name),
      nickname,
      lastName: getLastNames(name),
      dateOfBirth: dateOfBirth && formatDate(`${dateOfBirth}`),
      document,
      documentType,
      phone,
    },
  };
  console.log(user);

  return (
    <Layout>
      <div className={styles.container}>
        <Navbar />

        <div className={styles.content}>
          <Title title="Faça seu cadastro" />
          <FormControl className={styles.form_control}>
            <Grid
              container
              rowSpacing={{ xs: 0, sm: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 8 }}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid item xs={1} sm={3} md={4}>
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
              <Grid item xs={1} sm={5} md={4}>
                <DemoItem label="Digite seu documento">
                  <MaskedInput
                    mask={getDocumentMask(documentType)}
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
                <DemoItem label="Digite seu nome completo">
                  <TextField
                    value={name}
                    id="outlined-basic"
                    label="Ex.: John Lennon"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Como prefere ser chamado">
                  <TextField
                    value={nickname}
                    id="outlined-basic"
                    label="Ex.: Jonny"
                    variant="outlined"
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={4} md={4}>
                <DemoItem label="Telefone">
                  <MaskedInput
                    mask="+99 (99) 99999-9999"
                    value={phone}
                    placeholder="Digite o documento"
                    onChange={(e) => setPhone(e.target.value)}
                  >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label="Ex.: +55 (31) 12345-6789"
                    />
                  </MaskedInput>
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={4} md={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"pt-br"}
                >
                  <Box className={styles.form_fields_container}>
                    <DemoContainer components={["DatePicker"]}>
                      <Box className={styles.date_picker}>
                        <DemoItem label="Data de nascimento">
                          <DatePicker
                            value={dateOfBirth}
                            disableFuture
                            format="DD/MM/YYYY"
                            onChange={(e) => setDateOfBirth(e)}
                          />
                        </DemoItem>
                      </Box>
                    </DemoContainer>
                  </Box>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Digite sua senha">
                  <TextField
                    value={password}
                    id="outlined-basic"
                    label="Ex.: &%6jAYkfe#@908"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </DemoItem>
              </Grid>
            </Grid>

            <Box className={styles.buttons_container}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => router.replace("/login")}
              >
                Cadastrar
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.replace("/login")}
              >
                Voltar para o login
              </Button>
            </Box>
          </FormControl>
        </div>
      </div>
    </Layout>
  );
};
