"use client";
//================

import { useEffect, useState } from "react";
import { api } from "../services/api"; // Verifique se o caminho está correto
import { manualToken, userID } from "../services/token"; // Verifique se o caminho está correto
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

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
  //==================================================================
  //********************************************** */

  //==================================================================
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
      setShowModal(false);
      fetchCategories();
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
  //==============================================
  const handleCreateSubCategory = async () => {
    if (editSubCategoryName.trim() === "" || categoryForSubCategory === null) {
      return;
    }

    console.log({
      name: editSubCategoryName,
      parentCategoryId: categoryForSubCategory,
      userID: userID,
    });

    try {
      setLoading(true);
      await api.post(
        "/subcategory",
        {
          name: editSubCategoryName,
          parentCategoryId: categoryForSubCategory, // Use 'categoryId' aqui
          //userID: userID, // Inclua o userID se for necessário para o backend
        },
        {
          headers: { Authorization: `Bearer ${manualToken}` },
        }
      );
      fetchCategories(); // Atualiza a lista de categorias e subcategorias
      setEditSubCategoryName(""); // Limpa o nome da subcategoria
      setCategoryForSubCategory(null); // Limpa a categoria selecionada
      setShowSubCategoryModal(false); // Fecha o modal de criação de subcategoria
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
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  //==============================================

  const handleEditSubCategory = async () => {
    if (editSubCategoryId === null || editSubCategoryName.trim() === "") return;

    console.log({
      name: editSubCategoryName,
      parentCategoryId: categoryForSubCategory,
      userID: userID,
    });

    try {
      setLoading(true);
      await api.put(
        `/subcategory`, // Certifique-se de que o ID está correto
        {
          id: editSubCategoryId,
          name: editSubCategoryName,
          parentCategoryId: categoryForSubCategory,
          //userID: userID,
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
  //=========================================================
  const openConfirmDeleteModal = (
    id: number,
    isSubCategory: boolean = false
  ) => {
    if (isSubCategory) {
      setSubCategoryToDelete(id);
      setShowConfirmDeleteModal(true);
    } else {
      setCategoryToDelete(id);
      setShowConfirmDeleteModal(true);
    }
  };

  //=========================================================
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
  //=========================================================
  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setShowConfirmDeleteModal(false);
  };
  //=========================================================
  const openSubCategoryModal = (categoryId: number) => {
    setCategoryForSubCategory(categoryId);
    setShowSubCategoryModal(true);
  };
  //=========================================================
  const openEditSubCategoryModal = (
    subCategoryId: number,
    subCategoryName: string,
    parentCategoryId: number
  ) => {
    setEditSubCategoryId(subCategoryId);
    setEditSubCategoryName(subCategoryName);
    setCategoryForSubCategory(parentCategoryId); // Defina a categoria pai aqui
    setShowSubCategoryModal(true);
  };

  //=========================================================
  // Função para abrir o modal de confirmação de exclusão da subcategoria
  const openConfirmDeleteSubCategoryModal = (subCategoryId: number) => {
    setSubCategoryToDelete(subCategoryId);
    setShowConfirmDeleteModal(true);
  };
  //=========================================================

  const handleConfirmSubCategoryDelete = async () => {
    if (subCategoryToDelete === null) return;

    try {
      setLoading(true);
      await api.delete(`/subcategory`, {
        params: { id: subCategoryToDelete }, // Adiciona o ID como parâmetro
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      fetchCategories();
      setSubCategoryToDelete(null);
      setShowSubCategoryModal(false); // Fecha o modal de subcategoria
      setShowConfirmDeleteModal(false); // Fecha o modal de confirmação de exclusão
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

  //=========================================================
  const handleCancelSubCategoryDelete = () => {
    setSubCategoryToDelete(null);
    setShowSubCategoryModal(false);
  };

  const filteredCategories = categories.filter(
    (cat) => cat.typeCategory === activeTab
  );

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">Categorias</h1>
      <p className="font-thin mb-2">
        Para adicionar uma nova categoria, clique no botão +
      </p>
      <div className="mb-6"></div>
      {/* Abas */}
      <div className="flex items-center justify-center mb-6">
        {/* Botão de Adicionar Nova Categoria */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white p-2 rounded-lg mr-4"
          aria-label="Adicionar Categoria"
        >
          <FaPlus title="Nova Categoria" size={25} />
        </button>

        {/* Abas */}
        <div className="flex space-x-4 text-center items-center justify-center">
          <button
            onClick={() => setActiveTab("expense")}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === "expense"
                ? "bg-red-500 text-white"
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
                ? "bg-[#fde047] text-black"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Investimentos
          </button>
        </div>
      </div>

      <div>
        {/* Categorias */}
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500">Não há categorias cadastradas.</p>
        ) : (
          <ul className="space-y-4">
            {filteredCategories.map((category) => (
              <li key={category.id} className="border p-4 rounded-lg shadow-md">
                <div className="flex justify-start gap-3 ">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditCategoryId(category.id);
                        setEditCategoryName(category.name);
                        setShowModal(true);
                      }}
                      className="bg-green-500 text-white p-2 rounded-lg"
                      aria-label="Editar Categoria"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => openConfirmDeleteModal(category.id)}
                      className="bg-red-500 text-white p-2 rounded-lg"
                      aria-label="Deletar Categoria"
                    >
                      <IoTrashBinSharp />
                    </button>
                  </div>
                </div>

                {category.subCategories.length > 0 && (
                  <ul className="mt-4 pl-4">
                    {category.subCategories.map((subCategory) => (
                      <li
                        key={subCategory.id}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <span>{subCategory.name}</span>
                        <div>
                          <button
                            onClick={() =>
                              openEditSubCategoryModal(
                                subCategory.id,
                                subCategory.name,
                                category.id // Passe a categoria pai aqui
                              )
                            }
                            className="bg-yellow-500 text-white p-2 rounded-lg mx-2"
                            aria-label="Editar Subcategoria"
                          >
                            <BiEditAlt />
                          </button>

                          <button
                            onClick={() =>
                              openConfirmDeleteSubCategoryModal(subCategory.id)
                            }
                            className="bg-red-500 text-white p-2 rounded-lg"
                            aria-label="Deletar Subcategoria"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => openSubCategoryModal(category.id)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 text-thin rounded-lg hover:bg-green-400 transition duration-1000 "
                >
                  Nova Subcategoria
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Modal de Criação de Categoria */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editCategoryId ? "Editar Categoria" : "Adicionar Categoria"}
            </h2>
            <input
              type="text"
              value={editCategoryId ? editCategoryName : newCategoryName}
              onChange={(e) =>
                editCategoryId
                  ? setEditCategoryName(e.target.value)
                  : setNewCategoryName(e.target.value)
              }
              className="border border-gray-300 p-2 w-full mb-4 rounded"
              placeholder="Nome da Categoria"
            />
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
              <option value="investment">Investimento</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={
                  editCategoryId ? handleEditCategory : handleCreateCategory
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
              >
                {editCategoryId ? "Salvar" : "Adicionar"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Confirmação de Exclusão de Categoria */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">
              {subCategoryToDelete !== null
                ? "Confirmar Exclusão de Subcategoria"
                : "Confirmar Exclusão de Categoria"}
            </h2>
            <p className="font-thin">
              Lembre-se: para excluir uma Categoria, todas subcategorias devem
              ser apagadas!
            </p>
            <p className="font-semi-bold text-red-500">
              Tem certeza que deseja excluir esta{" "}
              {subCategoryToDelete !== null ? "subcategoria" : "categoria"}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={
                  subCategoryToDelete !== null
                    ? handleConfirmSubCategoryDelete
                    : handleConfirmDelete
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
              >
                Deletar
              </button>
              <button
                onClick={
                  subCategoryToDelete !== null
                    ? handleCancelSubCategoryDelete
                    : handleCancelDelete
                }
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
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
            {editSubCategoryId && (
              <select
                value={categoryForSubCategory ?? ""}
                onChange={(e) =>
                  setCategoryForSubCategory(Number(e.target.value))
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              >
                <option value="" disabled>
                  Selecione a Categoria Pai
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
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
