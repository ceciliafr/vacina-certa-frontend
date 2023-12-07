"use client";
import "date-fns/locale/pt-BR";
import { useContext, useMemo, useState } from "react";
import styles from "./page.module.css";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { DesktopMenu } from "@/components/desktop/Menu";
import { RightContent } from "@/components/Layout/RightContent";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVaccines, registerVaccine } from "@/api/vaccines";
import Grid from "@mui/material/Grid";
import { UserContext } from "@/contexts/userContext";
import {
  DEAFULT_FIELD_VALUE,
  DEFAULT_DATE_VALUE,
  DEFAULT_FEEDBACK,
  HOST,
} from "@/constants";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Dayjs } from "dayjs";
import { formatDate } from "@/utils";
import FormHelperText from "@mui/material/FormHelperText";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function RegisterVaccination() {
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(DEAFULT_FIELD_VALUE);
  const [vaccineAppliedAt, setVaccineAppliedAt] = useState<{
    value: Dayjs | null;
    error: string;
  }>(DEFAULT_DATE_VALUE);

  const { token, user } = useContext(UserContext);
  const url = `${HOST}/vaccine`;

  const { data: allVaccines, isLoading: isLoadingAllVaccines } = useQuery({
    queryFn: async () => {
      return getVaccines(url, token);
    },
    queryKey: ["allVaccines"],
  });

  const selectedVaccine = useMemo(() => {
    return allVaccines?.find((vaccine) => vaccine.popularName === name.value);
  }, [allVaccines, name.value]);

  const vaccine = {
    vaccineDTO: {
      id: selectedVaccine?.id || "",
    },
    appliedAt: vaccineAppliedAt.value
      ? formatDate(`${vaccineAppliedAt.value}`)
      : "",
  };

  const { mutate } = useMutation({
    mutationFn: async () =>
      registerVaccine(`${HOST}/user/${user.userId}/vaccines`, token, [vaccine]),
    mutationKey: ["registerVaccine"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "success",
        title: "Parabéns",
        message: "Vacinação registrada com sucesso!",
        strongMessage: "",
      });
      closeAlert({ alertTime: 2000 });
      resetAllStates();
    },
    onError: () => {
      setIsLoading(false);
      setFeedback({
        show: true,
        type: "error",
        title: "Ops",
        message: "Erro ao registrar sua vacinação",
        strongMessage: "Tente novamente.",
      });
      closeAlert({ alertTime: 2000 });
    },
  });

  const closeAlert = ({ alertTime }: { alertTime: number }) => {
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        show: false,
      }));
    }, alertTime);
  };

  const resetErrorStates = () => {
    setName((prev) => ({
      ...prev,
      error: "",
    }));

    setVaccineAppliedAt((prev) => ({
      ...prev,
      error: "",
    }));
  };

  const resetAllStates = () => {
    setName(DEAFULT_FIELD_VALUE);
    setVaccineAppliedAt(DEFAULT_DATE_VALUE);
  };

  const vaccineIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!name.value) {
      setName((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    if (!vaccineAppliedAt.value) {
      setVaccineAppliedAt((prev) => ({
        ...prev,
        error: "campo obrigatório",
      }));
      isValid = false;
    }

    return isValid;
  };

  const registerVaccination = () => {
    if (vaccineIsValid() && selectedVaccine?.id && vaccineAppliedAt.value) {
      mutate();
    }
  };

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Registrar vacinação" />
        <FormControl className={styles.form_control}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"pt-br"}
          >
            <DemoContainer components={["DatePicker"]}>
              <Box className={styles.form_fields_container}>
                <FormControl className={styles.field_container} error fullWidth>
                  <DemoItem label="Nome da vacina">
                    <Select
                      error={!!name.error}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={name.value}
                      onChange={(e) => {
                        setName((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }));
                      }}
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

                        return selected;
                      }}
                    >
                      <MenuItem disabled value="Selecione">
                        <em>Selecione</em>
                      </MenuItem>
                      {allVaccines?.map((vaccine) => (
                        <MenuItem key={vaccine.id} value={vaccine.popularName}>
                          {vaccine.popularName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={styles.error_text}>
                      {name.error}
                    </FormHelperText>
                  </DemoItem>
                </FormControl>
                <Box className={styles.field_container}>
                  <DemoItem label="Data da vacinação">
                    <DatePicker
                      defaultValue={null}
                      value={vaccineAppliedAt.value}
                      disableFuture
                      format="DD/MM/YYYY"
                      onChange={(e) =>
                        setVaccineAppliedAt((prev) => ({
                          ...prev,
                          value: e,
                        }))
                      }
                      slotProps={{
                        textField: {
                          error: !!vaccineAppliedAt.error,
                          helperText: vaccineAppliedAt.error,
                        },
                      }}
                    />
                  </DemoItem>
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>
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
                onClick={registerVaccination}
              >
                Salvar
              </Button>
            </Grid>
            <Grid item xs={1} sm={3} md={3}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={resetAllStates}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </FormControl>
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
        open={isLoading || isLoadingAllVaccines}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
