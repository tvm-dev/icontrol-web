import { AreaBalanceMonth } from "../components/transactionsPages/areaBalanceMonths";
import AreaFilter from "../components/transactionsPages/areaFilters";
import AreaMonth from "../components/transactionsPages/areaMonths";
import TableTransactions from "../components/transactionsPages/tableTransactions";
import RowTransaction from "../components/transactionsPages/rowTransaction";

export default function PageTransactions() {
  return (
    <>
      <div className="text-center">
        <AreaMonth />
        <AreaBalanceMonth />
        <AreaFilter />
        <TableTransactions />
      </div>
    </>
  );
}
