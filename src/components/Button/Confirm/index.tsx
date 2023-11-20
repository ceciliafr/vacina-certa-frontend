import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export const Confirm: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton
      aria-label="toggle password visibility"
      className={styles.confirm_button}
      size="small"
      onClick={onClick}
    >
      <CheckRoundedIcon fontSize="inherit" color="success" />
    </IconButton>
  );
};
