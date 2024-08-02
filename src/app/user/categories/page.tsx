"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api"; // Verifique se o caminho está correto
import { manualToken, userID } from "../services/token"; // Verifique se o caminho está correto
import axios from "axios";

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  typeCategory: string;
  subCategories: SubCategory[];
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryType, setNewCategoryType] = useState<string>("expense");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("expense");

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setCategories(response.data);
      console.log("Categories fetched successfully:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao carregar categorias:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao carregar categorias:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //==Creating new Category:
  const handleCreateCategory = async () => {
    if (newCategoryName.trim() === "") return;

    try {
      setLoading(true);
      await api.post(
        "/category", // Certifique-se de que este é o endpoint correto
        {
          name: newCategoryName,
          typeCategory: newCategoryType,
          userID: 1, // Passe o userID adequado aqui
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      // Atualiza a lista de categorias após a criação
      await fetchCategories();
      setNewCategoryName("");
      setNewCategoryType("expense");
      setShowModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao criar categoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao criar categoria:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  //end

  const filteredCategories = categories.filter(
    (cat) => cat.typeCategory === activeTab
  );

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold m-6">Categorias</h1>

      {/* Abas */}
      <div className="flex space-x-4 mb-6 text-center items-center justify-center ">
        <button
          onClick={() => setActiveTab("expense")}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "expense"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Despesas
        </button>
        <button
          onClick={() => setActiveTab("income")}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "income"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setActiveTab("investment")}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "investment"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Investimentos
        </button>
      </div>

      {/* Adicionar Nova Categoria */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        + Nova
      </button>
      <hr />
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Adicionar Categoria</h2>
            <input
              type="text"
              placeholder="Nome da Categoria"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="p-2 border border-blue-500 rounded mb-4 w-full bg-blue-50"
            />
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
              className="p-2 border border-blue-500 rounded mb-4 w-full bg-blue-50"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
              <option value="investment">Investimento</option>
            </select>
            <button
              onClick={handleCreateCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              disabled={loading}
            >
              {loading ? "Criando..." : "Adicionar"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba Ativa */}
      <div className="space-y-6">
        {filteredCategories.length === 0 ? (
          <p className="text-red-500 text-center ">
            Não há categorias cadastradas.
          </p>
        ) : (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 p-1 text-left rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">{cat.name}</h2>
              <ul className="list-disc pl-5 mt-2">
                {cat.subCategories.map((sub) => (
                  <li key={sub.id} className="text-sm text-gray-700">
                    {sub.name}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
