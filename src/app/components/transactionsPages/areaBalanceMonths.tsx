import { useEffect, useState } from "react";
import { Transactions } from "@/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";
import TableTransactions from "./tableTransactions";

type Props = {
  ve: number;
  vi: number;
  fe: number;
  fi: number;
  inv: number;
};

export const AreaBalanceMonth = ({ ve, vi, fe, fi, inv }: Props) => {
  const [totalIncomes, setTotalIncomes] = useState(0);

  return (
    <>
      <div className="flex-1 p-1">Balanço deste mês</div>
      <div className="flex flex-row mx-5 my-1 justify-between">
        <div className="bg-blue-500 px-5 rounded">
          {/* Balance =======================================*/}
          <p>Saldo</p>
          <p className="font-bold">
            {formatCurrencyBRL(fi + vi - (fe + ve + inv))}
          </p>
        </div>
        <div className="bg-green-500 px-2 rounded">
          {/* Incomes =======================================*/}
          <p>Receitas</p>
          <p className="font-bold">{formatCurrencyBRL(fi + vi)}</p>
        </div>
        <div className="bg-red-500 px-2 rounded">
          {/* Expenses =======================================*/}
          <p>Despesas</p>
          <p className="font-bold">{formatCurrencyBRL(fe + ve)}</p>
        </div>
        <div className="bg-teal-600 px-2 rounded">
          {/* Investments =======================================*/}
          <p>Investimentos</p>
          <p className="font-bold">{formatCurrencyBRL(inv)}</p>
        </div>
      </div>
    </>
  );
};
