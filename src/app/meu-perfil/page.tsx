"use client";
import { Title } from "@/components/Title";
import { DesktopMenu } from "@/components/desktop/Menu";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import MaskedInput from "react-input-mask";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/user";
import { DEAFULT_FIELD_VALUE, DEFAULT_FEEDBACK, HOST } from "@/constants";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import {
  formatDateToPtBr,
  getFirstName,
  getLastNames,
  removeSpecialCharacters,
} from "@/utils";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Fade } from "@mui/material";

export default function MyProfile() {
  const router = useRouter();
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [nickname, setNickname] = useState(DEAFULT_FIELD_VALUE);
  const [phone, setPhone] = useState(DEAFULT_FIELD_VALUE);
  const [name, setName] = useState(DEAFULT_FIELD_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const [createdAt, setCreatedAt] = useState(DEAFULT_FIELD_VALUE);
  const [document, setDocument] = useState(DEAFULT_FIELD_VALUE);
  const [documentType, setDocumentType] = useState(DEAFULT_FIELD_VALUE);
  const [dateOfBirth, setDateOfBirth] = useState(DEAFULT_FIELD_VALUE);

  const { data, isLoading: isLoadingUserData } = useQuery({
    queryFn: async () => getUser(`${HOST}/user/${user.userId}`, token),
    queryKey: ["getUserData"],
  });

  const updatedUser = {
    firstName: getFirstName(name.value),
    lastName: getLastNames(name.value),
    dateOfBirth: `${dateOfBirth.value}`,
    document: document.value,
    documentType: documentType.value,
    createdAt: createdAt.value,
    updatedAt: createdAt.value,
    phone: phone.value,
    nickname: nickname.value,
  };

  const { mutate } = useMutation({
    mutationFn: async () =>
      updateUser(`${HOST}/user/${user.userId}`, updatedUser, token),
    mutationKey: ["userLogin"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "success",
        title: "Parabéns",
        message: "Usuário atualizado com sucesso!",
        strongMessage: "",
      });
      closeAlert({ alertTime: 2000 });
    },
    onError: async () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "error",
        title: "Ops",
        message: "Erro ao fazer login.",
        strongMessage: "Tente novamente.",
      });
      closeAlert({ alertTime: 2000 });
    },
  });

  useEffect(() => {
    if (data) {
      setName((prev) => ({
        ...prev,
        value: `${data.firstName} ${data.lastName}`,
      }));
      setPhone((prev) => ({
        ...prev,
        value: data.phone,
      }));
      setNickname((prev) => ({
        ...prev,
        value: data.nickname,
      }));
      setCreatedAt((prev) => ({
        ...prev,
        value: data.createdAt,
      }));
      setDocument((prev) => ({
        ...prev,
        value: data.document,
      }));
      setDocumentType((prev) => ({
        ...prev,
        value: data.documentType,
      }));
      setDateOfBirth((prev) => ({
        ...prev,
        value: data.dateOfBirth,
      }));
    }
  }, [data]);

  const closeAlert = ({ alertTime }: { alertTime: number }) => {
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        show: false,
      }));
    }, alertTime);
  };

  const resetErrorStates = () => {
    setFeedback((prev) => ({
      ...prev,
      error: "",
    }));

    setName((prev) => ({
      ...prev,
      error: "",
    }));
    setNickname((prev) => ({
      ...prev,
      error: "",
    }));
    setPhone((prev) => ({
      ...prev,
      error: "",
    }));
  };

  const userIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!name.value) {
      setName((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (name.value && !(name.value.split(" ").length >= 2)) {
      setName((prev) => ({
        ...prev,
        error: "Campo incompleto",
      }));
      isValid = false;
    }

    if (!nickname.value) {
      setNickname((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (!phone.value) {
      setPhone((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (phone.value && removeSpecialCharacters(phone.value).length != 13) {
      setPhone((prev) => ({
        ...prev,
        error: "Campo incompleto",
      }));
      isValid = false;
    }

    return isValid;
  };

  const registerUpdatedUser = () => {
    if (userIsValid()) {
      mutate();
    }
  };

  const resetValues = () => {
    if (data) {
      setFeedback({
        show: true,
        type: "info",
        title: "Pronto",
        message: "Suas alterações foram desfeitas",
        strongMessage: "",
      });
      closeAlert({ alertTime: 2000 });

      setName((prev) => ({
        ...prev,
        value: `${data.firstName} ${data.lastName}`,
        error: "",
      }));
      setPhone((prev) => ({
        ...prev,
        value: data.phone,
        error: "",
      }));
      setNickname((prev) => ({
        ...prev,
        value: data.nickname,
        error: "",
      }));
    }
  };

  return (
    token && (
      <Layout>
        <DesktopMenu />
        <RightContent>
          <Title
            title="Área de dados pessoais:"
            subtitle="Você pode alterar seus dados a qualquer momento"
          />

          <Box
            gap="5rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              width="100%"
            >
              <div className={styles.user_info_container}>
                <div>
                  <span>
                    <strong>CPF: </strong>
                  </span>
                  <span>{!!data && data.document}</span>
                  <br />
                  <span>
                    <strong>Data de nascimento: </strong>
                  </span>
                  <span>
                    {!!data && formatDateToPtBr(data.dateOfBirth.split(" ")[0])}
                  </span>
                </div>

                <Grid
                  container
                  rowSpacing={{ xs: 0, sm: 2, md: 3 }}
                  columns={{ xs: 2, sm: 8, md: 8 }}
                  columnSpacing={{ xs: 1, sm: 3, md: 12 }}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    <DemoItem label="Digite seu nome completo">
                      <TextField
                        fullWidth
                        error={!!name.error}
                        value={name.value}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Digite seu nome completo"
                        onChange={(e) =>
                          setName((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        helperText={name.error}
                      />
                    </DemoItem>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <DemoItem label="Digite o seu telefone">
                      <MaskedInput
                        mask="+99 (99) 99999-9999"
                        value={phone.value}
                        placeholder="+55 (31) 12345-6789"
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
                          error={!!phone.error}
                          helperText={phone.error}
                        />
                      </MaskedInput>
                    </DemoItem>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <DemoItem label="Como prefere ser chamado">
                      <TextField
                        fullWidth
                        error={!!nickname.error}
                        value={nickname.value}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Preencha com o seu apelido"
                        onChange={(e) =>
                          setNickname((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        helperText={nickname.error}
                      />
                    </DemoItem>
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <Box
                      height="100%"
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      <Button
                        variant="text"
                        onClick={() => router.push("/atualizar-senha")}
                        style={{
                          textTransform: "initial",
                          textDecoration: "underline",
                          padding: 0,
                        }}
                      >
                        Alterar senha
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid
                  container
                  columns={{ xs: 1, sm: 12, md: 12 }}
                  columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                  className={styles.buttons_container}
                >
                  <Grid item xs={1} sm={3} md={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={registerUpdatedUser}
                    >
                      Salvar
                    </Button>
                  </Grid>
                  <Grid item xs={1} sm={3} md={3}>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={resetValues}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Box>
        </RightContent>

        <Box className={styles.alert_container}>
          <Fade in={feedback.show}>
            <Alert severity={feedback.type}>
              <AlertTitle>{feedback.title}</AlertTitle>
              {feedback.message} <strong>{feedback.strongMessage}</strong>
            </Alert>
          </Fade>
        </Box>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading || isLoadingUserData}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Layout>
    )
  );
}
