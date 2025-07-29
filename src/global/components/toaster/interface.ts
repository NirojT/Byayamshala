import { AlertColor } from "@mui/material";

export interface IToasterData {
  message: string | null;
  severity: AlertColor | undefined;
  open: boolean;
}
export interface IToaster {
  data: IToasterData;
  close: (value: boolean) => void;
}
