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
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getDocumentMask } from "@/utils";
import { UserContext } from "@/contexts/userContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginForm = () => {
  const router = useRouter();
  const [document, setDocument] = useState({ value: "", error: "" });
  const [documentType, setDocumentType] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const { token, setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: userLogin,
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
      setToken(data);
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

  const register = () => {
    const user = {
      login: document.value,
      documentsType: documentType.value,
      password: password.value,
    };

    mutate(user);
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
              rowSpacing={{ xs: 0, sm: 2, md: 3 }}
              columns={{ xs: 1, sm: 8, md: 8 }}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid item xs={1} sm={3} md={3}>
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
              <Grid item xs={1} sm={5} md={5}>
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
                <DemoItem label="Digite sua senha">
                  <TextField
                    value={password.value}
                    id="outlined-basic"
                    label="Digite"
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
