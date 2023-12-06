import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Input } from "../Input";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useContext, useEffect, useState } from "react";
import MaskedInput from "react-input-mask";
import Button from "@mui/material/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/user";
import { DEFAULT_FEEDBACK, HOST } from "@/constants";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import { formatDateToPtBr, removeSpecialCharacters } from "@/utils";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// UserResponseFromMyProfile;

// id: "ff8080818c372d60018c372e25fd0000";
// firstName: "Cissa";
// lastName: "Fernandes";
// dateOfBirth: "2023-12-02 00:00:00";
// document: "123.243.434-34";
// documentType: "CPF";
// createdAt: "2023-12-04 23:33:40";
// updatedAt: "2023-12-04 23:33:40";
// phone: "+23 (49) 79347-6837";
// nickname: "Cissa";

const defaultValue = { value: "", error: "" };
const defaultDateValue = { value: null, error: "" };

export const Form: React.FC = () => {
  const router = useRouter();

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [password, setPassword] = useState(defaultValue);
  const [confirmPassword, setConfirmPassword] = useState(defaultValue);
  const [nickname, setNickname] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState(defaultValue);
  const [name, setName] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userUpdated, setUserUpdated] = useState({});

  const { token, user } = useContext(UserContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { data, isLoading: isLoadingUserData } = useQuery({
    queryFn: async () => getUser(`${HOST}/user/${user.userId}`, token),
    queryKey: ["getUserData"],
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      updateUser(`${HOST}/user/${user.userId}`, userUpdated, token),
    mutationKey: ["userLogin"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: async (data) => {
      setIsLoading(false);
      setFeedback((prev) => ({
        ...prev,
        show: false,
      }));
      closeAlert({ shouldRedirect: true, alertTime: 1000 });
    },
    onError: async () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        isError: false,
        type: "error",
        title: "Ops",
        message: "Erro ao fazer login",
        strongMessage: "Tente novamente.",
      });
      closeAlert({ shouldRedirect: false, alertTime: 2000 });
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
    }
  }, [data]);

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
  };

  const userIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!name.value) {
      setName((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    if (name.value && !(name.value.split(" ").length >= 2)) {
      setName((prev) => ({
        ...prev,
        error: "campo incompleto",
      }));
      isValid = false;
    }

    if (!nickname.value) {
      setNickname((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    if (!phone.value) {
      setPhone((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    if (phone.value && removeSpecialCharacters(phone.value).length != 13) {
      setPhone((prev) => ({
        ...prev,
        error: "campo incompleto",
      }));
      isValid = false;
    }

    if (!password.value) {
      setPassword((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    if (!confirmPassword.value) {
      setConfirmPassword((prev) => ({
        ...prev,
        error: "campo obrigatório",
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
        error: "as senhas devem ser iguais",
      }));
      isValid = false;
    }

    return isValid;
  };

  const registerUpdatedUser = () => {
    if (userIsValid()) {
      setUserUpdated({});
      mutate();
    }
  };

  return (
    <Box
      gap="5rem"
      width="100%"
      marginTop={4}
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" height="100%" width="100%">
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
              <InputLabel htmlFor="outlined-adornment-password">
                Seu nome completo
              </InputLabel>
              <TextField
                fullWidth
                value={name.value}
                id="outlined-basic"
                variant="outlined"
                onChange={(e) =>
                  setName((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <InputLabel htmlFor="outlined-adornment-password">
                Seu telefone
              </InputLabel>
              <MaskedInput
                mask="+99 (99) 99999-9999"
                value={phone.value}
                onChange={(e) =>
                  setPhone((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              >
                <TextField id="outlined-basic" variant="outlined" fullWidth />
              </MaskedInput>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <InputLabel htmlFor="outlined-adornment-password">
                Digite sua senha
              </InputLabel>
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
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar senha
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword.value}
                disabled
                placeholder="Confirmar senha"
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
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={4} sm={8} md={8}>
              <InputLabel htmlFor="outlined-adornment-password">
                Como prefere ser chamado
              </InputLabel>
              <TextField
                fullWidth
                value={nickname.value}
                id="outlined-basic"
                placeholder="Preencha com o seu apelido"
                variant="outlined"
                onChange={(e) =>
                  setNickname((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              />
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
              <Button variant="outlined" color="error" fullWidth>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isLoadingUserData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
