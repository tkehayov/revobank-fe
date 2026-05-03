import { useEffect, useState } from "react";
import { TransfersApi } from "../../api/transfers";
import { HttpStatusCode } from "axios";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SnackBar } from "../SnackBar/SnackBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AccountsApi } from "../../api/accounts";

export function NewTransfer({ fetchTransfers }) {
  const [open, setOpen] = useState(false);
  const [snackBar, setSnackBar] = useState({
    severity: "success",
    message: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [fromAccount, setFromAccount] = useState("");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState("");
  const [type, setType] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleFromSelectChange(event) {
    setFromAccount(event.target.value);
  }

  function handleBeneficiarySelectChange(event) {
    setBeneficiaryAccount(event.target.value);
  }

  function handleType(event) {
    setType(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    await TransfersApi.newTransfer(formJson)
      .then((response) => {
        setOpenSnackBar(true);
        const snack = {
          severity: "success",
          message: "Transfer success",
        };
        setSnackBar(snack);
        fetchTransfers();
      })
      .catch((err) => {
        if (HttpStatusCode.InternalServerError === err.response.status) {
          setOpenSnackBar(true);

          const snack = {
            severity: "error",
            message: "Transfer failed",
          };
          setSnackBar(snack);
        }
      });
    handleClose();
  }

  async function fetchAccounts() {
    const accountsResponse = await AccountsApi.fetchAccounts();
    if (accountsResponse !== 0) {
      setAccounts(accountsResponse);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        New Transfer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Transfer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="transfer-form">
            <InputLabel id="from-label">From Account</InputLabel>
            <Select
              labelId="from-label"
              id="from-account-select"
              name="fromAccountId"
              value={fromAccount}
              onChange={handleFromSelectChange}
              fullWidth
              required
            >
              {accounts.map((account) => (
                <MenuItem value={account.id}>{account.name}</MenuItem>
              ))}
            </Select>
            <InputLabel id="from-label">Beneficiary Account</InputLabel>
            <Select
              labelId="from-label"
              id="from-account-select"
              name="beneficiaryId"
              value={beneficiaryAccount}
              onChange={handleBeneficiarySelectChange}
              fullWidth
              required
            >
              {accounts.map((account) => (
                <MenuItem value={account.id}>{account.name}</MenuItem>
              ))}
            </Select>
            <InputLabel id="from-label">Payment Type</InputLabel>
            <Select
              labelId="from-label"
              id="type-payment-select"
              name="type"
              value={type}
              onChange={handleType}
              fullWidth
              required
            >
              <MenuItem value="Debit">Debit</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
            </Select>
            <TextField
              autoFocus
              required
              margin="dense"
              id="amount"
              name="amount"
              label="Amount"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" form="transfer-form">
            Confirm
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
