import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export function TransfersListItem({ transfer }) {
  return (
    <>
      {transfer && (
        <TableRow key={transfer.id}>
          <TableCell component="th" scope="row">
            {transfer.id}
          </TableCell>
          <TableCell>{transfer.fromAccount.name}</TableCell>
          <TableCell>{transfer.beneficiaryAccount.name}</TableCell>
          <TableCell>{transfer.type}</TableCell>
          <TableCell>{transfer.amount}</TableCell>
          <TableCell>{new Date(transfer.created).toLocaleString()}</TableCell>
          <TableCell>{new Date(transfer.modified).toLocaleString()}</TableCell>
        </TableRow>
      )}
    </>
  );
}
