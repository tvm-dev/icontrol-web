import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; // Importar axios para chamadas de API
import {
  Transactions,
  getCurrentMonth,
  filterTransactionsByMonth,
  formatDateBr,
  parseDate,
} from "@/app/utils/boniak/dateFilter";
import { formatCurrentMonth } from "@/app/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/app/utils/formatCurrencies";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Importar ícones
import { api } from "../../services/api";

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
  5: "💹 In",
};

export default function TableTransactions({
  transactions,
  updateTotals,
  filterType,
}: TableTransactionsProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  // ===============================================================================
  useEffect(() => {
    let filtered = filterTransactionsByMonth(transactions, currentMonth);

    if (filterType !== null) {
      filtered = filtered.filter(
        (transaction) => transaction.type === filterType
      );
    }

    // Ordenar transações por data decrescente
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calcular totais para todas as transações filtradas
    let ve = 0;
    let vi = 0;
    let fe = 0;
    let fi = 0;
    let inv = 0;

    for (let transaction of filtered) {
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
    }

    // Chame updateTotals com todos os cinco parâmetros
    updateTotals(ve, vi, fe, fi, inv);
  }, [transactions, currentMonth, updateTotals, filterType]);

  // ===============================================================================

  if (!transactions || transactions.length === 0) {
    return <p className="py-5 text-center">Nenhuma transação encontrada!</p>;
  }

  // Função para alternar o estado de "paid"
  const togglePaidStatus = async (
    transactionId: number,
    currentStatus: boolean
  ) => {
    try {
      // Chamada API para atualizar o status no backend
      await axios.put(`baseURL/transaction/${transactionId}`, {
        paid: !currentStatus,
      });

      // Atualize o estado no frontend (você pode optar por fazer um refetch das transações ou atualizar localmente)
      // Para simplificação, assumiremos que o estado é atualizado localmente
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, paid: !currentStatus }
          : transaction
      );
      // Aqui, você deve atualizar o estado que mantém as transações (supondo que `transactions` seja um estado local ou vindo de props)
      //updateTotals(updatedTransactions);
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
        <tr key={`header-${transaction.id}`} className="border-2 ">
          <td
            colSpan={5} // Adicionar uma coluna extra para a mãozinha
            className="text-blue-500 text-center font-semibold p-2 text-sm border-l-2 align-middle"
          >
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
          <td className="p-2">{typeMapping[parseInt(transaction.type)]}</td>
          <td className="p-2">{transaction.category}</td>
          <td className="p-2">{transaction.description}</td>
          <td className="p-2">{formatCurrencyBRL(transaction.amount)}</td>
          <td className="p-2">
            {transaction.paid ? (
              <FaThumbsUp
                onClick={(e) => {
                  e.stopPropagation();
                  togglePaidStatus(transaction.id, transaction.paid);
                }}
                className="text-green-500 cursor-pointer"
              />
            ) : (
              <FaThumbsDown
                onClick={(e) => {
                  e.stopPropagation();
                  togglePaidStatus(transaction.id, transaction.paid);
                }}
                className="text-red-500 cursor-pointer"
              />
            )}
          </td>
        </tr>
      </Link>
    );
  });

  // console.log("Transações recebidas:", transactions);
  // console.log("Tipo de filtro:", filterType);
  // console.log("Data atual:", currentMonth);
  // console.log("Tipo de filtro:", filterType);

  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="w-full max-w-4xl">
        <table className="w-full divide-y divide-gray-200">
          <tbody>{transactionRows}</tbody>
        </table>
      </div>
    </div>
  );
}
