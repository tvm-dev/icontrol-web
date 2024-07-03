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
      <h1 className="text-center font-bold text-blue-600 mt-1">
        Nova Transação
      </h1>
      <div className="">
        <form
          className="flex flex-col mx-12 my-2"
          onSubmit={handleRegisterTransaction}
        >
          {/* Description */}
          <label className="font-medium">Descrição:</label>
          <input
            ref={descriptionRef}
            type="text"
            required
            className="border border-1 w-full mb-2 p-2 rounded"
          />
          {/* End */}

          {/* Amount */}

          <label className="font-medium">Valor:</label>
          <input
            ref={amountRef}
            defaultValue="55"
            type="number"
            required
            className="border border-1 w-full mb-2 p-2 rounded"
          />
          {/* End */}

          {/* Date */}
          <label className="font-medium">Data:</label>
          <input
            ref={dateRef}
            required
            type="date"
            className="border border-1 w-full mb-2 p-2 rounded"
          />
          {/* End */}

          {/* Type ====================================== */}
          <label className="font-medium">Tipo:</label>
          <select
            ref={typeRef}
            className="border border-1 w-full mb-2 p-2 rounded"
          >
            <option value="1">Despesa Variável</option>
            <option value="2">Receita Variável</option>
            <option value="3">Despesa Fixa</option>
            <option value="4">Receita Fixa</option>
            <option value="5">Investimentos</option>
          </select>
          {/* End */}

          {/* Payment */}
          <label className="font-medium">Pago com:</label>
          <select
            ref={paymentRef}
            className="border border-1 w-full mb-2 p-2 rounded"
          >
            <option value="1">Débito</option>
            <option value="2">Crédito</option>
            <option value="3">Pix</option>
            <option value="4">Dinheiro</option>
            <option value="5">Outros</option>
          </select>
          {/* End */}

          {/* Category */}
          <label className="font-medium">Categoria:</label>
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

          {/* Details */}
          <label className="font-medium">Detalhes:</label>
          <input
            ref={detailsRef}
            type="text"
            className="border border-1 w-full mb-2 p-2 rounded"
          />
          {/* End */}

          {/* isPaid */}
          <label className="font-medium">Status</label>
          <select
            ref={statusRef}
            className="border border-1 w-full mb-2 p-2 rounded"
          >
            <option value="1">Pago</option>
            <option value="2">Pendente</option>
          </select>
          {/* End */}

          {/* Button */}
          <input
            type="submit"
            value="Registrar"
            className="cursor-pointer w-full bg-blue-400 rounded font-bold p-3 text-white hover:bg-blue-900 transition duration-500"
          />
          {/* End */}
        </form>
      </div>
    </>
  );
}
