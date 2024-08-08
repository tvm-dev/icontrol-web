"use client";

import { api } from "../../services/api";
import { manualToken, userID } from "../../services/token";
import axios from "axios";
import { FormEvent, useRef, useEffect, useState } from "react";
import { data } from "../../components/DropDownMenu/data";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const typeMapping: { [key: string]: number } = {
  Despesa: 1,
  Receita: 2,
  Investimento: 3,
};

const reverseTypeMapping: { [key: number]: string } = Object.fromEntries(
  Object.entries(typeMapping).map(([key, value]) => [value, key])
);

export default function NewTransactionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  const [selectedType, setSelectedType] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false); // Estado para recorrência
  const [recurrenceType, setRecurrenceType] = useState<string>("");

  const handleTypeChange = (typeNumber: number) => {
    setSelectedType(typeNumber);

    const typeString = reverseTypeMapping[typeNumber];
    const typeData = data.transactionsType.find((t) => t.type === typeString);
    if (typeData) {
      setCategories(typeData.categories);
    } else {
      setCategories([]);
    }
    setSelectedCategory("");
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const formatToBRL = (value: string) => {
    value = value.replace(/\D/g, "");
    value = (parseInt(value) / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return value;
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/\./g, "").replace(",", ".");
    setAmount(formatToBRL(value));
  };

  const handleRegisterTransaction = async (event: FormEvent) => {
    event.preventDefault();

    const numericAmount = parseFloat(
      amount.replace(/\./g, "").replace(",", ".")
    );

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: numericAmount,
      date: dateRef.current?.value || "",
      payment: paymentRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: isPaid,
      type: selectedType,
      category: selectedCategory,
      recurrent: isRecurrent,
      recurrenceType: isRecurrent ? recurrenceType : null,
    };

    try {
      const response = await api.post("/transaction", transactionData, {
        params: { userID: userID },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      if (response.status === 200) {
        onClose(); // Fecha o modal após a transação ser salva
        window.location.href = "/user/transactions";
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
  };

  useEffect(() => {
    const elements = [
      descriptionRef.current,
      amountRef.current,
      dateRef.current,
      paymentRef.current,
      detailsRef.current,
    ];

    elements.forEach((el) => {
      if (el) {
        el.setAttribute("spellcheck", "false");
        el.removeAttribute("data-ms-editor");
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="text-red-500 absolute top-4 right-4"
        >
          Fechar
        </button>
        <h1 className="font-bold text-2xl text-center text-blue-500 pt-10">
          Nova Transação
        </h1>
        <form
          className="flex flex-col w-full"
          onSubmit={handleRegisterTransaction}
        >
          <div className="flex justify-center mb-4">
            {Object.entries(typeMapping).map(([key, value]) => (
              <button
                key={value}
                type="button"
                onClick={() => handleTypeChange(value)}
                className={`px-4 py-2 mx-1 ${
                  selectedType === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                } rounded`}
              >
                {key}
              </button>
            ))}
          </div>

          <label className="text-xs">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            required
            className="bg-blue-300 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Valor em R$:</label>
              <input
                ref={amountRef}
                value={amount}
                onChange={handleAmountChange}
                type="text"
                required
                placeholder="R$ 0,00"
                className="bg-blue-300 border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                required
                type="date"
                className="bg-blue-300 border border-1 w-full mb-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2 mb-2">
              {isPaid ? (
                <FaThumbsUp
                  className="text-green-500 cursor-pointer"
                  onClick={() => setIsPaid(false)}
                />
              ) : (
                <FaThumbsDown
                  className="text-red-500 cursor-pointer"
                  onClick={() => setIsPaid(true)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Conta/Cartão:</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={!selectedType}
                className="bg-blue-400 border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="">Selecione</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs">Categoria:</label>
              <select
                ref={paymentRef}
                className="bg-blue-300 border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="5">Outros</option>
              </select>
            </div>
          </div>

          {/* Checkbox para recorrência */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isRecurrent}
              onChange={(e) => setIsRecurrent(e.target.checked)}
              className="mr-2"
            />
            <label className="text-xs">Transação Recorrente</label>
          </div>

          {/* Dropdown para tipo de recorrência */}
          {isRecurrent && (
            <div className="flex flex-col mb-2">
              <label className="text-xs">Tipo de Recorrência:</label>
              <select
                value={recurrenceType}
                onChange={(e) => setRecurrenceType(e.target.value)}
                className="bg-blue-300 border border-1 p-2 rounded w-full"
              >
                <option value="">Selecione</option>
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
                <option value="Semanal">Semanal</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Salvar Transação
          </button>
        </form>
      </div>
    </div>
  );
}
