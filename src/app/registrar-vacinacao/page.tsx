"use client";
import "dayjs/locale/pt-br";
import { useContext, useEffect, useMemo, useState } from "react";
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
import { getTakenVaccines, getVaccines, registerVaccine } from "@/api/vaccines";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Fade } from "@mui/material";
import { Vaccine, VaccineResponse } from "@/types/vaccines";

export default function RegisterVaccination() {
  const router = useRouter();

  const { token, user } = useContext(UserContext);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const [refetchApi, setRefetchApi] = useState(false);
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(DEAFULT_FIELD_VALUE);
  const [vaccineAppliedAt, setVaccineAppliedAt] = useState<{
    value: Dayjs | null;
    error: string;
  }>(DEFAULT_DATE_VALUE);

  const [allVaccines, setAllVaccines] = useState<Vaccine[]>([]);
  const [takenVaccines, setTakenVaccines] = useState<VaccineResponse[]>([]);

  const { data: allVaccinesData, isLoading: isLoadingAllVaccines } = useQuery({
    queryFn: async () => {
      return getVaccines(`${HOST}/vaccine`, token);
    },
    queryKey: ["allVaccines", refetchApi],
  });

  useEffect(() => {
    allVaccinesData && setAllVaccines(allVaccinesData);
  }, [allVaccinesData]);

  const { data: takenVaccinesData, isLoading: isTakenVaccinesLoading } =
    useQuery({
      queryFn: async () =>
        getTakenVaccines(`${HOST}/user/${user?.userId}/vaccines`, token),
      queryKey: ["takenVaccines", refetchApi],
    });

  useEffect(() => {
    takenVaccinesData && setTakenVaccines(takenVaccinesData);
  }, [takenVaccinesData]);

  const pendingVaccines = useMemo(() => {
    if (takenVaccines && allVaccines) {
      const setTakenVaccinesData = new Set(
        takenVaccines.map((item) => item.vaccineViewModel["id"])
      );

      return allVaccines.filter(
        (item) => !setTakenVaccinesData.has(item["id"])
      );
    }
    return [];
  }, [takenVaccines, allVaccines]);

  const selectedVaccine = useMemo(() => {
    return pendingVaccines?.find(
      (vaccine) => vaccine.popularName === name.value
    );
  }, [pendingVaccines, name.value]);

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
      registerVaccine(`${HOST}/user/${user?.userId}/vaccines`, token, [
        vaccine,
      ]),
    mutationKey: ["registerVaccine"],
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setRefetchApi((value) => !value);
      setFeedback({
        show: true,
        type: "success",
        title: "Parabéns",
        message: "Vacinação registrada com sucesso!",
        strongMessage: (
          <p>
            <a style={{ textDecoration: "underline" }} href="/">
              Ir para cartão de vacina
            </a>
          </p>
        ),
      });
      closeAlert({ alertTime: 3500 });
      resetAllStates();
    },
    onError: () => {
      setFeedback({
        show: true,
        type: "warning",
        title: "Atenção",
        message: "Vacina já cadastrada.",
        strongMessage: "",
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
      setIsLoading(false);
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

  const cancel = () => {
    const hasValue = name.value || vaccineAppliedAt.value;
    setFeedback({
      show: true,
      type: hasValue ? "info" : "warning",
      title: hasValue ? "Pronto" : "Atenção",
      message: hasValue
        ? "Suas alterações foram desfeitas."
        : "Nada a ser desfeito.",
      strongMessage: hasValue ? "" : "Cadastre uma vacinação.",
    });
    closeAlert({ alertTime: 2000 });
    resetAllStates();
  };

  const vaccineIsValid = () => {
    resetErrorStates();
    let isValid = true;

    if (!name.value) {
      setName((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (!vaccineAppliedAt.value) {
      setVaccineAppliedAt((prev) => ({
        ...prev,
        error: "Campo obrigatório",
      }));
      isValid = false;
    }

    if (vaccineAppliedAt.value) {
      const today = moment();
      const vaccineApplied =
        vaccineAppliedAt.value && moment(`${vaccineAppliedAt.value}`);

      if (today.diff(vaccineApplied, "days") < 0) {
        setVaccineAppliedAt((prev) => ({
          ...prev,
          error: "Não pode ser uma data futura",
        }));

        isValid = false;
      }
    }

    return isValid;
  };

  const registerVaccination = () => {
    if (vaccineIsValid()) {
      mutate();
    }
  };

  const showLoading =
    isLoading || isLoadingAllVaccines || isTakenVaccinesLoading;

  return (
    token && (
      <Layout>
        <DesktopMenu />
        <RightContent>
          <Title title="Registrar vacinação" />
          <FormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"pt-br"}
            >
              <DemoContainer components={["DatePicker"]}>
                <Box className={styles.form_fields_container}>
                  <FormControl
                    className={styles.field_container}
                    error
                    fullWidth
                  >
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
                        disabled={pendingVaccines.length === 0}
                        fullWidth
                        variant="outlined"
                        defaultValue="Selecione"
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <em style={{ color: "#656565" }}>
                                {!showLoading && pendingVaccines.length === 0
                                  ? "Todas as vacinas foram cadastradas"
                                  : "Selecione"}
                              </em>
                            );
                          }

                          return selected;
                        }}
                      >
                        <MenuItem disabled value="AAA">
                          <em>Selecione</em>
                        </MenuItem>
                        {!isLoading &&
                          pendingVaccines?.map((vaccine) => (
                            <MenuItem
                              key={vaccine.id}
                              value={vaccine.popularName}
                            >
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
                        disabled={pendingVaccines.length === 0}
                        defaultValue={null}
                        value={vaccineAppliedAt.value}
                        disableFuture
                        label={
                          !showLoading && pendingVaccines.length === 0
                            ? "Todas as vacinas foram cadastradas"
                            : "DD/MM/YYYY"
                        }
                        format={"DD/MM/YYYY"}
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
                  onClick={cancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </RightContent>

        <Box className={styles.alert_container}>
          <Fade in={feedback.show} className={styles.alert}>
            <Alert severity={feedback.type}>
              <AlertTitle>{feedback.title}</AlertTitle>
              {feedback.message} <strong>{feedback.strongMessage}</strong>
            </Alert>
          </Fade>
        </Box>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Layout>
    )
  );
}
