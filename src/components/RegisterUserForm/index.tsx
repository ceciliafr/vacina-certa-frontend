"use client";
import "date-fns/locale/pt-BR";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import { Navbar } from "../Navbar";
import Grid from "@mui/material/Grid";
import MaskedInput from "react-input-mask";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  formatDate,
  getDocumentLabel,
  getDocumentMask,
  getFirstName,
  getLastNames,
  removeSpecialCharacters,
} from "@/utils";
import { userRegister } from "@/api/user";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";
import {
  DEAFULT_FIELD_VALUE,
  DEFAULT_DATE_VALUE,
  DEFAULT_FEEDBACK,
  DOCUMENT_TYPE,
} from "@/constants";
import { Dayjs } from "dayjs";
import { RegisterUser } from "@/types/user";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const RegisterUserForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(DEAFULT_FIELD_VALUE);
  const [documentType, setDocumentType] = useState(DEAFULT_FIELD_VALUE);
  const [name, setName] = useState(DEAFULT_FIELD_VALUE);
  const [nickname, setNickname] = useState(DEAFULT_FIELD_VALUE);
  const [phone, setPhone] = useState(DEAFULT_FIELD_VALUE);
  const [password, setPassword] = useState(DEAFULT_FIELD_VALUE);
  const [confirmPassword, setConfirmPassword] = useState(DEAFULT_FIELD_VALUE);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [dateOfBirth, setDateOfBirth] = useState<{
    value: Dayjs | null;
    error: string;
  }>(DEFAULT_DATE_VALUE);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { mutate } = useMutation({
    mutationFn: userRegister,
    mutationKey: ["registerUser"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "success",
        title: "Parabéns",
        message: "Conta criada com sucesso!",
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
        message: "Erro ao criar sua conta.",
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
    setPassword((prev) => ({
      ...prev,
      error: "",
    }));
    setConfirmPassword((prev) => ({
      ...prev,
      error: "",
    }));
    setDateOfBirth((prev) => ({
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

    if (!dateOfBirth.value) {
      setDateOfBirth((prev) => ({
        ...prev,
        error: "Campo obrigatório",
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

    if (!confirmPassword.value) {
      setConfirmPassword((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (
      password.value &&
      confirmPassword.value &&
      password.value !== confirmPassword.value
    ) {
      setConfirmPassword((prev) => ({
        ...prev,
        error: "As senhas devem ser iguais",
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
        roles: ["USER"],
        usersViewModel: {
          firstName: getFirstName(name.value),
          nickname: nickname.value,
          lastName: getLastNames(name.value),
          dateOfBirth: dateOfBirth.value
            ? formatDate(`${dateOfBirth.value}`)
            : "",
          document: document.value,
          documentType: documentType.value,
          phone: phone.value,
        },
      } as RegisterUser;

      mutate(user);
    }
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

              <Grid item xs={1} sm={5} md={4}>
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
                <DemoItem label="Digite seu nome completo">
                  <TextField
                    error={!!name.error}
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
                    helperText={name.error}
                  />
                </DemoItem>
              </Grid>

              <Grid item xs={1} sm={8} md={8}>
                <DemoItem label="Como prefere ser chamado">
                  <TextField
                    error={!!nickname.error}
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
                    helperText={nickname.error}
                  />
                </DemoItem>
              </Grid>

              <Grid item xs={1} sm={4} md={4}>
                <DemoItem label="Telefone">
                  <MaskedInput
                    mask="+99 (99) 99999-9999"
                    value={phone.value}
                    placeholder="Digite o seu telefone"
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
                      error={!!phone.error}
                      helperText={phone.error}
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
                            defaultValue={null}
                            value={dateOfBirth.value}
                            disableFuture
                            format="DD/MM/YYYY"
                            onChange={(e) =>
                              setDateOfBirth((prev) => ({
                                ...prev,
                                value: e,
                              }))
                            }
                            slotProps={{
                              textField: {
                                error: !!dateOfBirth.error,
                                helperText: dateOfBirth.error,
                              },
                            }}
                          />
                        </DemoItem>
                      </Box>
                    </DemoContainer>
                  </Box>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={4} sm={4} md={4}>
                <DemoItem label="Crie sua senha">
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password.value}
                    placeholder="Ex.: &%6jAYkfe#@908"
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

              <Grid item xs={4} sm={4} md={4}>
                <DemoItem label="Confirme sua senha">
                  <OutlinedInput
                    fullWidth
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword.value}
                    disabled={!password.value}
                    placeholder="Confirmar senha"
                    onChange={(e) =>
                      setConfirmPassword((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                    error={!!confirmPassword.error}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDown}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={!!confirmPassword.error}
                    id="confirmPassword-error"
                  >
                    {confirmPassword.error}
                  </FormHelperText>
                </DemoItem>
              </Grid>
            </Grid>

            <Box className={styles.buttons_container}>
              <Button
                fullWidth
                variant="contained"
                onClick={register}
                type="submit"
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
};
