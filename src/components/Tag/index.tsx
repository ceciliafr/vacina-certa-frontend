import Box from "@mui/material/Box";
import styles from "./styles.module.css";

export const Tag: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box className={styles.container}>
      <h5 className={styles.tag}>{children}</h5>
    </Box>
  );
};
