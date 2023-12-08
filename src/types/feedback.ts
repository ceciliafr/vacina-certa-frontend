import { AlertColor } from "@mui/material/Alert";

export type Feedback = {
  show: boolean;
  type: AlertColor | undefined;
  title: string;
  message: string;
  strongMessage: string;
};
