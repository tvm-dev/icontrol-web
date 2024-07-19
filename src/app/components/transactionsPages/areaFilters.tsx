import React from "react";
import ParentComponent from "../ParentComponent";

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
      <div className="relative">
        <label htmlFor="filter" className="text-sm font-medium text-gray-700">
          Filtrar por:
        </label>
        <select
          id="filter"
          name="filter"
          className="mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center mx-auto"
          onChange={handleFilterChange}
        >
          <option value="all">Selecione</option>
          <option value="1">Despesas variáveis</option>
          <option value="2">Receitas variáveis</option>
          <option value="3">Despesas fixas</option>
          <option value="4">Receitas fixas</option>
          <option value="5">Investimentos</option>
        </select>
      </div>

      <div className="relative">
        <label htmlFor="reports" className="text-sm font-medium text-gray-700">
          Gerar relatório:
        </label>
        <select
          id="reports"
          name="reports"
          className="mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center mx-auto"
          // onChange={handleReportGeneration}
        >
          <option value="">Selecione</option>
          <option value="pdf">Gerar PDF</option>
          <option value="excel">Gerar Excel</option>
          <option value="csv">Gerar CSV</option>
        </select>
      </div>
    </div>
  );
};

export default AreaFilter;
