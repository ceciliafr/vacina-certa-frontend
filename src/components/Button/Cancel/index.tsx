import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export const Cancel: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton
      aria-label="toggle password visibility"
      className={styles.cancel_button}
      size="small"
      onClick={onClick}
    >
      <ClearRoundedIcon fontSize="inherit" color="error" />
    </IconButton>
  );
};
