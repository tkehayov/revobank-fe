import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function SnackBar({ open, setOpenSnackBar, message, severity }) {
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
