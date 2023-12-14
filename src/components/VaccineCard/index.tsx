import styles from "./page.module.css";
import Box from "@mui/material/Box";
import { Tag } from "@/components/Tag";
import { Vaccine, VaccineStatus } from "@/types/vaccines";

export const VaccineCard: React.FC<Vaccine & { variant: VaccineStatus }> = ({
  id,
  appliedAt,
  dosage,
  popularName,
  fullName,
  manufacturer,
  age,
  year,
  description,
  required,
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

  const date = new Date();

  return (
    <Box key={id} className={getContainerStyle(variant)}>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <h2 className={styles.title}>{popularName}</h2>
          {!!dosage && <Tag>{dosage}</Tag>}
        </Box>

        <hr className={styles.hr} />
      </Box>

      <p className={styles.producer_container}>
        <span className={styles.description_producer}>Nome completo:</span>

        <span className={styles.description_value}>{` ${fullName}`}</span>
      </p>

      <p>
        <span className={styles.description_producer}>Descrição:</span>

        <span className={styles.description_value}>{` ${description}`}</span>
      </p>

      <p className={styles.producer_container}>
        <span className={styles.description_producer}>Fabricante:</span>

        <span className={styles.description_value}>{` ${manufacturer}`}</span>
      </p>

      {!!age && (
        <p className={styles.producer_container}>
          <span className={styles.description_producer}>Idade para tomar:</span>

          <span className={styles.description_value}>{` ${age} anos`}</span>
        </p>
      )}

      {
        <p className={styles.producer_container}>
          <span className={styles.description_producer}>Ano para tomar:</span>

          <span className={styles.description_value}>
            {year ? ` ${year}` : ` ${date.getFullYear()}`}
          </span>
        </p>
      }

      {variant != "information" && appliedAt && (
        <p className={styles.producer_container}>
          <span className={styles.description_producer}>
            Última dose tomada:
          </span>

          <span className={styles.description_value}>{` ${appliedAt.replaceAll(
            "-",
            "/"
          )}`}</span>
        </p>
      )}
    </Box>
  );
};
