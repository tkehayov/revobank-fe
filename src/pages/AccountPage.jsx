import { Box, Grid } from "@mui/material";
import { SideNav } from "../components/SideNav/SideNav";
import { BorderColor } from "@mui/icons-material";
import { AccountsApi } from "../api/accounts";
import { useEffect, useState } from "react";
import { AccountList } from "../components/AccountList/AccountList";
import { NewUser } from "../components/NewUser/NewUser";

export function AccountPage() {
  const [accounts, setAccounts] = useState([]);

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
      <NewUser fetchAccounts={fetchAccounts} />
      <AccountList accounts={accounts} />
    </>
  );
}
