"use client";
import "date-fns/locale/pt-BR";
import { useState } from "react";
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
import { availableVaccinesData } from "@/mocks/available_vaccines";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function RegisterVaccination() {
  const [name, setName] = useState("");

  return (
    <Layout>
      <DesktopMenu />
      <RightContent>
        <Title title="Registrar vacinação:" />
        <FormControl className={styles.form_control}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"pt-br"}
          >
            <DemoContainer components={["DatePicker"]}>
              <Box className={styles.form_fields_container}>
                <Box className={styles.field_container}>
                  <DemoItem label="Nome da vacina">
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                        return availableVaccinesData[Number(selected)].name;
                      }}
                    >
                      <MenuItem disabled value="Selecione">
                        <em>Selecione</em>
                      </MenuItem>
                      {availableVaccinesData.map((vaccine) => (
                        <MenuItem key={vaccine.id} value={vaccine.id}>
                          {vaccine.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </DemoItem>
                </Box>
                <Box className={styles.field_container}>
                  <DemoItem label="Data da vacinação">
                    <DatePicker
                      label="Data da vacinação"
                      disableFuture
                      format="DD/MM/YYYY"
                      className={styles.date_picker}
                    />
                  </DemoItem>
                </Box>
              </Box>
            </DemoContainer>
          </LocalizationProvider>

          <Box className={styles.buttons_container}>
            <Button
              variant="outlined"
              color="error"
              className={styles.cancel_button}
            >
              Cancelar
            </Button>
            <Button variant="contained" className={styles.save_button}>
              Salvar
            </Button>
          </Box>
        </FormControl>
      </RightContent>
    </Layout>
  );
}
