import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Transactions,
  getCurrentMonth,
  filterTransactionsByMonth,
  formatDateBr,
  parseDate,
} from "@/app/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/app/utils/formatCurrencies";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

type TableTransactionsProps = {
  transactions: Transactions[];
  updateTotals: (
    ve: number,
    vi: number,
    fe: number,
    fi: number,
    inv: number
  ) => void;
  filterType: string | null;
};

const typeMapping: Record<number, string> = {
  1: "😥 DV",
  2: "😍 RV",
  3: "😿 DF",
  4: "🤑 RF",
  5: "💹 Inv",
};

export default function TableTransactions({
  transactions,
  updateTotals,
  filterType,
}: TableTransactionsProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(() => {
    let filtered = filterTransactionsByMonth(transactions, currentMonth);

    if (filterType !== null) {
      filtered = filtered.filter(
        (transaction) => transaction.transactionType === filterType
      );
    }

    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let ve = 0;
    let vi = 0;
    let fe = 0;
    let fi = 0;
    let inv = 0;

    for (let transaction of filtered) {
      switch (parseInt(transaction.transactionType)) {
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
    }

    updateTotals(ve, vi, fe, fi, inv);
  }, [transactions, currentMonth, updateTotals, filterType]);

  if (!transactions || transactions.length === 0) {
    return <p className="py-5 text-center">Nenhuma transação encontrada!</p>;
  }

  const togglePaidStatus = async (
    transactionId: number,
    currentStatus: boolean
  ) => {
    try {
      await axios.put(`baseURL/transaction/${transactionId}`, {
        paid: !currentStatus,
      });

      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, paid: !currentStatus }
          : transaction
      );
      // Atualizar o estado local ou refazer a chamada API para atualizar transações
    } catch (error) {
      console.error("Erro ao atualizar o status da transação:", error);
    }
  };

  const transactionRows: JSX.Element[] = [];
  let currentHeader = "";

  transactions.forEach((transaction, index) => {
    const dateKey = formatDateBr(parseDate(transaction.date));

    if (dateKey !== currentHeader) {
      transactionRows.push(
        <tr key={`header-${transaction.id}`} className="border-2">
          <td colSpan={5} className="text-red-600 text-center text-sm">
            📅 {dateKey}
          </td>
        </tr>
      );
      currentHeader = dateKey;
    }

    transactionRows.push(
      <Link
        key={transaction.id}
        href={`/user/transactions/edit/${transaction.id}`}
        className="border-l-2"
        passHref
        legacyBehavior
      >
        <tr className="group cursor-pointer hover:bg-blue-100">
          <td className="p-2">{transaction.category}</td>
          <td className="p-2">
            {typeMapping[parseInt(transaction.description)]}
          </td>
          <td className="p-2">
            {typeMapping[parseInt(transaction.recurrent)]}
          </td>
          <td className="p-2">{typeMapping[parseInt(transaction)]}</td>
          <td className="p-2">{formatCurrencyBRL(transaction.amount)}</td>
          <td className="p-2">{transaction.recurrent ? "Sim" : "Não"}</td>
          <td className="p-2">
            {transaction.isPaid ? (
              <FaThumbsUp
                onClick={(e) => {
                  e.stopPropagation();
                  togglePaidStatus(transaction.id, transaction.isPaid);
                }}
                className="text-green-500 cursor-pointer"
              />
            ) : (
              <FaThumbsDown
                onClick={(e) => {
                  e.stopPropagation();
                  togglePaidStatus(transaction.id, transaction.isPaid);
                }}
                className="text-red-500 cursor-pointer"
              />
            )}
          </td>
        </tr>
      </Link>
    );
  });

  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="w-full max-w-4xl">
        <p className="text-center border p-2 mb-2 font-thin border-amber-400">
          Transações{" "}
        </p>
        <table className="w-full divide-y divide-gray-200">
          <tbody>{transactionRows}</tbody>
        </table>
      </div>
    </div>
  );
}
