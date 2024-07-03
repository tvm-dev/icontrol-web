"use client";

import { useEffect, useState } from "react";
import { manualToken } from "../services/token";
import { api, token } from "@/app/services/api";
import { FiTrash } from "react-icons/fi";

interface TransactionsProps {
  id: string;
  description: string;
  amount: number;
  date: string;
  payment: string;
  category: string;
  type: number;
  details: string;
  paid: boolean;
}

export default function GetAllTransactions() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

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
      <h1 className="my-5 text-center text-2xl font-bold ">Todas Transações</h1>

      <div className="flex justify-center">
        {/* Type ====================================== */}
        <label className="p-1">Navegue por mês: </label>
        <select className="">
          <option value="0"></option>
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
        {/* End */}
      </div>

      <section className="flex flex-col mr-2 gap-5">
        {transactions.map((transaction, id) => (
          <div
            key={transaction.id}
            className="bg-blue-100 border border-indigo-900 m-5 p-5 
            hover:scale-105 transition duration-500 hover:bg-blue-200 "
          >
            <article className=" rounded p-1 relative">
              <p>
                <span className="font-medium">Descrição: </span>
                {transaction.description}
              </p>
              <p>
                <span className="font-medium">Valor: R$ </span>
                {transaction.amount}
              </p>
              <p>
                <span className="font-medium">Data: </span>
                {transaction.date}
              </p>
              <p>
                <span className="font-medium">Tipo: </span>
                {transaction.type}
              </p>
              <p>
                <span className="font-medium">Forma de Pagamento: </span>
                {transaction.payment}
              </p>
              <p>
                <span className="font-medium">Categoria: </span>
                {transaction.category}
              </p>
              <p>
                <span className="font-medium">Detalhes: </span>
                {transaction.details}
              </p>
              <p>
                <span className="font-medium">Pago: </span>
                {transaction.paid ? "Sim" : "Não"}
              </p>

              <button
                className="rounded absolute right-0 bg-black p-2 top-0"
                onClick={() => handleDelete(transaction.id)}
              >
                <FiTrash size={20} color="red" />
              </button>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
