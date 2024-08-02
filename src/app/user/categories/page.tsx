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
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleCreateCategory = async () => {
    if (newCategoryName.trim() === "") return;

    try {
      setLoading(true);
      await api.post(
        "/category",
        {
          name: newCategoryName,
          typeCategory: newCategoryType,
          userID: userID, // Passe o userID adequado aqui
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      fetchCategories();
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

  const handleEditCategory = async () => {
    if (editCategoryId === null || editCategoryName.trim() === "") return;

    try {
      setLoading(true);
      await api.put(
        `/category?id=${editCategoryId}`,
        {
          name: editCategoryName,
          typeCategory: newCategoryType, // Use o tipo da nova categoria se estiver alterando
          userID: userID,
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      fetchCategories();
      setEditCategoryId(null);
      setEditCategoryName("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao editar categoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao editar categoria:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const openConfirmDeleteModal = (id: number) => {
    setCategoryToDelete(id);
    setShowConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete === null) return;

    try {
      setLoading(true);
      await api.delete("/category", {
        params: { id: categoryToDelete },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      fetchCategories();
      setCategoryToDelete(null);
      setShowConfirmDeleteModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao excluir categoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir categoria:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setShowConfirmDeleteModal(false);
  };

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

      {/* Modal de Criação de Categoria */}
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

      {/* Modal de Edição de Categoria */}
      {editCategoryId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Categoria</h2>
            <input
              type="text"
              placeholder="Nome da Categoria"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
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
              onClick={handleEditCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={() => setEditCategoryId(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Categorias */}
      <div>
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        ) : (
          <ul>
            {filteredCategories.map((category) => (
              <li key={category.id} className="border p-4 mb-2 rounded">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openConfirmDeleteModal(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão:</h2>
            <h3 className="font-bold">Aviso importante:</h3>
            <p className="mb-4 text-red-500">
              Se esta categoria tiver subcategorias, ela não será apagada. Você
              precisa, antes, excluir as subcategorias ou movê-las para outra
              Categoria.
            </p>
            <p className="mb-4">
              {" "}
              Tem certeza de que deseja excluir esta categoria?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                disabled={loading}
              >
                {loading ? "Excluindo..." : "Confirmar"}
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
