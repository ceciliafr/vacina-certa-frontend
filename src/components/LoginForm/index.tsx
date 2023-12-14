"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import "date-fns/locale/pt-BR";
import { useContext, useState } from "react";
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
import { DEFAULT_FEEDBACK, DOCUMENT_TYPE } from "@/constants";
import { userLogin } from "@/api/user";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  getDocumentLabel,
  getDocumentMask,
  removeSpecialCharacters,
} from "@/utils";
import { UserContext } from "@/contexts/userContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import { Fade } from "@mui/material";

export const LoginForm = () => {
  const router = useRouter();
  const [document, setDocument] = useState({ value: "", error: "" });
  const [documentType, setDocumentType] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const { setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { mutate } = useMutation({
    mutationFn: userLogin,
    mutationKey: ["userLogin"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async (data) => {
      setToken(data);
      setFeedback({
        show: true,
        type: "success",
        title: "Parabéns",
        message: "Login efetuado com sucesso!",
        strongMessage: "",
      });
      closeAlert({ shouldRedirect: true, alertTime: 1000 });
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
        router.replace("/");
      }
    }, alertTime);
  };

  const resetErrorStates = () => {
    setFeedback((prev) => ({
      ...prev,
      error: "",
    }));

    setDocument((prev) => ({
      ...prev,
      error: "",
    }));
    setDocumentType((prev) => ({
      ...prev,
      error: "",
    }));

    setPassword((prev) => ({
      ...prev,
      error: "",
    }));
  };

  const userIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!documentType.value) {
      setDocumentType((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (!removeSpecialCharacters(document.value)) {
      setDocument((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (
      documentType.value === "CPF" &&
      removeSpecialCharacters(document.value) &&
      removeSpecialCharacters(document.value).length != 11
    ) {
      setDocument((prev) => ({
        ...prev,
        error: "Campo incompleto",
      }));
      isValid = false;
    }

    if (
      documentType.value === "PASSPORT" &&
      removeSpecialCharacters(document.value) &&
      removeSpecialCharacters(document.value).length != 8
    ) {
      setDocument((prev) => ({
        ...prev,
        error: "Campo incompleto",
      }));
      isValid = false;
    }

    if (!password.value) {
      setPassword((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    return isValid;
  };

  const register = () => {
    if (userIsValid()) {
      const user = {
        login: document.value,
        documentsType: documentType.value,
        password: password.value,
      };

      mutate(user);
    }
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
              rowSpacing={{ xs: 4, sm: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 8 }}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid item xs={1} sm={3} md={3}>
                <FormControl error fullWidth>
                  <DemoItem label="Tipo do documento">
                    <Select
                      error={!!documentType.error}
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
                          return (
                            <em style={{ color: "#656565" }}>Selecione</em>
                          );
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
                    <FormHelperText>{documentType.error}</FormHelperText>
                  </DemoItem>
                </FormControl>
              </Grid>
              <Grid item xs={1} sm={5} md={5}>
                <DemoItem label="Digite seu documento">
                  <MaskedInput
                    mask={getDocumentMask(documentType.value)}
                    value={document.value}
                    disabled={!documentType.value}
                    alwaysShowMask
                    onChange={(e) =>
                      setDocument((prev) => ({
                        ...prev,
                        value: e.target.value.toUpperCase(),
                      }))
                    }
                  >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label={getDocumentLabel(documentType.value)}
                      error={!!document.error}
                      helperText={document.error}
                    />
                  </MaskedInput>
                </DemoItem>
              </Grid>

              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Digite sua senha">
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password.value}
                    placeholder="Digite sua senha"
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                    error={!!password.error}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDown}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={!!password.error} id="password-error">
                    {password.error}
                  </FormHelperText>
                </DemoItem>
              </Grid>
            </Grid>

            <Box className={styles.buttons_container}>
              <Button fullWidth variant="contained" onClick={register}>
                Login
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push("/cadastro")}
              >
                Cadastro
              </Button>
            </Box>
          </FormControl>
        </div>
      </div>

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
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};
