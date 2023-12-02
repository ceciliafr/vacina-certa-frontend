import styles from "./page.module.css";
import Box from "@mui/material/Box";
import { Tag } from "@/components/Tag";
import { Vaccine, VaccineStatus } from "@/types/vaccines";

export const VaccineCard: React.FC<Vaccine & { variant: VaccineStatus }> = ({
  id,
  popularName,
  dose,
  description,
  manufacturer,
  vaccinationDate,
  variant,
}) => {
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
    <Box key={id} className={getContainerStyle(variant)}>
      <Box display="flex" flexDirection="column" marginBottom={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <h2 className={styles.title}>{popularName}</h2>
          <Tag>{dose}</Tag>
        </Box>

        <hr className={styles.hr} />
      </Box>

      <p>
        <span className={styles.description}>{description}</span>
      </p>

      <p className={styles.producer_container}>
        <span className={styles.description_producer}>Fabricante:</span>

        <span>{` ${manufacturer}`}</span>
      </p>

      <h5
        className={styles.date}
      >{`Última dose tomada: ${vaccinationDate}`}</h5>
    </Box>
  );
};
