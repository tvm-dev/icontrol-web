import { formatCurrencyBRL } from "../../../utils/formatCurrencies";

type Props = {
  ve: number;
  vi: number;
  fe: number;
  fi: number;
  inv: number;
};

export const AreaBalanceMonth = ({ ve, vi, fe, fi, inv }: Props) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center text-lg font-semibold mb-2">
        Balanço deste mês
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-blue-500 p-4 rounded-lg text-white w-full md:w-1/2 lg:w-1/4 text-center">
          <p>Saldo</p>
          <p className="font-bold">
            {formatCurrencyBRL(fi + vi - (fe + ve + inv))}
          </p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg text-white w-full md:w-1/2 lg:w-1/4 text-center">
          <p>Receitas</p>
          <p className="font-bold">{formatCurrencyBRL(fi + vi)}</p>
        </div>
        <div className="bg-red-500 p-4 rounded-lg text-white w-full md:w-1/2 lg:w-1/4 text-center">
          <p>Despesas</p>
          <p className="font-bold">{formatCurrencyBRL(fe + ve)}</p>
        </div>
        <div className="bg-teal-600 p-4 rounded-lg text-white w-full md:w-1/2 lg:w-1/4 text-center">
          <p>Investimentos</p>
          <p className="font-bold">{formatCurrencyBRL(inv)}</p>
        </div>
      </div>
    </div>
  );
};
