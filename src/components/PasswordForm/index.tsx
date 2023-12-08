"use client";
import styles from "./styles.module.css";
import Grid from "@mui/material/Grid";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import InputLabel from "@mui/material/InputLabel";
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

export const UpdatePasswordForm = () => {
  const router = useRouter();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [oldPassword, setOldPassword] = useState(DEAFULT_FIELD_VALUE);
  const [newPassword, setNewPassword] = useState(DEAFULT_FIELD_VALUE);
  const [confirmPassword, setConfirmPassword] = useState(DEAFULT_FIELD_VALUE);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title
          title="Atualizar sua senha:"
          subtitle="Ao confirmar a alteração da senha você será redirecionadoo à tela de login novamente"
        />

        <Grid
          container
          rowSpacing={{ xs: 0, sm: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 8 }}
          columnSpacing={{ xs: 1, sm: 3, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4}>
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
          <Grid item xs={4} sm={4} md={4}></Grid>

          <Grid item xs={4} sm={4} md={4}>
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

          <Grid item xs={4} sm={4} md={4}>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirmar senha
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword.value}
              disabled={!newPassword.value}
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
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    onMouseDown={handleMouseDown}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>

          <Grid
            container
            columns={{ xs: 1, sm: 12, md: 12 }}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            className={styles.buttons_container}
          >
            <Grid item xs={1} sm={3} md={3}>
              <Button variant="contained" fullWidth>
                Salvar
              </Button>
            </Grid>
            <Grid item xs={1} sm={3} md={3}>
              <Button variant="outlined" color="error" fullWidth>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </RightContent>
    </Layout>
  );
};
