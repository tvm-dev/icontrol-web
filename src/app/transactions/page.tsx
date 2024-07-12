"use client";

import { useEffect, useState } from "react";
import AreaMonth from "../components/transactionsPages/areaMonths";
import { AreaBalanceMonth } from "../components/transactionsPages/areaBalanceMonths";
import AreaFilter from "../components/transactionsPages/areaFilters";
import TableTransactions from "../components/transactionsPages/tableTransactions";
import {
  getCurrentMonth,
  filterTransactionsByMonth,
  Transactions,
} from "@/utils/boniak/dateFilter";
import { api } from "@/app/services/api";
import { manualToken } from "@/app/services/token";

export default function PageTransactions() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [transactionFiltered, setTransactionFiltered] = useState<
    Transactions[]
  >([]);

  const [variableExpenses, setVariableExpenses] = useState(0);
  const [variableIncomes, setVariableIncomes] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [fixedIncomes, setFixedIncomes] = useState(0);
  const [investments, setInvestments] = useState(0);

  useEffect(() => {
    setTransactionFiltered(
      filterTransactionsByMonth(transactions, currentMonth)
    );
  }, [transactions, currentMonth]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    loadAllTransactions();
  }, []);

  async function loadAllTransactions() {
    try {
      const response = await api.get("/transactions", {
        params: { userID: "667f54419b1a5be227768419" },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      console.log("API response:", response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  }

  async function handleDelete(id: string) {
    const isConfirmed = window.confirm(
      `Você realmente quer apagar esta transação? Não será mais possível recuperá-la!`
    );

    if (!isConfirmed) return;

    try {
      await api.delete("transaction", {
        params: { id: id },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  }

  const updateTotals = (
    ve: number,
    vi: number,
    fe: number,
    fi: number,
    inv: number
  ) => {
    setVariableExpenses(ve);
    setVariableIncomes(vi);
    setFixedExpenses(fe);
    setFixedIncomes(fi);
    setInvestments(inv);
  };

  return (
    <>
      <div className="text-center">
        <AreaMonth
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          balance={0}
          incomes={0}
          expenses={0}
          investments={0}
        />
        <AreaBalanceMonth
          ve={variableExpenses}
          vi={variableIncomes}
          fe={fixedExpenses}
          fi={fixedIncomes}
          inv={investments}
        />
        <AreaFilter />
        <TableTransactions
          transactions={transactionFiltered}
          onDelete={handleDelete}
          updateTotals={updateTotals}
        />
      </div>
    </>
  );
}
