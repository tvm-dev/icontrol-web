import React from "react";
import NewTransactionButton from "../NewTransactionButton";

type AreaFilterProps = {
  onFilterChange: (type: string | null) => void;
};

const AreaFilter: React.FC<AreaFilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value === "all" ? null : e.target.value;
    onFilterChange(selectedType);
  };

  return (
    <div className="flex items-center justify-center space-x-4 my-5">
      <NewTransactionButton />
      <div className="relative">
        <select
          id="filter"
          name="filter"
          className="block w-full md:w-48 mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleFilterChange}
        >
          <option value="all" className="text-center">
            Filtrar Transações por
          </option>
          <option value="1">😥 DV - Despesas variáveis</option>
          <option value="2">😍 RV - Receitas variáveis</option>
          <option value="3">😿 DF - Despesas fixas</option>
          <option value="4">🤑 RF - Receitas fixas</option>
          <option value="5">💹 In - Investimentos</option>
        </select>
      </div>
    </div>
  );
};

export default AreaFilter;
