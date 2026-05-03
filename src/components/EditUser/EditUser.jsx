import { Stack, Typography } from "@mui/material";

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
import Switch from "@mui/material/Switch";

export function EditUser({ account, refreshAccount }) {
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
    formJson.status = formData.get("status") === "on";
    formJson.id = account.id;

    await AccountsApi.editUser(formJson)
      .then((response) => {
        setOpenSnackBar(true);
        const snack = {
          severity: "success",
          message: "Successfully created user",
        };
        setSnackBar(snack);
        refreshAccount();
      })
      .catch((err) => {
        if (HttpStatusCode.InternalServerError === err.response.status) {
          setOpenSnackBar(true);

          const snack = {
            severity: "error",
            message: "Fail editing user",
          };
          setSnackBar(snack);
        }
      });
    handleClose();
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
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
              defaultValue={account.name}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="iban"
              name="iban"
              label="IBAN"
              fullWidth
              defaultValue={account.iban}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="availableAmount"
              name="availableAmount"
              label="Amount"
              fullWidth
              defaultValue={account.availableAmount}
            />

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Inactive</Typography>
              <Switch
                defaultChecked={account.status}
                id="status"
                name="status"
                color="primary"
              />
              <Typography>Active</Typography>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" form="user-form">
            Edit User
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
