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

  // Subcategoria
  const [editSubCategoryId, setEditSubCategoryId] = useState<number | null>(
    null
  );
  const [editSubCategoryName, setEditSubCategoryName] = useState<string>("");
  const [showSubCategoryModal, setShowSubCategoryModal] =
    useState<boolean>(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState<number | null>(
    null
  );
  const [categoryForSubCategory, setCategoryForSubCategory] = useState<
    number | null
  >(null);

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

  const handleCreateSubCategory = async () => {
    if (editSubCategoryName.trim() === "" || categoryForSubCategory === null)
      return;

    try {
      setLoading(true);
      await api.post(
        "/subcategory",
        {
          name: editSubCategoryName,
          categoryID: categoryForSubCategory,
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      fetchCategories();
      setEditSubCategoryName("");
      setShowSubCategoryModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao criar subcategoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao criar subcategoria:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubCategory = async () => {
    if (editSubCategoryId === null || editSubCategoryName.trim() === "") return;

    try {
      setLoading(true);
      await api.put(
        `/subcategory?id=${editSubCategoryId}`,
        {
          name: editSubCategoryName,
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      fetchCategories();
      setEditSubCategoryId(null);
      setEditSubCategoryName("");
      setShowSubCategoryModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao editar subcategoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao editar subcategoria:", error);
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

  const openSubCategoryModal = (categoryId: number) => {
    setCategoryForSubCategory(categoryId);
    setShowSubCategoryModal(true);
  };

  const openEditSubCategoryModal = (
    subCategoryId: number,
    subCategoryName: string
  ) => {
    setEditSubCategoryId(subCategoryId);
    setEditSubCategoryName(subCategoryName);
    setShowSubCategoryModal(true);
  };

  const handleConfirmSubCategoryDelete = async () => {
    if (subCategoryToDelete === null) return;

    try {
      setLoading(true);
      await api.delete("/subcategory", {
        params: { id: subCategoryToDelete },
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      fetchCategories();
      setSubCategoryToDelete(null);
      setShowSubCategoryModal(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao excluir subcategoria:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir subcategoria:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubCategoryDelete = () => {
    setSubCategoryToDelete(null);
    setShowSubCategoryModal(false);
  };

  const filteredCategories = categories.filter(
    (cat) => cat.typeCategory === activeTab
  );

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold m-6">Categorias</h1>

      {/* Abas */}
      <div className="flex space-x-4 mb-6 text-center items-center justify-center">
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

      <div className="mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Adicionar Categoria
        </button>
      </div>

      <div className="overflow-x-auto">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="border-b border-gray-300 pb-4 mb-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{category.name}</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                      setNewCategoryType(category.typeCategory);
                      setShowModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openConfirmDeleteModal(category.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={() => openSubCategoryModal(category.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Adicionar Subcategoria
                  </button>
                </div>
              </div>
              <div className="mt-2">
                {category.subCategories.length === 0 ? (
                  <p className="text-gray-500">Nenhuma subcategoria.</p>
                ) : (
                  <ul>
                    {category.subCategories.map((subCategory) => (
                      <li
                        key={subCategory.id}
                        className="flex justify-between items-center"
                      >
                        <span>{subCategory.name}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              openEditSubCategoryModal(
                                subCategory.id,
                                subCategory.name
                              )
                            }
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => {
                              setSubCategoryToDelete(subCategory.id);
                              setShowSubCategoryModal(true);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Deletar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Adicionar/Editar Categoria */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {editCategoryId ? "Editar Categoria" : "Adicionar Categoria"}
            </h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nome da Categoria"
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
              <option value="investment">Investimento</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={
                  editCategoryId ? handleEditCategory : handleCreateCategory
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {editCategoryId ? "Salvar" : "Adicionar"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Exclusão Categoria */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir esta categoria?</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar/Editar Subcategoria */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {editSubCategoryId
                ? "Editar Subcategoria"
                : "Adicionar Subcategoria"}
            </h2>
            <input
              type="text"
              value={editSubCategoryName}
              onChange={(e) => setEditSubCategoryName(e.target.value)}
              placeholder="Nome da Subcategoria"
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <div className="flex space-x-2">
              <button
                onClick={
                  editSubCategoryId
                    ? handleEditSubCategory
                    : handleCreateSubCategory
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {editSubCategoryId ? "Salvar" : "Adicionar"}
              </button>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
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
