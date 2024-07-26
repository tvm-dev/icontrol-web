import React, { useState } from "react";
import AreaFilter from "./transactionsPages/areaFilters";
import TableTransactions from "./transactionsPages/tableTransactions";
import { Transactions } from "@/utils/boniak/dateFilter";

type ParentComponentProps = {
  transactions: Transactions[];
  onDelete: (id: number) => void;
  updateTotals: (
    ve: number,
    vi: number,
    fe: number,
    fi: number,
    inv: number
  ) => void;
};

const ParentComponent: React.FC<ParentComponentProps> = ({
  transactions,
  onDelete,
  updateTotals,
}) => {
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleFilterChange = (type: string | null) => {
    setFilterType(type);
  };

  return (
    <div>
      <AreaFilter onFilterChange={handleFilterChange} />
      <TableTransactions
        transactions={transactions}
        onDelete={onDelete}
        updateTotals={updateTotals}
        filterType={filterType} // Passar o filtro
      />
    </div>
  );
};

export default ParentComponent;
