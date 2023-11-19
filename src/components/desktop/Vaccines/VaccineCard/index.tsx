import Paper from "@mui/material/Paper";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import { Tag } from "@/components/Tag";
import { VaccineStatus } from "@/types/vaccines";

export const VaccineCard: React.FC<{
  id: number;
  name: string;
  dose: string;
  description: string;
  producer: string;
  vaccinationDate: string;
  variant: VaccineStatus;
}> = ({ id, name, dose, description, producer, vaccinationDate, variant }) => {
  const getContainerStyle = (variant: VaccineStatus) => {
    switch (variant) {
      case "pending":
        return styles.pending_container;
      case "completed":
        return styles.completed_container;
      case "information":
      default:
        return styles.container;
    }
  };

  return (
    <Paper key={id} variant="outlined" className={getContainerStyle(variant)}>
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
