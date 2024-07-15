import React, { useState, useEffect } from "react";
import {
  Transactions,
  getCurrentMonth,
  filterTransactionsByMonth,
  formatDateBr,
} from "@/utils/boniak/dateFilter";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";
import { FcFullTrash } from "react-icons/fc";

type TableTransactionsProps = {
  transactions: Transactions[];
  onDelete: (id: string) => void;
  updateTotals: (
    ve: number,
    vi: number,
    fe: number,
    fi: number,
    inv: number
  ) => void;
};

const typeMapping: Record<number, string> = {
  1: "😒 DV",
  2: "😍 RV",
  3: "😿 DF",
  4: "🤑 RF",
  5: "💹 Inv",
};

const categoryMapping: Record<number, string> = {
  1: "Habitação",
  2: "Transporte",
  3: "Alimentação",
  4: "Saúde",
  5: "Educação",
  6: "Lazer",
  7: "Vestuário",
  8: "Comunicação",
  9: "Seguros",
  10: "Impostos e Taxas",
  11: "Dívidas e Empréstimos",
  12: "Presentes e Doações",
  13: "Despesas Pessoais",
  14: "Animais de Estimação",
  15: " --- ",
  16: "Salário",
  17: "Auxilios",
  18: "Vendas",
  19: "Rendimentos",
  20: "Investimentos",
  21: "Outros",
};

export default function TableTransactions({
  transactions,
  onDelete,
  updateTotals,
}: TableTransactionsProps) {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [groupedTransactions, setGroupedTransactions] = useState<
    Record<string, Transactions[]>
  >({});

  useEffect(() => {
    const filtered = filterTransactionsByMonth(transactions, currentMonth);

<<<<<<< HEAD
    // Ordenar transações por data decrescente
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

=======
>>>>>>> 349211337d74ccff932692d990152f00403895bd
    // Agrupar transações por data (formato: AAAA-MM-DD)
    const grouped: Record<string, Transactions[]> = {};
    filtered.forEach((transaction) => {
      const dateKey = formatDateBr(new Date(transaction.date));
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });

    setGroupedTransactions(grouped);

    // Calcular totais para todas as transações filtradas
    let ve = 0;
    let vi = 0;
    let fe = 0;
    let fi = 0;
    let inv = 0;

    for (let transaction of filtered) {
      switch (parseInt(transaction.type)) {
        case 1:
          ve += transaction.amount;
          break;
        case 2:
          vi += transaction.amount;
          break;
        case 3:
          fe += transaction.amount;
          break;
        case 4:
          fi += transaction.amount;
          break;
        case 5:
          inv += transaction.amount;
          break;
        default:
          break;
      }
    }

    updateTotals(ve, vi, fe, fi, inv);
  }, [transactions, currentMonth, updateTotals]);

  if (!transactions || transactions.length === 0) {
    return <p className="py-5">Nenhuma transação encontrada!</p>;
  }

  // Obter as chaves das datas das transações agrupadas
  const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("-"));
    const dateB = new Date(b.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="flex justify-center overflow-x-hidden">
<<<<<<< HEAD
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="">
          {sortedDateKeys.map((dateKey) => (
            <React.Fragment key={dateKey}>
              <tr>
                {/* <td
                  colSpan={5}
                  className="py-5 pl-5 text-sm font-bold bg-green-100"
                >
                  {dateKey}
                </td> */}
              </tr>
              {groupedTransactions[dateKey].map((transaction, index) => (
                <tr key={transaction.id}>
                  {index === 0 && (
                    <td
                      className="text-blue-900 font-bold p-2 text-5xl border-r-2"
                      rowSpan={groupedTransactions[dateKey].length}
                    >
                      {dateKey}
                    </td>
                  )}
                  <td className="border-b">
                    {typeMapping[parseInt(transaction.type)]}
                  </td>
                  <td className="border-b">
                    {categoryMapping[parseInt(transaction.category)]}
                  </td>
                  <td className="border-b border-gray-200 text-sm">
                    {transaction.description}
                  </td>
                  <td className="border-b border-gray-200 text-sm">
                    {formatCurrencyBRL(transaction.amount)}
                  </td>
                  <td className="border-b hover:bg-red-400">
                    <button
                      className="font-thin mr-5"
                      onClick={() => onDelete(transaction.id)}
                    >
                      <FcFullTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
=======
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-3 pl-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dia
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedTransactions).map((dateKey) => (
            <tr key={dateKey}>
              <td className="py-2 border-b border-gray-200 text-sm">
                {dateKey}
              </td>
              <td colSpan={5} className="border-b border-gray-200 text-sm">
                {groupedTransactions[dateKey].map((transaction) => (
                  <div key={transaction.id} className="flex">
                    <div className="w-1/6">
                      {typeMapping[parseInt(transaction.type)]}
                    </div>
                    <div className="w-1/6">
                      {categoryMapping[parseInt(transaction.category)]}
                    </div>
                    <div className="w-2/6">{transaction.description}</div>
                    <div className="w-1/6">
                      {formatCurrencyBRL(transaction.amount)}
                    </div>
                    <div className="w-1/6">
                      <button
                        className="font-thin"
                        onClick={() => onDelete(transaction.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </td>
            </tr>
>>>>>>> 349211337d74ccff932692d990152f00403895bd
          ))}
        </tbody>
        <hr />
      </table>
    </div>
  );
}

//======================================================================

// import { useState, useEffect } from "react";
// import {
//   Transactions,
//   getCurrentMonth,
//   filterTransactionsByMonth,
//   formatDateBr,
// } from "@/utils/boniak/dateFilter";
// import { formatCurrencyBRL } from "@/utils/formatCurrencies";

// type TableTransactionsProps = {
//   transactions: Transactions[];
//   onDelete: (id: string) => void;
//   updateTotals: (
//     ve: number,
//     vi: number,
//     fe: number,
//     fi: number,
//     inv: number
//   ) => void;
// };

// const typeMapping: Record<number, string> = {
//   1: "😒 DV",
//   2: "😍 RV",
//   3: "😿 DF",
//   4: "🤑 RF",
//   5: "💹 Inv",
// };

// const categoryMapping: Record<number, string> = {
//   1: "Habitação",
//   2: "Transporte",
//   3: "Alimentação",
//   4: "Saúde",
//   5: "Educação",
//   6: "Lazer",
//   7: "Vestuário",
//   8: "Comunicação",
//   9: "Seguros",
//   10: "Impostos e Taxas",
//   11: "Dívidas e Empréstimos",
//   12: "Presentes e Doações",
//   13: "Despesas Pessoais",
//   14: "Animais de Estimação",
//   15: " --- ",
//   16: "Salário",
//   17: "Auxilios",
//   18: "Vendas",
//   19: "Rendimentos",
//   20: "Investimentos",
//   21: "Outros",
// };

// export default function TableTransactions({
//   transactions,
//   onDelete,
//   updateTotals,
// }: TableTransactionsProps) {
//   const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
//   const [transactionFiltered, setTransactionFiltered] = useState<
//     Transactions[]
//   >([]);

//   useEffect(() => {
//     const filtered = filterTransactionsByMonth(transactions, currentMonth);
//     setTransactionFiltered(filtered);

//     let ve = 0;
//     let vi = 0;
//     let fe = 0;
//     let fi = 0;
//     let inv = 0;

//     for (let transaction of filtered) {
//       switch (parseInt(transaction.type)) {
//         case 1:
//           ve += transaction.amount;
//           break;
//         case 2:
//           vi += transaction.amount;
//           break;
//         case 3:
//           fe += transaction.amount;
//           break;
//         case 4:
//           fi += transaction.amount;
//           break;
//         case 5:
//           inv += transaction.amount;
//           break;
//         default:
//           break;
//       }
//     }

//     updateTotals(ve, vi, fe, fi, inv);
//   }, [transactions, currentMonth, updateTotals]);

//   if (!transactions || transactions.length === 0) {
//     return <p className="py-5">Nenhuma transação encontrada!</p>;
//   }

//   return (
//     <div className="flex justify-center overflow-x-hidden">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="py-3 pl-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Dia
//             </th>
//             <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Tipo
//             </th>
//             <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Categoria
//             </th>
//             <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Descrição
//             </th>
//             <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Valor
//             </th>
//             <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Ação
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction.id}>
//               <td className="py-2 border-b border-gray-200 text-sm">
//                 {formatDateBr(new Date(transaction.date))}
//               </td>
//               <td className="border-b border-gray-200 text-sm">
//                 {typeMapping[parseInt(transaction.type)]}
//               </td>
//               <td className="border-b border-gray-200 text-sm">
//                 {categoryMapping[parseInt(transaction.category)]}
//               </td>
//               <td className="border-b border-gray-200 text-sm">
//                 {transaction.description}
//               </td>
//               <td className="border-b border-gray-200 text-sm">
//                 {formatCurrencyBRL(transaction.amount)}
//               </td>
//               <td className="border-b border-gray-200 text-sm hover:bg-red-400">
//                 <button
//                   className="font-thin"
//                   onClick={() => onDelete(transaction.id)}
//                 >
//                   X
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
