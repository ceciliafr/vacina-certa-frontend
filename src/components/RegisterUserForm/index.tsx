"use client";
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
import { userRegister } from "@/api/user";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";
import { DEFAULT_FEEDBACK, DOCUMENT_TYPE } from "@/constants";

export const RegisterUserForm = () => {
  const router = useRouter();

  const [document, setDocument] = useState({ value: "", error: "" });
  const [documentType, setDocumentType] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [nickname, setNickname] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [dateOfBirth, setDateOfBirth] = useState({ value: null, error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);

  const { mutate } = useMutation({
    mutationFn: userRegister,
    mutationKey: ["registerUser"],
    onSuccess: async () => {
      setFeedback({
        show: true,
        isError: false,
        type: "success",
        title: "Parabéns",
        message: "Conta criada com sucesso!",
        strongMessage: "",
      });
      closeAlert({ shouldRedirect: true, alertTime: 1000 });
    },
    onError: async () => {
      setFeedback({
        show: true,
        isError: false,
        type: "error",
        title: "Ops",
        message: "Erro ao criar sua conta",
        strongMessage: "Tente novamente.",
      });
      closeAlert({ shouldRedirect: false, alertTime: 2000 });
    },
  });

  const closeAlert = ({
    shouldRedirect = false,
    alertTime,
  }: {
    shouldRedirect: boolean;
    alertTime: number;
  }) => {
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        show: false,
      }));

      if (shouldRedirect) {
        router.replace("/login");
      }
    }, alertTime);
  };

  const register = () => {
    const user = {
      login: document.value,
      documentsType: documentType.value,
      password: password.value,
      roles: ["USER"],
      usersViewModel: {
        firstName: getFirstName(name.value),
        nickname: nickname.value,
        lastName: getLastNames(name.value),
        dateOfBirth: formatDate(`${dateOfBirth.value}`),
        document: document.value,
        documentType: documentType.value,
        phone: phone.value,
      },
    };

    mutate(user);
  };

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
                    value={documentType.value}
                    onChange={(e) =>
                      setDocumentType((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
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
                    mask={getDocumentMask(documentType.value)}
                    value={document.value}
                    disabled={!documentType}
                    placeholder="Digite o documento"
                    alwaysShowMask
                    onChange={(e) =>
                      setDocument((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  >
                    <TextField id="outlined-basic" variant="outlined" />
                  </MaskedInput>
                </DemoItem>
              </Grid>

              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Digite seu nome completo">
                  <TextField
                    value={name.value}
                    id="outlined-basic"
                    label="Ex.: John Lennon"
                    variant="outlined"
                    onChange={(e) =>
                      setName((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Como prefere ser chamado">
                  <TextField
                    value={nickname.value}
                    id="outlined-basic"
                    label="Ex.: Jonny"
                    variant="outlined"
                    onChange={(e) =>
                      setNickname((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                </DemoItem>
              </Grid>
              <Grid item xs={1} sm={4} md={4}>
                <DemoItem label="Telefone">
                  <MaskedInput
                    mask="+99 (99) 99999-9999"
                    value={phone.value}
                    placeholder="Digite o documento"
                    onChange={(e) =>
                      setPhone((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
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
                            value={dateOfBirth.value}
                            disableFuture
                            format="DD/MM/YYYY"
                            onChange={(e) =>
                              setDateOfBirth((prev) => ({
                                ...prev,
                                value: e,
                              }))
                            }
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
                    value={password.value}
                    id="outlined-basic"
                    label="Ex.: &%6jAYkfe#@908"
                    variant="outlined"
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                </DemoItem>
              </Grid>
            </Grid>

            <Box className={styles.buttons_container}>
              <Button fullWidth variant="contained" onClick={register}>
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
      <Box className={styles.alert_container}>
        <Collapse
          orientation="horizontal"
          in={feedback.show}
          className={styles.alert}
        >
          <Alert severity={feedback.type}>
            <AlertTitle>{feedback.title}</AlertTitle>
            {feedback.message} <strong>{feedback.strongMessage}</strong>
          </Alert>
        </Collapse>
      </Box>
    </Layout>
  );
};
