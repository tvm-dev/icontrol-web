"use client";
import { api } from "../../services/api";
import { manualToken, userID } from "../../services/token";
import axios from "axios";
import { FormEvent, useRef, useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaWindowClose } from "react-icons/fa";
import { getCurrentDate } from "@/app/utils/boniak/dateFilter";

const typeMapping: { [key: string]: number } = {
  Despesa: 1,
  Receita: 2,
  Investimento: 3,
};

export default function NewTransactionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const transactionTypeRef = useRef<HTMLSelectElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const isPaidRef = useRef<HTMLInputElement | null>(null);
  const bankCardRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const recurrencyRef = useRef<HTMLSelectElement | null>(null);
  const typeRecurrencyRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  const [selectedType, setSelectedType] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [bankAccounts, setBankAccounts] = useState<
    { id: number; name: string }[]
  >([]);
  const [amount, setAmount] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [recurrenceType, setRecurrenceType] = useState<string>("");
  //===============================================ok

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bank Accounts from the API
        const bankAccountsResponse = await api.get("/bankaccounts", {
          params: { userID: userID },
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setBankAccounts(bankAccountsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
      // Fetch categories and accounts from the API
      const categoriesResponse = await api.get("/categories", {
        params: { userID: userID },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setCategories(categoriesResponse.data);
    };

    fetchData();
  }, []);
  //===============================================ok
  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.value = getCurrentDate(); // Define a data atual
    }
  }, []);
  //=================================================
  const handleTypeChange = (typeNumber: number) => {
    setSelectedType(typeNumber);
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
      transactionType: selectedType,
      description: descriptionRef.current?.value || "",
      amount: numericAmount,
      date: dateRef.current?.value || "",
      isPaid: isPaid,
      category: selectedCategory,
      recurrent: isRecurrent,
      typeRecurrent: isRecurrent ? recurrenceType : null,
      details: detailsRef.current?.value || "",
      userID: userID,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-0">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative z-50">
        <button
          onClick={onClose}
          className="text-red-500 absolute top-4 right-4"
        >
          <FaWindowClose />
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

          <div className="flex flex-wrap justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Valor em R$:</label>
              <input
                ref={amountRef}
                value={amount}
                onChange={handleAmountChange}
                type="text"
                required
                placeholder="R$ 0,00"
                className="bg-blue-300 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                required
                type="date"
                className="bg-blue-300 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {isPaid ? (
                <FaThumbsUp
                  className="text-green-500 cursor-pointer"
                  onClick={() => setIsPaid(!isPaid)}
                />
              ) : (
                <FaThumbsDown
                  className="text-red-500 cursor-pointer"
                  onClick={() => setIsPaid(!isPaid)}
                />
              )}
              <span className="text-xs">Pago</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Conta/Cartão:</label>
              <select
                ref={bankCardRef}
                className="bg-blue-400 border border-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma conta ou cartão</option>
                {bankAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Categoria:</label>
              <select
                ref={categoryRef}
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={!selectedType}
                className="bg-blue-400 border border-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="text-xs">Recorrente:</label>
          <input
            ref={recurrencyRef}
            type="checkbox"
            checked={isRecurrent}
            onChange={() => setIsRecurrent(!isRecurrent)}
            className="mr-2"
          />
          <label htmlFor="recurrence">Sim</label>

          {isRecurrent && (
            <>
              <label className="text-xs">Tipo de Recorrência:</label>
              <select
                ref={typeRecurrencyRef}
                value={recurrenceType}
                onChange={(e) => setRecurrenceType(e.target.value)}
                className="bg-blue-400 border border-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione o tipo de recorrência</option>
                <option value="Diária">Diária</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
              </select>
            </>
          )}

          <label className="text-xs">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            className="bg-blue-300 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
