import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";

import useCommonStore from "@/stores/useCommonStore";

export interface IAlertMessage {
  message: string;
  messageType: "success" | "error" | "info" | "warning";
}

// Delay time for alert to disappear
const DELAY_TIME = 1500;

const AlertComponent: React.FC = () => {
  const { isShowingAlert, setShowingAlert, alertMessage } = useCommonStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowingAlert(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isShowingAlert}
      autoHideDuration={DELAY_TIME}
      onClose={handleClose}
    >
      <Alert severity={alertMessage.messageType}>{alertMessage.message}</Alert>
    </Snackbar>
  );
};

export default AlertComponent;
