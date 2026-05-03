import { Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AccountsApi } from "../../api/accounts";
import { SnackBar } from "../SnackBar/SnackBar";
import { HttpStatusCode } from "axios";

export function ChangeStatus({ account, refreshAccount }) {
  const [open, setOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({
    severity: "success",
    message: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSubmit() {
    await AccountsApi.changeStatus(account.id, !account.status)
      .then((response) => {
        setOpenSnackBar(true);
        const snack = {
          severity: "success",
          message: "Successfully changed status",
        };
        setSnackBar(snack);
        refreshAccount();
      })
      .catch((err) => {
        if (HttpStatusCode.InternalServerError === err.response.status) {
          setOpenSnackBar(true);

          const snack = {
            severity: "error",
            message: "Fail changing status",
          };
          setSnackBar(snack);
        }
      });
    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Status
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBar
        open={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        message={snackBar.message}
        severity={snackBar.severity}
      />
    </>
  );
}
