"use client";

import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { api } from "@/app/user/services/api";
import { manualToken } from "@/app/user/services/token";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { data } from "@/app/user/components/DropDownMenu/data";
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

const typeMapping: { [key: string]: number } = {
  "Despesa Variável": 1,
  "Receita Variável": 2,
  "Despesa Fixa": 3,
  "Receita Fixa": 4,
  Investimentos: 5,
};

const reverseTypeMapping: { [key: number]: string } = Object.fromEntries(
  Object.entries(typeMapping).map(([key, value]) => [value, key])
);

const DependentDropdown = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}: {
  selectedType: number;
  setSelectedType: (type: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const typeString = reverseTypeMapping[selectedType];
    const typeData = data.transactionsType.find((t) => t.type === typeString);
    if (typeData) {
      setCategories(typeData.categories);
    } else {
      setCategories([]);
    }
    setSelectedCategory("");
  }, [selectedType, setSelectedCategory]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeString = event.target.value;
    const typeNumber = typeMapping[typeString as keyof typeof typeMapping];
    setSelectedType(typeNumber);

    const typeData = data.transactionsType.find((t) => t.type === typeString);
    if (typeData) {
      setCategories(typeData.categories);
    } else {
      setCategories([]);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col w-1/2">
        <label className="text-xs">Tipo:</label>
        <select
          value={reverseTypeMapping[selectedType] || ""}
          onChange={handleTypeChange}
          className="border border-1 mb-2 p-2 rounded w-full"
        >
          <option value="">Selecione</option>
          {Object.keys(typeMapping).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-1/2">
        <label className="text-xs">Categoria:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          disabled={!selectedType}
          className="border border-1 mb-2 p-2 rounded w-full"
        >
          <option value="">Selecione</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default function EditTransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState<EditTransactionProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const router = useRouter();

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await api.get(`/transaction`, {
          params: { id: parseInt(params.id, 10) },
          headers: { Authorization: `Bearer ${manualToken}` },
        });

        setFormData({
          ...response.data,
          paid: !!response.data.paid,
          type: response.data.type,
          category: response.data.category,
        });

        setSelectedType(response.data.type);
        setSelectedCategory(response.data.category);
      } catch (error) {
        console.error("Erro ao carregar transação:", error);
        setError("Falha ao carregar a transação solicitada!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (!prevData) return null;

      return {
        ...prevData,
        [name]: name === "paid" ? value === "true" : value,
      };
    });
  };

  const handleEditTransaction = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"),
      date: dateRef.current?.value || "",
      type: selectedType,
      payment: paymentRef.current?.value || "",
      category: selectedCategory,
      details: detailsRef.current?.value || "",
      paid: formData?.paid || false,
    };

    try {
      await api.put(`/transaction`, transactionData, {
        params: { id: parseInt(params.id, 10) },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      router.push("/user/transactions");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async () => {
    if (confirm("Tem certeza que deseja APAGAR esta transação?")) {
      setIsLoading(true);

      try {
        await api.delete(`/transaction`, {
          params: { id: parseInt(params.id, 10) },
          headers: { Authorization: `Bearer ${manualToken}` },
        });

        router.push("/user/transactions");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Erro ao excluir transação:",
            error.response?.data || error.message
          );
          setError("Erro ao excluir transação. Tente novamente mais tarde.");
        } else {
          console.error("Erro desconhecido:", error);
          setError("Erro desconhecido. Tente novamente mais tarde.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!formData)
    return <p className="text-center">Transação não encontrada!</p>;

  return (
    <>
      <h1 className="font-bold text-2xl text-center text-blue-500 pt-20">
        Alterando Transação...
      </h1>
      <div className="mb-2 p-2 rounded flex justify-center">
        <form
          className="flex flex-col w-full max-w-lg mx-4 my-2"
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
            className="border border-1 mb-2 p-2 rounded"
          />

          <div className="flex space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Valor:</label>
              <input
                ref={amountRef}
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="border border-1 mb-2 p-2 rounded"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="border border-1 mb-2 p-2 rounded"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Forma de Pagamento:</label>
              <select
                ref={paymentRef}
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                required
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="">Selecione</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
                <option value="PIX">PIX</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs">Status:</label>
              <select
                ref={statusRef}
                name="paid"
                value={formData.paid.toString()}
                onChange={handleInputChange}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="true">Pago</option>
                <option value="false">Pendente</option>
              </select>
            </div>
          </div>

          <DependentDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <label className="text-xs">Detalhes:</label>
          <textarea
            ref={detailsRef}
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="border border-1 mb-2 p-2 rounded"
          />

          <div className="flex flex-col items-center space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={handleDeleteTransaction}
              disabled={isLoading}
              className="bg-transparent text-black border border-red-500 font-bold hover:bg-red-600 duration-1000 hover:text-white p-2 rounded w-1/2 text-center"
            >
              {isLoading ? "Excluindo..." : "Apagar Transação"}
            </button>
          </div>

          <Link
            href="/user/transactions"
            className="text-blue-500 text-center mt-10 border-b-2"
          >
            Voltar para todas as transações
          </Link>
        </form>
      </div>
    </>
  );
}
