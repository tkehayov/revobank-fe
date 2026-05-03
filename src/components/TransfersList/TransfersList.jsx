import { TransfersListItem } from "../TransferListItem/TransferListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export function TransfersList({ transfers }) {
  return (
    <>
      {transfers && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Account From</strong>
                </TableCell>
                <TableCell>
                  <strong>Account Beneficiary</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Created</strong>
                </TableCell>
                <TableCell>
                  <strong>Modified</strong>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfers.map((transfer) => (
                <TransfersListItem key={transfer.id} transfer={transfer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
