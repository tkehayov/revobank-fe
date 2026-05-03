import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EditUser } from "../EditUser/EditUser";
import { ChangeStatus } from "../ChangeStatus/ChangeStatus";
import { useEffect, useState } from "react";
import { AccountsApi } from "../../api/accounts";

export function AccountListItem({ account }) {
  const [newAccount, setNewAccount] = useState(account);

  async function refreshAccount() {
    const response = await AccountsApi.fetchAccount(newAccount.id);

    if (response) {
      setNewAccount(response);
    }
  }

  return (
    <>
      {newAccount && (
        <TableRow key={newAccount.id}>
          <TableCell component="th" scope="row">
            {newAccount.id}
          </TableCell>
          <TableCell>{newAccount.name}</TableCell>
          <TableCell>{newAccount.iban}</TableCell>
          <TableCell>{newAccount.status ? "Active" : "Inactive"}</TableCell>
          <TableCell>{newAccount.availableAmount}</TableCell>
          <TableCell>{new Date(newAccount.created).toLocaleString()}</TableCell>
          <TableCell>
            {new Date(newAccount.modified).toLocaleString()}
          </TableCell>
          <TableCell>
            <EditUser refreshAccount={refreshAccount} account={newAccount} />
          </TableCell>
          <TableCell>
            <ChangeStatus
              refreshAccount={refreshAccount}
              account={newAccount}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
