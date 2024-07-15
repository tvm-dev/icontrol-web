// "use client";

// import { api } from "@/app/services/api";
// import { manualToken } from "@/app/services/token";
// import axios from "axios";
// import { FormEvent, useRef, useEffect, useState } from "react";

// export default function NewTransaction() {
//   const descriptionRef = useRef<HTMLInputElement | null>(null);
//   const amountRef = useRef<HTMLInputElement | null>(null);
//   const dateRef = useRef<HTMLInputElement | null>(null);
//   const typeRef = useRef<HTMLSelectElement | null>(null);
//   const paymentRef = useRef<HTMLSelectElement | null>(null);
//   const categoryRef = useRef<HTMLSelectElement | null>(null);
//   const detailsRef = useRef<HTMLInputElement | null>(null);
//   const statusRef = useRef<HTMLSelectElement | null>(null);

//   const [categories, setCategories] = useState<string[]>([]);

//   async function handleRegisterTransaction(event: FormEvent) {
//     event.preventDefault();

//     const transactionData = {
//       description: descriptionRef.current?.value || "",
//       amount: parseFloat(amountRef.current?.value || "0"), // Garantir que é um número
//       date: dateRef.current?.value || "",
//       type: parseFloat(typeRef.current?.value || "0"), // Garantir que é um número
//       payment: paymentRef.current?.value || "",
//       category: categoryRef.current?.value || "",
//       details: detailsRef.current?.value || "",
//       paid: statusRef.current?.value === "y" ? true : false,
//     };

//     //console.log("Dados da transação:", transactionData);

//     try {
//       const response = await api.post("/transaction", transactionData, {
//         params: { userID: "667f54419b1a5be227768419" },
//         headers: { Authorization: `Bearer ${manualToken}` },
//       });

//       if (response.status === 200) {
//         alert("Transação Criada com Sucesso!");
//         window.location.href = "/transactions";
//       }

//       //console.log("Resposta do servidor:", response.data);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(
//           "Erro ao carregar transações:",
//           error.response?.data || error.message
//         );
//       } else {
//         console.error("Erro desconhecido:", error);
//       }
//     }
//   }

//   useEffect(() => {
//     // Adicionando atributos apenas no lado do cliente para evitar discrepâncias
//     const elements = [
//       descriptionRef.current,
//       amountRef.current,
//       dateRef.current,
//       typeRef.current,
//       paymentRef.current,
//       categoryRef.current,
//       detailsRef.current,
//       statusRef.current,
//     ];

//     elements.forEach((el) => {
//       if (el) {
//         el.setAttribute("spellcheck", "false");
//         el.removeAttribute("data-ms-editor");
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const selectedType = typeRef.current?.value;

//     if (
//       selectedType !== undefined &&
//       ["1", "2", "3", "4", "5"].includes(selectedType)
//     ) {
//       const categoryOptions: Record<string, string[]> = {
//         "1": ["Habitação", "Transporte", "Alimentação"],
//         "2": ["Salário", "Auxílios", "Vendas"],
//         "3": ["Despesas Pessoais", "Educação", "Saúde"],
//         "4": ["Rendimentos", "Investimentos", "Outros"],
//         "5": ["CDB", "LCI", "LCA", "Tesouro Direto"],
//       };

//       setCategories(categoryOptions[selectedType]);
//     }
//   }, [typeRef.current?.value]);

//   return (
//     <>
//       <h1 className="font-bold text-2xl text-center text-blue-500 mt-2">
//         Nova Transação
//       </h1>
//       <div className="w-full mb-2 p-2 rounded">
//         <form
//           className="flex flex-col mx-12 my-2"
//           onSubmit={handleRegisterTransaction}
//         >
//           {/* Description */}
//           <label className="text-xs">Descrição:</label>
//           <input
//             ref={descriptionRef}
//             type="text"
//             required
//             className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {/* End */}

//           <div className="flex items-center space-x-2">
//             <div className="flex flex-col w-1/2">
//               {/* Amount */}
//               <label className="text-xs">Valor:</label>
//               <input
//                 ref={amountRef}
//                 type="number"
//                 required
//                 className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {/* End */}
//             </div>
//             <div className="flex flex-col w-1/2">
//               <label className="text-xs">Data:</label>
//               <input
//                 ref={dateRef}
//                 required
//                 type="date"
//                 className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {/* End */}
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <div className="flex flex-col w-1/2">
//               <label className="text-xs">Tipo:</label>
//               <select
//                 ref={typeRef}
//                 className="border border-1 mb-2 p-2 rounded w-full"
//                 onChange={() => {
//                   const selectedType = typeRef.current?.value;
//                   const categoryOptions = {
//                     "1": ["Habitação", "Transporte", "Alimentação"],
//                     "2": ["Salário", "Auxílios", "Vendas"],
//                     "3": ["Despesas Pessoais", "Educação", "Saúde"],
//                     "4": ["Rendimentos", "Investimentos", "Outros"],
//                     "5": ["CDB", "LCI", "LCA", "Tesouro Direto"],
//                   };
//                   setCategories(categoryOptions[selectedType] || []);
//                 }}
//               >
//                 <option value="1">Despesa Variável</option>
//                 <option value="2">Receita Variável</option>
//                 <option value="3">Despesa Fixa</option>
//                 <option value="4">Receita Fixa</option>
//                 <option value="5">Investimento</option>
//               </select>
//               {/* End */}
//             </div>

//             <div className="flex flex-col w-1/2">
//               <label className="text-xs">Pago com:</label>
//               <select
//                 ref={paymentRef}
//                 className="border border-1 mb-2 p-2 rounded w-full"
//               >
//                 <option value="1">Débito</option>
//                 <option value="2">Crédito</option>
//                 <option value="3">Pix</option>
//                 <option value="4">Dinheiro</option>
//                 <option value="5">Outros</option>
//               </select>
//               {/* End */}
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <div className="flex flex-col w-1/2">
//               <label className="text-xs">Categoria:</label>
//               <select
//                 ref={categoryRef}
//                 className="border border-1 w-full mb-2 p-2 rounded"
//               >
//                 {categories.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               {/* End */}
//             </div>

//             <div className="flex flex-col w-1/2">
//               <label className="text-xs">Status</label>
//               <select
//                 ref={statusRef}
//                 className="border border-1 w-full mb-2 p-2 rounded"
//               >
//                 <option value="1">Pago</option>
//                 <option value="2">Pendente</option>
//               </select>
//               {/* End */}
//             </div>
//           </div>

//           <label className="text-xs">Detalhes:</label>
//           <input
//             ref={detailsRef}
//             type="text"
//             className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {/* End */}
//           <input
//             type="submit"
//             value="Salvar Transação"
//             className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-500"
//           />
//           {/* End */}
//         </form>
//       </div>
//     </>
//   );
// }

//-----------------------------------------------------
"use client";

import { api } from "@/app/services/api";
import { manualToken } from "@/app/services/token";
import axios from "axios";
import { FormEvent, useRef, useEffect } from "react";

export default function NewTransaction() {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const paymentRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  async function handleRegisterTransaction(event: FormEvent) {
    event.preventDefault();

    const transactionData = {
      description: descriptionRef.current?.value || "",
      amount: parseFloat(amountRef.current?.value || "0"), // Garantir que é um número
      date: dateRef.current?.value || "",
      type: parseFloat(typeRef.current?.value || "0"), // Garantir que é um número
      payment: paymentRef.current?.value || "",
      category: categoryRef.current?.value || "",
      details: detailsRef.current?.value || "",
      paid: statusRef.current?.value === "y" ? true : false,
    };

    //console.log("Dados da transação:", transactionData);

    try {
      const response = await api.post("/transaction", transactionData, {
        params: { userID: "667f54419b1a5be227768419" },
        headers: { Authorization: `Bearer ${manualToken}` },
      });

      if (response.status === 200) {
        alert("Transação Criada com Sucesso!");
        window.location.href = "/transactions";
      }

      //console.log("Resposta do servidor:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao carregar transações:",
          error.response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  }

  useEffect(() => {
    // Adicionando atributos apenas no lado do cliente para evitar discrepâncias
    const elements = [
      descriptionRef.current,
      amountRef.current,
      dateRef.current,
      typeRef.current,
      paymentRef.current,
      categoryRef.current,
      detailsRef.current,
      statusRef.current,
    ];

    elements.forEach((el) => {
      if (el) {
        el.setAttribute("spellcheck", "false");
        el.removeAttribute("data-ms-editor");
      }
    });
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl text-center text-blue-500 mt-2">
        Nova Transação
      </h1>
      <div className="w-full mb-2 p-2 rounded">
        <form
          className="flex flex-col mx-12 my-2"
          onSubmit={handleRegisterTransaction}
        >
          {/* Description */}
          <label className="text-xs">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            required
            className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* End */}
          {/* temp ----------------------------------------------------*/}
          <div className="flex items-center space-x-2  ">
            <div className="flex flex-col w-full">
              {/* Amount */}
              <label className="text-xs">Valor:</label>
              <input
                ref={amountRef}
                //defaultValue="55"
                type="number"
                required
                className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* End */}
            </div>
            {/* Date */}
            <div className="flex flex-col w-full ">
              <label className="text-xs">Data:</label>
              <input
                ref={dateRef}
                required
                type="date"
                className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* End */}
            </div>
          </div>
          {/* Type ====================================== */}

          {/* temp ----------------------------------------------------*/}
          <div className="flex items-center space-x-2">
            {/* Tipo */}
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Tipo:</label>
              <select
                ref={typeRef}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="1">Despesa Variável</option>
                <option value="2">Receita Variável</option>
                <option value="3">Despesa Fixa</option>
                <option value="4">Receita Fixa</option>
                <option value="5">Investimento</option>
              </select>
              {/* End */}
            </div>
            {/* End */}

            {/* Pago com */}
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Pago com:</label>
              <select
                ref={paymentRef}
                className="border border-1 mb-2 p-2 rounded w-full"
              >
                <option value="1">Débito</option>
                <option value="2">Crédito</option>
                <option value="3">Pix</option>
                <option value="4">Dinheiro</option>
                <option value="5">Outros</option>
              </select>
              {/* End */}
            </div>
            {/* End */}
          </div>

          {/* Category */}

          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Categoria:</label>
              <select
                ref={categoryRef}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="1">Habitação</option>
                <option value="2">Transporte</option>
                <option value="3">Alimentação</option>
                <option value="4">Saúde</option>
                <option value="5">Educação</option>
                <option value="6">Lazer</option>
                <option value="7">Vestuário</option>
                <option value="8">Comunicação</option>
                <option value="9">Seguros</option>
                <option value="10">Impostos e Taxas</option>
                <option value="11">Dívidas e Empréstimos</option>
                <option value="12">Presentes e Doações</option>
                <option value="13">Despesas Pessoais</option>
                <option value="14">Animais de Estimação</option>
                <option value="15"> --- </option>
                <option value="16">Salário</option>
                <option value="17">Auxilios</option>
                <option value="18">Vendas</option>
                <option value="19">Rendimentos</option>
                <option value="20">Outros</option>
              </select>
              {/* End */}
            </div>

            {/* Status */}
            <div className="flex flex-col w-1/2">
              <label className="text-xs">Status</label>
              <select
                ref={statusRef}
                className="border border-1 w-full mb-2 p-2 rounded"
              >
                <option value="1">Pago</option>
                <option value="2">Pendente</option>
              </select>
              {/* End */}
            </div>
          </div>

          {/* Details */}
          <label className="text-xs">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            className="border border-1 w-full mb-2 p-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* End */}
          {/* Button */}
          <input
            type="submit"
            value="Salvar Transação"
            className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-500"
          />
          {/* End */}
        </form>
      </div>
    </>
  );
}
