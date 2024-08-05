"use client";

import { useState, useEffect } from "react";
import { data } from "./data";

// Mapeamento dos tipos para seus valores numéricos
export const typeMapping: { [key: string]: number } = {
  "Despesa Variável": 1,
  "Receita Variável": 2,
  "Despesa Fixa": 3,
  "Receita Fixa": 4,
  Investimentos: 5,
};

// Mapeamento reverso para converter número em string
const reverseTypeMapping: { [key: number]: string } = Object.fromEntries(
  Object.entries(typeMapping).map(([key, value]) => [value, key])
);

interface DependentDropdownProps {
  selectedType: number;
  setSelectedType: (type: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const DependentDropdown: React.FC<DependentDropdownProps> = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}: DependentDropdownProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Atualiza as categorias com base no tipo selecionado
    const typeString = reverseTypeMapping[selectedType];
    const typeData = data.transactionsType.find((t) => t.type === typeString);
    if (typeData) {
      setCategories(typeData.categories);
    } else {
      setCategories([]);
    }
    // Limpa a categoria selecionada ao alterar o tipo
    setSelectedCategory("");
  }, [selectedType, setSelectedCategory]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeString = event.target.value;
    const typeNumber = typeMapping[typeString as keyof typeof typeMapping];
    setSelectedType(Number(event.target.value)); // Converte a string para número

    // Atualiza categorias ao selecionar um novo tipo
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
      {/* Tipo */}
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

      {/* Categoria */}
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

export default DependentDropdown;
