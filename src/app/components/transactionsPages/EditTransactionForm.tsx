"use client";
//-----------------------------------------------------
import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { api } from "@/app/services/api";
import { manualToken } from "@/app/services/token";
import { useRouter } from "next/navigation";

interface EditTransactionProps {
  id: number;
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
  paid,
  details,
}: EditTransactionProps) {
  const [formData, setFormData] = useState<EditTransactionProps>({
    id,
    description,
    amount,
    date,
    type,
    payment,
    category,
    paid,
    details,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      //const idNUmber = parseInt(id as any, 10);
      const idNumber = parseInt(id as any, 10);

      try {
        const response = await api.get(`/transaction`, {
          params: { id: idNumber },
          headers: { Authorization: `Bearer ${manualToken}` },
        });

        console.log("API Response:", response); // Verifique a resposta completa
        console.log("Data:", response.data); // Verifique os dados específicos

        setFormData({
          ...response.data,
          paid: !!response.data.paid, // Convertendo para booleano, se necessário
        });
      } catch (error) {
        console.error("Erro ao carregar transação:", error);
        setError("Falha ao carregar a transação solicitada!");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "paid" ? value === "true" : value,
    }));
  };

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  const handleEditTransaction = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"), // Ensure it's a number
      date: dateRef.current?.value || "",
      type: parseFloat(typeRef.current?.value || "0"), // Ensure it's a number
      payment: paymentRef.current?.value || "",
      category: categoryRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: formData.paid,
    };

    try {
      const response = await api.put(`/transaction`, transactionData, {
        params: { id },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      router.push("/transactions");

      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao editar transação:",
          error.response?.data || error.message
        );
        setError("Erro ao editar transação. Tente novamente mais tarde.");
      } else {
        console.error("Erro desconhecido:", error);
        setError("Erro desconhecido. Tente novamente mais tarde.");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-center text-blue-500 mt-2">
        Alterando Transação...
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
              <label className="text-xs">Pago:</label>
              <select
                name="paid"
                value={formData.paid ? "true" : "false"} // Converte booleano para string
                onChange={handleInputChange}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
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

          {isLoading ? (
            <p className="text-center my-4">Salvando alterações...</p>
          ) : (
            <input
              type="submit"
              value="Salvar"
              className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-900"
            />
          )}
        </form>
        <p className="mt-10 text-center w-full ">
          <a
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
            href="/transactions"
          >
            Cancelar
          </a>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </>
  );
}
