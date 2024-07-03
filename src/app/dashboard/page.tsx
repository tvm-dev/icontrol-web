"use client";
import { manualToken } from "../services/token";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

//Interfaces:
// interface investmentsProps {
//   sum: number;
// }

export default function Dashboad() {
  //=======================Loading Balances:
  //FI: fixed income:
  const [fiSum, setFiSum] = useState<number | null>(null);

  //VI: variable income:
  const [viSum, setViSum] = useState<number | null>(null);

  //FE: fixed expenses:
  const [feSum, setFeSum] = useState<number | null>(null);

  // VE = variable expense:
  const [veSum, setVeSum] = useState<number | null>(null);

  //in: Investments:
  const [inSum, setInSum] = useState<number | null>(null);

  useEffect(() => {
    LoadFixedIncome(),
      LoadVariableIncome(),
      LoadFixedExpense(),
      LoadVariableExpense(),
      LoadInvestments();
  }, []);

  //starting fixe income:=============================
  async function LoadFixedIncome() {
    try {
      const response = await api.get("/balance/fi", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setFiSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }
  //starting variable income:=============================
  async function LoadVariableIncome() {
    try {
      const response = await api.get("/balance/vi", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setViSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }

  //starting fixed expense:=============================
  async function LoadFixedExpense() {
    try {
      const response = await api.get("/balance/fe", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setFeSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }

  //starting variable expense:=============================
  async function LoadVariableExpense() {
    try {
      const response = await api.get("/balance/ve", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setVeSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }

  //starting investiments:=============================
  async function LoadInvestments() {
    try {
      const response = await api.get("/balance/in", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setInSum(response.data);
    } catch (error) {
      console.log("Error tvm: ", error);
    }
  }

  //Formatting currenc:
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

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

        {/* full Name */}
        <div className="text-center bg-slate-300 p-2 rounded">
          <h2 className="text-center">
            Olá <span className="font-bold">Thiago</span>, Bom dia ☀️
          </h2>
        </div>
        {/* Months */}

        {/* Balance */}
        <p className="font-semibold">Saldos</p>

        <div className="grid grid-cols-2 drop-shadow-2xl text-white text-center py-4 rounded bg-blue-400">
          <div className="border-r-2">
            <h1 className="font-bold text-2xl">
              {formatCurrency((fiSum ?? 0) + (viSum ?? 0))}
            </h1>
            <p className="text-sm">Atual</p>
          </div>
          <div>
            <div>
              <h1 className="font-bold text-3xl">
                <span className="font-thin text-sm">R$</span> ?
              </h1>
              <p className="text-sm">Previsto</p>
            </div>
          </div>
        </div>

        {/* Revenues ============================== */}
        <p className="font-semibold">Receitas</p>

        <Link href={"/revenues"}>
          <div
            className="grid grid-cols-2 drop-shadow-2xl text-black  text-center p-2 rounded bg-green-400         
          hover:bg-green-500 transition duration-500"
          >
            <div className="border-r-2">
              <h1 className="font-bold text-3xl">
                {formatCurrency((fiSum ?? 0) + (viSum ?? 0))}
              </h1>
              <p className="text-sm">Atual</p>

              <p>
                <span className="font-thin text-sm">R$</span> ?
              </p>
              <p>Prevista</p>
            </div>
            <div>
              <div>
                <h1 className="font-bold"> {formatCurrency(fiSum ?? 0)} </h1>
                <p className="">Fixas</p>
              </div>

              <div>
                <h1 className="font-bold"> {formatCurrency(viSum ?? 0)} </h1>
                <p className="">Variáveis</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Expenses ============================== */}
        <p className="font-semibold">Despesas</p>

        <Link href={"/expenses"}>
          <div
            className="grid grid-cols-2 drop-shadow-2xl text-white text-center p-2 rounded bg-red-400         
          hover:bg-red-500 transition duration-500"
          >
            <div className="border-r-2">
              <h1 className="font-bold text-3xl">
                {formatCurrency((feSum ?? 0) + (veSum ?? 0))}
              </h1>
              <p className="text-sm">Atual</p>
              <p>R$ ?</p>
              <p>Prevista</p>
            </div>
            <div>
              <div>
                <h1 className="font-bold"> {formatCurrency(feSum ?? 0)}</h1>
                <p className="">Fixas</p>
              </div>
              <span className="underline"> </span>
              <div>
                <h1 className="font-bold">{formatCurrency(veSum ?? 0)} </h1>
                <p className="">Variáveis</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Investiments ==============================*/}
        <p className="font-semibold">Investimentos</p>

        <Link href={"/investments"}>
          <div className="grid grid-cols-2 drop-shadow-2xl text-white text-center py-5 rounded bg-sky-800 hover:bg-yellow-500 transition duration-500">
            <div className="border-r-2">
              <h1 className="font-bold text-2xl">
                <span className="font-thin text-sm">R$</span>{" "}
                {formatCurrency(inSum ?? 0)}
              </h1>
              <p className="text-sm">Este mês</p>
            </div>
            <div>
              <div>
                <h1 className="font-bold">?</h1>
                <p className="">Total</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Graficos */}
      </div>
    </>
  );
}
