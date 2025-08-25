
import { Snackbar, Alert, type AlertColor } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

// Create context
const SnackbarContext = createContext<{ showSnackbar: (message:string, severity?:AlertColor) => void }>({ showSnackbar: () => {} });

// Custom hook for easier access
export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{open:boolean, message:string, severity:AlertColor}>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback((message:string, severity:any = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleClose = (event:React.SyntheticEvent | Event, reason?:string) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
