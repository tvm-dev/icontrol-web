// src/pages/NewTransaction.tsx
"use client";

import { api } from "@/app/services/api";
import { manualToken, userID } from "@/app/services/token";
import axios from "axios";
import { FormEvent, useRef, useEffect, useState } from "react";
import DependentDropdown, {
  typeMapping,
} from "@/app/components/DropDownMenu/Menu";

export default function NewTransaction() {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  const [selectedType, setSelectedType] = useState("Despesa Variável");
  const [selectedCategory, setSelectedCategory] = useState("");

  // const typeMapping: { [key: string]: number } = {
  //   "Despesa Variável": 1,
  //   "Receita Variável": 2,
  //   "Despesa Fixa": 3,
  //   "Receita Fixa": 4,
  //   Investimento: 5,
  // };

  async function handleRegisterTransaction(event: FormEvent) {
    event.preventDefault();

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"),
      date: dateRef.current?.value || "",
      payment: paymentRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: statusRef.current?.value === "1",
      type: typeMapping[selectedType] || 0,
      category: selectedCategory,
    };

    try {
      const response = await api.post("/transaction", transactionData, {
        params: { userID: userID },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      if (response.status === 200) {
        alert("Transação Criada com Sucesso!");
        window.location.href = "/transactions";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao carregar transações:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  }

  useEffect(() => {
    const elements = [
      descriptionRef.current,
      amountRef.current,
      dateRef.current,
      paymentRef.current,
      detailsRef.current,
      statusRef.current,
    ];

    elements.forEach((el) => {
      if (el) {
        el.setAttribute("spellcheck", "false");
        el.removeAttribute("data-ms-editor");
      }
    });
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl text-center text-blue-500 mt-2">
        Nova Transação
      </h1>
      <div className="w-full mb-2 p-2 rounded">
        <form
          className="flex flex-col mx-12 my-2"
          onSubmit={handleRegisterTransaction}
        >
          {/* Description */}
          <label className="text-xs">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            required
            className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              {/* Amount */}
              <label className="text-xs">Valor:</label>
              <input
                ref={amountRef}
                defaultValue="1"
                type="number"
                required
                className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Date */}
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                required
                type="date"
                className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Dependent Dropdown */}
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
                ref={statusRef}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="1">Pago</option>
                <option value="2">Pendente</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <label className="text-xs">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            className="border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <input
            type="submit"
            value="Salvar Transação"
            className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-500"
          />
        </form>
      </div>
    </>
  );
}
