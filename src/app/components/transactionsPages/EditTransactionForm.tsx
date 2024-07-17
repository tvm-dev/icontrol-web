"use client";
//-----------------------------------------------------

import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { api } from "@/app/services/api";
import { manualToken } from "@/app/services/token";

interface EditTransactionProps {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: number;
  payment: string;
  category: string;
  details: string;
  paid: boolean;
}

export default function EditTransaction({
  id,
  description,
  amount,
  date,
  type,
  payment,
  category,
  details,
  paid,
}: EditTransactionProps) {
  const [formData, setFormData] = useState<EditTransactionProps>({
    id,
    description,
    amount,
    date,
    type,
    payment,
    category,
    details,
    paid,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/transaction`, {
          params: { id },
          headers: { Authorization: `Bearer ${manualToken}` },
        });

        const data = response.data;

        setFormData({
          ...data,
        });
      } catch (error) {
        setError("Falha ao carregar a transação solicitada!");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  async function handleEditTransaction(event: FormEvent) {
    event.preventDefault();

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"), // Ensure it's a number
      date: dateRef.current?.value || "",
      type: parseFloat(typeRef.current?.value || "0"), // Ensure it's a number
      payment: paymentRef.current?.value || "",
      category: categoryRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: statusRef.current?.value === "y" ? true : false,
    };

    console.log("Dados da transação:", transactionData);

    try {
      // Add your API call to update the transaction here
      // Example:
      // const response = await api.put(`/transaction/${id}`, transactionData, {
      //   headers: { Authorization: `Bearer ${manualToken}` },
      // });
      // Handle success or errors accordingly
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao editar transação:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  }

  return (
    <>
      <h1 className="font-bold text-2xl text-center text-blue-500 mt-2">
        Editar Transação: {id}
      </h1>
      <div className="w-full mb-2 p-2 rounded">
        <form
          className="flex flex-col mx-12 my-2"
          onSubmit={handleEditTransaction}
        >
          <label className="text-xs">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-full">
              <label className="text-xs">Valor:</label>
              <input
                ref={amountRef}
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Tipo:</label>
              <select
                ref={typeRef}
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="1">Despesa Variável</option>
                <option value="2">Receita Variável</option>
                <option value="3">Despesa Fixa</option>
                <option value="4">Receita Fixa</option>
                <option value="5">Investimento</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Pago com:</label>
              <select
                ref={paymentRef}
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="1">Débito</option>
                <option value="2">Crédito</option>
                <option value="3">Pix</option>
                <option value="4">Dinheiro</option>
                <option value="5">Outros</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Categoria:</label>
              <select
                ref={categoryRef}
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="1">Habitação</option>
                <option value="2">Transporte</option>
                <option value="3">Alimentação</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Status</label>
              <select
                ref={statusRef}
                name="status"
                value={formData.paid ? "1" : "2"}
                onChange={handleInputChange}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="1">Pago</option>
                <option value="2">Pendente</option>
              </select>
            </div>
          </div>

          <label className="text-xs">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="submit"
            value="Salvar"
            className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-500"
          />
        </form>
      </div>
    </>
  );
}
