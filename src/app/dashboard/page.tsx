"use client";
import { manualToken } from "../services/token";
import { api } from "../services/api";
import { useEffect, useState } from "react";

//Interfaces:
// interface investmentsProps {
//   sum: number;
// }

export default function Dashboad() {
  //=======================Loading investments:
  //const [investmentSum, setInvestmentSum] = useState<number | null>(null);
  const [investmentSum, setInvestmentSum] = useState<number | null>(null);

  useEffect(() => {
    LoadInvestments();
  }, []);

  async function LoadInvestments() {
    try {
      const response = await api.get("/balance/in", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      console.log(response.data);
      setInvestmentSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }
  //end

  return (
    <>
      <div className="m-5">
        <div className="flex flex-row justify-between my-2 ">
          <h2 className="font-bold mt-2 ">Dashboad</h2>
          <a href="/transactions/new">
            <h2 className="font-bold mt-2 cursor-pointer bg-red-300 p-2 m-2 rounded hover:bg-red-500 transition duration-300  ">
              + Nova Transação
            </h2>
          </a>
        </div>
        {/* Saldo */}
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className=" border-zinc-500 w-full h-32 rounded-lg p-5 bg-blue-500">
            <p className="text-3xl font-bold ">R$ ?</p>
            <p className="font-medium">Saldo</p>
            <p className="font-semibold">R$ ?</p>
            <p className="font-extralight">Saldo Previsto</p>
          </div>
        </div>
        {/* Receitas */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className=" border-zinc-500 w-full h-32 rounded-lg p-5 bg-green-400">
            <p className="text-3xl font-bold ">R$ 500,00</p>
            <p className="font-medium">Receitas</p>
            <p className="font-semibold">R$ 19.500,00</p>
            <p className="font-extralight">Receitas Previstas</p>
          </div>
        </div>
        {/* Despesas */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className=" border-zinc-500 w-full h-32 rounded-lg p-5 bg-red-400">
            <p className="text-3xl font-bold ">R$ 1000,00</p>
            <p className="font-medium">Despesas</p>
            <p className="font-semibold">R$ 5000,00</p>
            <p className="font-extralight">Despesas Previstas</p>
          </div>
        </div>
        {/* Investimentos ======================================================================*/}

        {/* <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className=" border-zinc-500 w-full h-32 rounded-lg p-5 bg-indigo-500">
            <p className="text-3xl font-bold "> ? </p>
            <p className="font-medium">Investimentos</p>
            <p className="font-semibold">R$ 7.500,00</p>
            <p className="font-extralight">Investimentos Previstos</p>
          </div>
        </div> */}

        {/* ==  */}
        {investmentSum !== null && (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
            <div className="border-zinc-500 w-full h-32 rounded-lg p-5 bg-indigo-500">
              <p className="text-3xl font-bold">R$ {investmentSum}</p>
              <p className="font-medium">Investimento Total</p>
              <p className="font-extralight">Valor atual dos investimentos</p>
            </div>
          </div>
        )}
        {/* ==  */}

        {/* Graficos */}
        <h2 className="font-bold m-5 mt-5 ">Números em Gráficos</h2>
        {/* Saldos */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Saldos
          </div>
        </div>
        {/* ---------- */}
        {/* Despesas Variáveis */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Despesas Variáveis
          </div>
        </div>
        {/* ---------- */}
        {/* Despesas Fixas */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Despesas Fixas
          </div>
        </div>
        {/* ---------- */}
        {/* Receitas Variaveis */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Receitas Variaveis
          </div>
        </div>
        {/* ---------- */}
        {/* Receitas Fixas */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Receitas Fixas
          </div>
        </div>
        {/* ---------- */}
        {/* Investimentos */}
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 m-1 text-center">
          <div className="bg-orange-400 h-32 rounded pt-2 font-semibold">
            Investimentos
          </div>
        </div>
        {/* ---------- */}
      </div>
    </>
  );
}
