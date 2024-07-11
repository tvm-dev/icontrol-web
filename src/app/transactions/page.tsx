"use client";

import { useEffect, useState } from "react";
import { manualToken } from "../services/token";
import { api } from "@/app/services/api";

import {
  getCurrentMonth,
  Transactions,
  filterTransactionsByMonth,
} from "@/utils/boniak/dataFilter";
import AreaMonth from "../components/transactionsPages";
import AreaBalanceMonth from "../components/transactionsPages/areaMonths";
import AreaFilter from "../components/transactionsPages/areaFilters";
import AreaTransactions from "../components/transactionsPages/tableTransactions/page";
import RowTransaction from "../components/transactionsPages/rowTransaction";

export default function PageTransactions() {
  //Working with datas and filter:
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [transactionFiltered, setTransactionFiltered] = useState<
    Transactions[]
  >([]);
  //const [listTransactions, setListTransactions] = useState(transactions);

  useEffect(() => {
    setTransactionFiltered(
      filterTransactionsByMonth(transactions, currentMonth)
    );
  }, [transactions, currentMonth]);

  //Listing all transactions from database:
  useEffect(() => {
    loadAllTransactions();
  }, []);

  async function loadAllTransactions() {
    try {
      const response = await api.get("/transactions", {
        params: { userID: "667f54419b1a5be227768419" },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      //console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }

  async function handleDelete(id: string) {
    //Request user confirmation for delete transaction:
    const isConfirmed = window.confirm(
      ` Você realmente quer apagar esta transação? Não será mais possível recuperá-la!`
    );

    if (!isConfirmed) return;

    try {
      //await api.delete(`/transaction/${id}`, {
      await api.delete("transaction", {
        params: { id: id },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      //Atualize o estado local removendo a transação deletada
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  }

  return (
    <>
      <div className="text-center">
        <AreaMonth />
        <AreaBalanceMonth />
        <AreaFilter />
        <AreaTransactions />
        <RowTransaction />
      </div>
    </>
  );
}
