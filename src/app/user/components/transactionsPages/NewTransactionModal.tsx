import { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import { manualToken, userID } from "../../services/token";
import { FaThumbsDown, FaThumbsUp, FaWindowClose } from "react-icons/fa";
import Select from "react-select";

export type BankAccount = {
  id: number;
  name: string;
};

export type CreditCard = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  typeCategory: string;
  subCategories: { id: number; name: string }[];
};

const NewTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [recurrenceType, setRecurrenceType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const recurrencyRef = useRef<HTMLInputElement | null>(null);
  const typeRecurrencyRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bank Accounts from the API
        const bankAccountsResponse = await api.get("/bankaccounts", {
          params: { userID: userID },
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setBankAccounts(bankAccountsResponse.data);

        // Fetch Credit Cards from the API
        const creditCardsResponse = await api.get("/creditcards", {
          params: { userID: userID },
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setCreditCards(creditCardsResponse.data);

        // Fetch Categories from the API
        const categoriesResponse = await api.get("/categories", {
          params: { userID: userID },
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
  };

  const handleAccountChange = (selectedOption: any) => {
    setSelectedAccount(selectedOption);
  };

  const handleRegisterTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar a transação
  };

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
          {/* Selecione o tipo de transação */}
          <div className="flex justify-center mb-4">
            {["Receita", "Despesa", "Investimento"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleTypeChange(key)}
                className={`px-4 py-2 mx-1 ${
                  selectedType === key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                } rounded`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Descrição */}
          <label className="text-xs">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            required
            className="bg-blue-300 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Valor e Data */}
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
                defaultValue={new Date().toISOString().split("T")[0]} // Define a data atual por padrão
              />
            </div>
          </div>

          {/* Selecione se está pago */}
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

          {/* Contas Bancárias e Cartões de Crédito */}
          <div className="flex flex-wrap justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Conta/Cartão:</label>
              <Select
                options={[
                  ...bankAccounts.map((account) => ({
                    value: account.id,
                    label: account.name,
                  })),
                  ...creditCards.map((card) => ({
                    value: card.id,
                    label: card.name,
                  })),
                ]}
                value={selectedAccount}
                onChange={handleAccountChange}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Selecione uma conta ou cartão"
                isSearchable
              />
            </div>

            {/* Categorias */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-xs">Categoria:</label>
              <Select
                options={categories.map((category) => ({
                  label: category.name,
                  options: [
                    { value: category.id, label: category.name },
                    ...category.subCategories.map((subCategory) => ({
                      value: subCategory.id,
                      label: subCategory.name,
                    })),
                  ],
                }))}
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Selecione uma categoria"
                isSearchable
              />
            </div>
          </div>

          {/* Repetição e Tipo de Repetição */}
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                ref={recurrencyRef}
                checked={isRecurrent}
                onChange={() => setIsRecurrent(!isRecurrent)}
              />
              <span className="text-xs">Repetir</span>
            </div>
            {isRecurrent && (
              <div className="flex flex-col space-y-2">
                <label className="text-xs">Tipo de Repetição:</label>
                <select
                  ref={typeRecurrencyRef}
                  value={recurrenceType}
                  onChange={(e) => setRecurrenceType(e.target.value)}
                  className="bg-blue-400 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>
              </div>
            )}
          </div>

          {/* Detalhes */}
          <label className="text-xs mt-2">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            className="bg-blue-400 border border-1 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botão de Enviar */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Registrar Transação
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionModal;
