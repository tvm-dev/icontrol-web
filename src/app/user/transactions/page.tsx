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
} from "@/app/utils/boniak/dateFilter";
import { api } from "../services/api";
import { manualToken } from "../services/token";

export default function PageTransactions() {
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [transactionFiltered, setTransactionFiltered] = useState<
    Transactions[]
  >([]);
  const [variableExpenses, setVariableExpenses] = useState<number>(0);
  const [variableIncomes, setVariableIncomes] = useState<number>(0);
  const [fixedExpenses, setFixedExpenses] = useState<number>(0);
  const [fixedIncomes, setFixedIncomes] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [filterType, setFilterType] = useState<string | null>(null);

  const calculateTotals = (filteredTransactions: Transactions[]) => {
    let ve = 0,
      vi = 0,
      fe = 0,
      fi = 0,
      inv = 0;

    filteredTransactions.forEach((transaction) => {
      switch (parseInt(transaction.type)) {
        case 1:
          ve += transaction.amount;
          break;
        case 2:
          vi += transaction.amount;
          break;
        case 3:
          fe += transaction.amount;
          break;
        case 4:
          fi += transaction.amount;
          break;
        case 5:
          inv += transaction.amount;
          break;
        default:
          break;
      }
    });

    setVariableExpenses(ve);
    setVariableIncomes(vi);
    setFixedExpenses(fe);
    setFixedIncomes(fi);
    setInvestments(inv);
  };

  useEffect(() => {
    const loadAllTransactions = async () => {
      try {
        const response = await api.get("/transactions", {
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };
    loadAllTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      setTransactionFiltered(
        filterTransactionsByMonth(transactions, currentMonth)
      );
    }
  }, [transactions, currentMonth]);

  useEffect(() => {
    if (transactionFiltered.length > 0) {
      calculateTotals(transactionFiltered);
    }
  }, [transactionFiltered]);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Você realmente quer apagar esta transação? Não será mais possível recuperá-la!"
    );
    if (!isConfirmed) return;

    try {
      await api.delete("/transaction", {
        params: { id: id },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleFilterChange = (type: string | null) => {
    setFilterType(type);
  };

  const filteredTransactions = filterType
    ? transactionFiltered.filter(
        (transaction) => transaction.type.toString() === filterType
      )
    : transactionFiltered;

  const handleUpdateTotals = (
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
    <div className="p-4 md:p-6 lg:p-8 space-y-4">
      <AreaMonth
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />
      <AreaBalanceMonth
        ve={variableExpenses}
        vi={variableIncomes}
        fe={fixedExpenses}
        fi={fixedIncomes}
        inv={investments}
      />
      <AreaFilter onFilterChange={handleFilterChange} />
      <TableTransactions
        transactions={filteredTransactions}
        filterType={filterType}
        updateTotals={handleUpdateTotals}
      />
    </div>
  );
}
