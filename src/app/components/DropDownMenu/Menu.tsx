// src/components/DependentDropdown.tsx
"use client";

import { useState, useEffect } from "react";
import { data } from "./data";

interface DependentDropdownProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const DependentDropdown: React.FC<DependentDropdownProps> = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const typeData = data.transactionsType.find((t) => t.type === selectedType);
    setCategories(typeData ? typeData.categories : []);
    setSelectedCategory(""); // Limpa a categoria selecionada
  }, [selectedType, setSelectedCategory]); // Adiciona setSelectedCategory à lista de dependências

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Type */}
      <div className="flex flex-col w-1/2">
        <label className="text-xs">Tipo:</label>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="border border-1 mb-2 p-2 rounded w-full"
        >
          {data.transactionsType.map((type) => (
            <option key={type.type} value={type.type}>
              {type.type}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
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
