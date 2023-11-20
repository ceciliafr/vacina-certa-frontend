import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export const Edit: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton
      aria-label="toggle password visibility"
      className={styles.edit_button}
      size="small"
      onClick={onClick}
    >
      <EditRoundedIcon fontSize="inherit" />
    </IconButton>
  );
};
