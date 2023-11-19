import { useState } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export const EditableLabel: React.FC<{
  lableName: string;
  labelValue: string;
  isEditable?: boolean;
}> = ({ lableName, labelValue, isEditable = false }) => {
  const [value, setValue] = useState(labelValue);
  const [isEditing, setIsEditing] = useState(false);

  const saveNewValue = () => {};

  return (
    <div>
      <h4 className={styles.label_title}>{lableName}</h4>
      <Box display="flex" alignItems="center" gap={2}>
        {isEditable ? (
          <FormControl variant="standard" fullWidth>
            <Input
              error={!value}
              fullWidth
              className={styles.input}
              id="standard-adornment-password"
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  {isEditing ? (
                    <>
                      <IconButton
                        aria-label="toggle password visibility"
                        className={styles.cancel_button}
                        size="small"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <ClearRoundedIcon fontSize="inherit" color="error" />
                      </IconButton>
                      <IconButton
                        aria-label="toggle password visibility"
                        className={styles.confirm_button}
                        size="small"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <CheckRoundedIcon fontSize="inherit" color="success" />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="toggle password visibility"
                      className={styles.edit_button}
                      size="small"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <EditRoundedIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
            {!value && (
              <p className={styles.error_message}>O campo não pode ser vazio</p>
            )}
          </FormControl>
        ) : (
          <FormControl variant="standard" fullWidth>
            <Input
              disabled
              fullWidth
              className={styles.input}
              id="standard-adornment-password"
              value={value}
            />
          </FormControl>
        )}
      </Box>
    </div>
  );
};
