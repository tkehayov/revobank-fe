import { TransfersApi } from "../api/transfers";
import { TransfersList } from "../components/TransfersList/TransfersList";
import { useEffect, useState } from "react";
import { NewTransfer } from "../components/NewTransfer/NewTransfer";

export function TransferPage() {
  const [transfers, setTransfers] = useState([]);

  async function fetchTransfers() {
    const transfersResponse = await TransfersApi.fetchTransfers();
    if (transfersResponse !== 0) {
      setTransfers(transfersResponse);
    }
  }

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <>
      <NewTransfer fetchTransfers={fetchTransfers} />
      <TransfersList transfers={transfers} />
    </>
  );
}
