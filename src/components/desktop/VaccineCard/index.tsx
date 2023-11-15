import Paper from "@mui/material/Paper";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import { Tag } from "@/components/Tag";

export const VaccineCard: React.FC<{
  id: number;
  name: string;
  dose: string;
  description: string;
  producer: string;
  vaccinationDate: string;
}> = ({ id, name, dose, description, producer, vaccinationDate }) => {
  return (
    <Paper
      key={id}
      elevation={1}
      variant="outlined"
      className={styles.container}
    >
      <Box display="flex" flexDirection="column" marginBottom={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <h2 className={styles.title}>{name}</h2>
          <Tag>{dose}</Tag>
        </Box>

        <hr className={styles.hr} />
      </Box>

      <p>
        <span className={styles.description}>{description}</span>
      </p>

      <p className={styles.producer_container}>
        <span className={styles.description_producer}>Fabricante:</span>

        <span>{` ${producer}`}</span>
      </p>

      <h5
        className={styles.date}
      >{`Última dose tomada: ${vaccinationDate}`}</h5>
    </Paper>
  );
};
