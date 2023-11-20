import { useState } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@/components/Button";

export const Edit: React.FC<{
  lableName: string;
  labelValue: string;
}> = ({ lableName, labelValue }) => {
  const [value, setValue] = useState(labelValue);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.container}>
      <h4 className={styles.label_title}>{lableName}</h4>
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl variant="standard" fullWidth>
          <Input
            disabled={!isEditing}
            error={!value}
            fullWidth
            id="standard-adornment-password"
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                {isEditing ? (
                  <>
                    <Button.Cancel
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setValue(labelValue);
                      }}
                    />
                    <Button.Confirm
                      onClick={() => {
                        value && setIsEditing(!isEditing);
                      }}
                    />
                  </>
                ) : (
                  <Button.Edit
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  />
                )}
              </InputAdornment>
            }
          />
          <div className={styles.error_message_container}>
            {!value && (
              <p className={styles.error_message}>O campo não pode ser vazio</p>
            )}
          </div>
        </FormControl>
      </Box>
    </div>
  );
};
