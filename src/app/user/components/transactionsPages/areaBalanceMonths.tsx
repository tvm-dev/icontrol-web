import { formatCurrencyBRL } from "@/app/utils/formatCurrencies";

type Props = {
  ve: number;
  vi: number;
  fe: number;
  fi: number;
  inv: number;
};

export const AreaBalanceMonth = ({ ve, vi, fe, fi, inv }: Props) => {
  return (
    <div className=" rounded-lg shadow-md">
      <div className="text-center text-lg font-semibold mb-2">
        Balanço deste mês
      </div>

      <div className="flex gap-2 justify-center pys-2">
        <div className="bg-blue-500 p-2 rounded-lg text-white min-w-[100px] text-center">
          <p>Saldo</p>
          <p className="font-bold">
            {formatCurrencyBRL(fi + vi - (fe + ve + inv))}
          </p>
        </div>
        <div className="bg-green-500 p-2 rounded-lg text-white min-w-[100px] text-center">
          <p>Receitas</p>
          <p className="font-bold">{formatCurrencyBRL(fi + vi)}</p>
        </div>
        <div className="bg-red-500 p-2 rounded-lg text-white min-w-[100px] text-center">
          <p>Despesas</p>
          <p className="font-bold">{formatCurrencyBRL(fe + ve)}</p>
        </div>
        <div className="bg-yellow-600 font-thin pt-2 rounded-lg text-white min-w-[100px] text-center">
          <p>Investimentos</p>
          <p className="font-bold">{formatCurrencyBRL(inv)}</p>
        </div>
      </div>
    </div>
  );
};
