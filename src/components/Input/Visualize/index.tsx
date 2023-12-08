import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

export const Visualize: React.FC<{
  lableName: string;
  labelValue: string;
}> = ({ lableName, labelValue }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.label_title}>{lableName}</h4>
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl variant="standard" fullWidth>
          <Input
            disabled
            fullWidth
            id="standard-adornment-password"
            value={labelValue}
            className={styles.input}
          />
        </FormControl>
      </Box>
    </div>
  );
};
