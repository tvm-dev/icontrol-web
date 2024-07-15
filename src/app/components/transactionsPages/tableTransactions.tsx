import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Transactions,
  getCurrentMonth,
  filterTransactionsByMonth,
  formatDateBr,
} from "@/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";
import { FcFullTrash } from "react-icons/fc";

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
  const [groupedTransactions, setGroupedTransactions] = useState<
    Record<string, Transactions[]>
  >({});

  useEffect(() => {
    const filtered = filterTransactionsByMonth(transactions, currentMonth);

    // Ordenar transações por data decrescente
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Agrupar transações por data (formato: AAAA-MM-DD)
    const grouped: Record<string, Transactions[]> = {};
    filtered.forEach((transaction) => {
      const dateKey = formatDateBr(new Date(transaction.date));
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });

    setGroupedTransactions(grouped);

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

  // Obter as chaves das datas das transações agrupadas
  const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("-"));
    const dateB = new Date(b.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  const handleRowClick = (id: string) => {
    // Redirecionar para a página de edição da transação
    window.location.href = `/edit/${id}`;
  };

  return (
    <div className="flex justify-center overflow-x-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
          {sortedDateKeys.map((dateKey) => (
            <React.Fragment key={dateKey}>
              <tr></tr>
              {groupedTransactions[dateKey].map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="group cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRowClick(transaction.id)}
                >
                  {index === 0 && (
                    <td
                      className="text-blue-900 font-bold p-2 text-5xl border-r-2 align-middle"
                      rowSpan={groupedTransactions[dateKey].length}
                    >
                      {dateKey}
                      <br />
                    </td>
                  )}
                  <td className="border-b">
                    {typeMapping[parseInt(transaction.type)]}
                  </td>
                  <td className="border-b">
                    {categoryMapping[parseInt(transaction.category)]}
                  </td>
                  <td className="border-b border-gray-200 text-sm">
                    {transaction.description}
                  </td>
                  <td className="border-b border-gray-200 text-sm">
                    {formatCurrencyBRL(transaction.amount)}
                  </td>
                  <td className="p-2 hover:bg-red-500">
                    <button
                      className="font-thin mr-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(transaction.id);
                      }}
                    >
                      <FcFullTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <hr />
      </table>
    </div>
  );
}
