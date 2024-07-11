"use client";

import { useEffect, useState } from "react";
import { manualToken } from "@/app/services/token";
import { api } from "@/app/services/api";

import {
  getCurrentMonth,
  Transactions,
  filterTransactionsByMonth,
  formatDateBr,
} from "@/utils/boniak/dataFilter";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";

export default function AllTransactions() {
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
      console.log(response.data);
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

  // Verifica se transactions não está definido ou é vazio
  if (!transactions || transactions.length === 0) {
    return <p className=" py-5 ">Nenhuma transação encontrada!</p>; // Ou outra mensagem de carregamento
  }

  return (
    <div className="w-full overflow-x-auto flex ">
      <table className="min-w-full border-gray-200 ">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dia
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Desc
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {formatDateBr(new Date(transaction.date))}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {transaction.category}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {transaction.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {formatCurrencyBRL(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
