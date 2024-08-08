import { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import { manualToken, userID } from "../../services/token";
import { FaThumbsDown, FaThumbsUp, FaWindowClose } from "react-icons/fa";

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
  subCategories: any[]; // Ajuste conforme a estrutura real de subcategorias
};

const NewTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isRecurrent, setIsRecurrent] = useState<boolean>(false);
  const [recurrenceType, setRecurrenceType] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const bankCardRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
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
        console.log("Categorias recebidas:", categoriesResponse.data); // Adicione este log
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
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
            {["Receita", "Despesa"].map((key) => (
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
              <select
                ref={bankCardRef}
                className="bg-blue-400 border border-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {/* Mensagem padrão se não houver contas ou cartões */}
                {bankAccounts.length === 0 && creditCards.length === 0 ? (
                  <option disabled value="">
                    Cadastre contas e cartões para que possam ser selecionados!
                  </option>
                ) : (
                  <>
                    {/* Renderiza contas bancárias se houver */}
                    {bankAccounts.length > 0 && (
                      <optgroup label="Contas Bancárias">
                        {bankAccounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.name}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {/* Renderiza cartões de crédito se houver */}
                    {creditCards.length > 0 && (
                      <optgroup label="Cartões de Crédito">
                        {creditCards.map((card) => (
                          <option key={card.id} value={card.id}>
                            {card.name}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {/* Mensagem padrão se houver contas ou cartões */}
                    {(bankAccounts.length === 0 ||
                      creditCards.length === 0) && (
                      <option disabled value="">
                        Selecione uma conta ou cartão
                      </option>
                    )}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Categoria */}
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-xs">Categoria:</label>
            <select
              ref={categoryRef}
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={!selectedType} // Desabilita o campo se nenhum tipo for selecionado
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

          {/* Recorrência */}
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

          {/* Detalhes */}
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
};

export default NewTransactionModal;
