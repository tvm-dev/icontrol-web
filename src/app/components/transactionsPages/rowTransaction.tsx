import { Transactions, formatDateBr } from "@/utils/boniak/dataFilter";
import TableTransactions from "./tableTransactions";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";

type Props = {
  transactions?: Transactions[];
};

export default function RowTransaction({ transactions }: Props) {
  // Verifica se transactions não está definido ou é vazio
  if (!transactions || transactions.length === 0) {
    return <p className=" py-5 ">Nenhuma transação encontrada!</p>; // Ou outra mensagem de carregamento
  }

  return (
    <div className="w-full overflow-x-auto flex ">
      <table className="min-w-full border-gray-200 ">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dia
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Desc
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {formatDateBr(new Date(transaction.date))}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {transaction.category}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {transaction.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">
                {formatCurrencyBRL(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
