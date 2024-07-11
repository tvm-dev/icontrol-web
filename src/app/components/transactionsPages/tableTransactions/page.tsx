export default function AreaTransactions() {
  return (
    <>
      <div className="bg-slate-200 py-5 ">
        <div>Transações </div>
      </div>
    </>
  );
}

// {/* <div className="flex justify-center">
// {/* Type ====================================== */}

// <div className="flex flex-row justify-center w-full"></div>

// {/* End */}
// </div>{" "}
// <div>
// <h1 className="font-bold text-center p-5 border-t-2 ">
//   Filtre suas transações:
// </h1>
// <div className="flex flex-row justify-center space-x-5 border border-cyan-300 p-2 ">
//   <FcAcceptDatabase
//     size={50}
//     title="Todas transações"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-180 cursor-pointer"
//   />
//   <FcMoneyTransfer
//     size={50}
//     title="Receitas Fixas"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-90 cursor-pointer"
//   />
//   <FcInternal
//     size={50}
//     title="Receitas Variáveis"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-45 cursor-pointer"
//   />
//   <FcUp
//     size={50}
//     title="Despesas Fixas"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-90 cursor-pointer"
//   />
//   <FcRedo
//     size={50}
//     title="Despesas Variáveis"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-45 cursor-pointer"
//   />
//   <FcPortraitMode
//     size={50}
//     title="Investimentos"
//     className="hover:scale-150 transition-all duration-500 hover:rotate-45 cursor-pointer"
//   />
// </div>
// </div>
// {/* -----------table---------------- */}
// <h1 className="my-5 text-center text-2xl font-bold ">Transações</h1>
// <div className="container mx-auto p-4">
// <div className="overflow-x-auto">
//   <table className="min-w-full">
//     <thead></thead>
//     <tbody>
//       {transactions.map((transaction) => (
//         <tr
//           key={transaction.id}
//           className="hover:bg-blue-200 duration-500 "
//         >
//           <td className="py-2 px-4 border-b">
//             <a
//               href={`/transaction/${transaction.id}`}
//               className="block"
//             >
//               {transaction.date}
//             </a>
//           </td>
//           <td className="py-2 px-4 border-b">
//             <a
//               href={`/transaction/${transaction.id}`}
//               className="block"
//             >
//               {transaction.description}
//             </a>
//           </td>
//           <td className="py-2 px-4 border-b">
//             <a
//               href={`/transaction/${transaction.id}`}
//               className="block"
//             >
//               {formatCurrencyBRL(transaction.amount)}
//             </a>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// </div>
// --table end-------------------------------------------------- */}
