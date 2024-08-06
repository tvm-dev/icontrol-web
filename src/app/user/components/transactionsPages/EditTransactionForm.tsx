"use client";

import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { api } from "../../services/api";
import { manualToken } from "../../services/token";
import { useRouter } from "next/navigation";
import DependentDropdown from "../DropDownMenu/Menu";

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

export default function EditTransactionForm({
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
    category,
    payment,
    paid,
    details,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const idNumber = parseInt(id as any, 10);

      try {
        const response = await api.get(`/transaction`, {
          params: { id: idNumber },
          headers: { Authorization: `Bearer ${manualToken}` },
        });

        setFormData({
          ...response.data,
          paid: !!response.data.paid,
          type: response.data.type, // Certifique-se de que esses campos existem
          category: response.data.category,
        });

        // Atualiza os estados selectedType e selectedCategory com base nos dados retornados
        setSelectedType(response.data.type.toString());
        setSelectedCategory(response.data.category);
      } catch (error) {
        console.error("Erro ao carregar transação:", error);
        setError("Falha ao carregar a transação solicitada!");
      }
    };

    fetchData();
  }, [id]);

  //========================================================

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
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  // ===

  const handleEditTransaction = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const transactionData = {
      id, // Incluindo o ID no corpo da requisição
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"),
      date: dateRef.current?.value || "",
      type: parseFloat(typeRef.current?.value || "0"),
      payment: paymentRef.current?.value || "",
      category: categoryRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: statusRef.current?.value === "1", // Ajustando para boolean
    };

    try {
      console.log("Dados da transação para atualização:", transactionData); // Adicione esta linha para depuração

      const response = await api.put(`/transaction`, transactionData, {
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      router.push("/user/transactions");

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
        Atualizar Transação...
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

          <DependentDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {/* Payment and Status */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Pago com:</label>
              <select
                ref={paymentRef}
                className="border border-1 mb-2 p-2 rounded w-full"
                defaultValue={formData.payment}
              >
                <option value="1">Débito</option>
                <option value="2">Crédito</option>
                <option value="3">Pix</option>
                <option value="4">Dinheiro</option>
                <option value="5">Outros</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs">Status</label>

              <select
                name="paid"
                value={formData.paid.toString()} // Convert to string here
                onChange={handleInputChange}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="true">Pago</option>
                <option value="false">Pendente</option>
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
        <p className="mt-10 text-center w-full">
          <a
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
