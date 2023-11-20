import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Input } from "../Input";

export const Form: React.FC = () => {
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
          <Grid
            container
            rowSpacing={{ xs: 0, sm: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 8 }}
            columnSpacing={{ xs: 1, sm: 3, md: 12 }}
          >
            <Grid item xs={1} sm={4} md={4}>
              <Input.Visualize lableName="CPF" labelValue="114.255.916-55" />
            </Grid>
            <Grid item xs={1} sm={4} md={4}>
              <Input.Visualize
                lableName="Data de Nascimento"
                labelValue="15/06/2000"
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Input.Edit
                lableName="Nome completo"
                labelValue="Cecília Fernandes de Oliveira"
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Input.Edit
                lableName="Telefole"
                labelValue="+55 (31) 99285-0842"
              />
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <Input.Edit
                lableName="Como gostaria que chamassemos você"
                labelValue="Cissa"
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  );
};
