"use client";
//============================================================================
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
  // Estado para armazenar o tipo de filtro selecionado
  const [filterType, setFilterType] = useState<string | null>(null);

  // Define a função calculateTotals
  const calculateTotals = (filteredTransactions: Transactions[]) => {
    let ve = 0,
      vi = 0,
      fe = 0,
      fi = 0,
      inv = 0;

    filteredTransactions.forEach((transaction) => {
      switch (parseInt(transaction.type)) {
        case 1: // Despesa variável
          ve += transaction.amount;
          break;
        case 2: // Receita variável
          vi += transaction.amount;
          break;
        case 3: // Despesa fixa
          fe += transaction.amount;
          break;
        case 4: //Receita fixa
          fi += transaction.amount;
          break;
        case 5: // Investimento
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
          params: { userID: "667f54419b1a5be227768419" },
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        console.log("API response:", response.data);
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
      calculateTotals(transactionFiltered); // Chama calculateTotals quando transactionFiltered é atualizado
    }
  }, [transactionFiltered]);

  //--------delete----------------
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      `Você realmente quer apagar esta transação? Não será mais possível recuperá-la!`
    );

    if (!isConfirmed) return;

    try {
      await api.delete("/transaction", {
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
  };
  //change month-------------------------------------------
  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  //filter by transactions type:-------------------------------
  const handleFilterChange = (type: string | null) => {
    setFilterType(type);
  };

  const filteredTransactions = filterType
    ? transactionFiltered.filter(
        (transaction) => transaction.type.toString() === filterType
      )
    : transactionFiltered;

  return (
    <div className="text-center">
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
        transactions={transactionFiltered}
        onDelete={handleDelete}
        updateTotals={() => calculateTotals(transactionFiltered)} // Chama calculateTotals quando updateTotals é chamado
      />
    </div>
  );
}
