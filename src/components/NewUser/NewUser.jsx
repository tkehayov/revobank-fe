import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AccountsApi } from "../../api/accounts";
import { SnackBar } from "../SnackBar/SnackBar";
import { HttpStatusCode } from "axios";

export function NewUser({ fetchAccounts }) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    await AccountsApi.addUser(formJson)
      .then((response) => {
        setOpenSnackBar(true);
        const snack = {
          severity: "success",
          message: "Successfully created user",
        };
        setSnackBar(snack);
        fetchAccounts();
      })
      .catch((err) => {
        if (HttpStatusCode.InternalServerError === err.response.status) {
          setOpenSnackBar(true);

          const snack = {
            severity: "error",
            message: "Fail creating user",
          };
          setSnackBar(snack);
        }
      });
    handleClose();
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="user-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="iban"
              name="iban"
              label="IBAN"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" form="user-form">
            Add User
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
