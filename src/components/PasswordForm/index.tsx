"use client";
import styles from "./styles.module.css";
import Grid from "@mui/material/Grid";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { DEAFULT_FIELD_VALUE, DEFAULT_FEEDBACK } from "@/constants";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import { UserContext } from "@/contexts/userContext";
import { Layout } from "../Layout";
import { Title } from "../Title";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/user";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const UpdatePasswordForm = () => {
  const router = useRouter();
  const { token, user, resetUserProfile } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [oldPassword, setOldPassword] = useState(DEAFULT_FIELD_VALUE);
  const [newPassword, setNewPassword] = useState(DEAFULT_FIELD_VALUE);
  const [confirmPassword, setConfirmPassword] = useState(DEAFULT_FIELD_VALUE);

  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const closeAlert = ({
    shouldRedirect = false,
    alertTime,
  }: {
    shouldRedirect?: boolean;
    alertTime: number;
  }) => {
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        show: false,
      }));
      resetUserProfile();
      shouldRedirect && router.replace("/login");
    }, alertTime);
  };

  const password = {
    actualPassword: oldPassword.value,
    newPassword: newPassword.value,
  };

  const { mutate } = useMutation({
    mutationFn: async () => updatePassword(user.userId, password),
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
        strongMessage: "Você será redirecionado para o login.",
      });
      closeAlert({ shouldRedirect: true, alertTime: 2000 });
      localStorage.clear();
    },
    onError: async () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "error",
        title: "Ops",
        message: "Erro ao atualizar sua senha.",
        strongMessage: "Tente novamente.",
      });
      closeAlert({ alertTime: 2000 });
    },
  });

  const resetErrorStates = () => {
    setFeedback((prev) => ({
      ...prev,
      error: "",
    }));
    setOldPassword((prev) => ({
      ...prev,
      error: "",
    }));
    setNewPassword((prev) => ({
      ...prev,
      error: "",
    }));
    setConfirmPassword((prev) => ({
      ...prev,
      error: "",
    }));
  };

  const userIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!oldPassword.value) {
      setOldPassword((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }
    if (!newPassword.value) {
      setNewPassword((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }
    if (
      newPassword.value &&
      confirmPassword.value &&
      newPassword.value != confirmPassword.value
    ) {
      setConfirmPassword((prev) => ({
        ...prev,
        error: "As senhas devem ser iguais",
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

    return isValid;
  };

  const registerUpdatedPassword = () => {
    if (userIsValid()) {
      mutate();
    }
  };

  const resetValues = () => {
    setFeedback({
      show: true,
      type: "info",
      title: "Pronto",
      message: "Suas alterações foram desfeitas",
      strongMessage: "",
    });
    closeAlert({ alertTime: 2000 });

    setOldPassword(DEAFULT_FIELD_VALUE);
    setNewPassword(DEAFULT_FIELD_VALUE);
    setConfirmPassword(DEAFULT_FIELD_VALUE);
  };

  return (
    token && (
      <Layout>
        <DesktopMenu />
        <RightContent>
          <Title
            title="Atualizar sua senha:"
            subtitle="Ao confirmar a alteração da senha você será redirecionadoo à tela de login novamente"
          />

          <Grid
            container
            rowSpacing={{ xs: 2, sm: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 8 }}
            columnSpacing={{ xs: 1, sm: 3, md: 12 }}
            className={styles.form_control}
          >
            <Grid item xs={2} sm={4} md={4}>
              <DemoItem label="Digite sua senha atual">
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword.value}
                  placeholder="Digite sua senha atual"
                  onChange={(e) =>
                    setOldPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  error={!!oldPassword.error}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowOldPassword((show) => !show)}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error={!!oldPassword.error} id="password-error">
                  {oldPassword.error}
                </FormHelperText>
              </DemoItem>
            </Grid>
            <Grid item xs={2} sm={4} md={4}></Grid>

            <Grid item xs={2} sm={4} md={4}>
              <DemoItem label="Digite sua senha">
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword.value}
                  placeholder="Digite sua senha"
                  onChange={(e) =>
                    setNewPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  error={!!newPassword.error}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword((show) => !show)}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error={!!newPassword.error} id="password-error">
                  {newPassword.error}
                </FormHelperText>
              </DemoItem>
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <DemoItem label="Confirmar senha">
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword.value}
                  disabled={!newPassword.value}
                  placeholder="Confirmar senha"
                  error={!!confirmPassword.error}
                  onChange={(e) =>
                    setConfirmPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword((show) => !show)}
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
                  id="password-error"
                >
                  {confirmPassword.error}
                </FormHelperText>
              </DemoItem>
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
                  onClick={registerUpdatedPassword}
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
          </Grid>
        </RightContent>

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
    )
  );
};
