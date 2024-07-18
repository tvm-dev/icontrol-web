import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Transactions,
  getCurrentMonth,
  filterTransactionsByMonth,
  formatDateBr,
  parseDate,
} from "@/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";
import { FcEditImage, FcFullTrash } from "react-icons/fc";

type TableTransactionsProps = {
  transactions: Transactions[];
  onDelete: (id: string) => void;
  updateTotals: (
    ve: number,
    vi: number,
    fe: number,
    fi: number,
    inv: number
  ) => void;
};

const typeMapping: Record<number, string> = {
  1: "😒 DV",
  2: "😍 RV",
  3: "😿 DF",
  4: "🤑 RF",
  5: "💹 Inv",
};

const categoryMapping: Record<number, string> = {
  1: "Habitação",
  2: "Transporte",
  3: "Alimentação",
  4: "Saúde",
  5: "Educação",
  6: "Lazer",
  7: "Vestuário",
  8: "Comunicação",
  9: "Seguros",
  10: "Impostos e Taxas",
  11: "Dívidas e Empréstimos",
  12: "Presentes e Doações",
  13: "Despesas Pessoais",
  14: "Animais de Estimação",
  15: " --- ",
  16: "Salário",
  17: "Auxilios",
  18: "Vendas",
  19: "Rendimentos",
  20: "Investimentos",
  21: "Outros",
};

export default function TableTransactions({
  transactions,
  onDelete,
  updateTotals,
}: TableTransactionsProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(() => {
    const filtered = filterTransactionsByMonth(transactions, currentMonth);

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

    updateTotals(ve, vi, fe, fi, inv);
  }, [transactions, currentMonth, updateTotals]);

  if (!transactions || transactions.length === 0) {
    return <p className="py-5">Nenhuma transação encontrada!</p>;
  }

  // Array para armazenar os elementos JSX das transações
  const transactionRows: JSX.Element[] = [];

  // Adicionar cabeçalho de mês atual
  let currentHeader = "";
  transactions.forEach((transaction) => {
    //const dateKey = formatDateBr(new Date(transaction.date));
    const dateKey = formatDateBr(parseDate(transaction.date));

    // Adicionar cabeçalho de data se mudou
    if (dateKey !== currentHeader) {
      transactionRows.push(
        <tr key={dateKey} className="bg-gray-100">
          <td
            colSpan={6}
            className="text-blue-500 font-semibold p-2 text-sm border-r-2 align-middle"
          >
            📅 {dateKey}
          </td>
        </tr>
      );
      currentHeader = dateKey;
    }

    // Adicionar linha de transação
    transactionRows.push(
      <tr
        key={transaction.id}
        className="group cursor-pointer hover:bg-blue-100"
      >
        <td>{typeMapping[parseInt(transaction.type)]}</td>
        <td>{categoryMapping[parseInt(transaction.category)]}</td>
        <td>{transaction.description}</td>
        <td>{formatCurrencyBRL(transaction.amount)}</td>
        <td className="p-2 hover:bg-red-500">
          <button
            className=""
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
          >
            <FcFullTrash size={25} />
          </button>
        </td>
        <td className=" hover:bg-red-300 p-2">
          <Link href={`/transactions/edit/${transaction.id}`}>
            <FcEditImage title="Editar" size={25} />
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="flex justify-center overflow-x-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>{transactionRows}</tbody>
      </table>
    </div>
  );
}
