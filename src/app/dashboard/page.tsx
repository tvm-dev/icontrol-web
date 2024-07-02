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

        {/* Balance */}
        <p className="font-semibold">Saldos</p>
        {fiSum !== null && viSum !== null && (
          <div className="grid grid-cols-2 drop-shadow-2xl text-white text-center p-6 rounded bg-blue-400">
            <div className="border-r-2">
              <h1 className="font-bold"> R$ {fiSum + viSum} </h1>
              <p className="text-sm">Atual</p>
            </div>
            <div>
              <div>
                <h1 className="font-bold">R$ ?</h1>
                <p className="text-sm">Previsto</p>
              </div>
            </div>
          </div>
        )}

        {/* Revenues ============================== */}
        <p className="font-semibold">Receitas</p>
        {fiSum !== null && viSum !== null && (
          <Link href={"/revenues"}>
            <div
              className="grid grid-cols-2 drop-shadow-2xl text-black  text-center p-2 rounded bg-green-400         
          hover:bg-green-500 transition duration-500"
            >
              <div className="border-r-2">
                <h1 className="font-bold text-3xl">
                  <span className="font-thin text-sm">R$</span> {fiSum + viSum}
                </h1>
                <p className="text-sm">Atual</p>
                <p>R$ 20.000,22</p>
                <p>Prevista</p>
              </div>
              <div>
                <div>
                  <h1 className="font-bold">R$ {fiSum}</h1>
                  <p className="">Fixas</p>
                </div>

                <div>
                  <h1 className="font-bold">R$ {viSum} </h1>
                  <p className="">Variáveis</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Expenses ============================== */}
        <p className="font-semibold">Despesas</p>
        {feSum !== null && veSum !== null && (
          <Link href={"/expenses"}>
            <div
              className="grid grid-cols-2 drop-shadow-2xl text-white text-center p-2 rounded bg-red-400         
          hover:bg-red-500 transition duration-500"
            >
              <div className="border-r-2">
                <h1 className="font-bold text-3xl mt-5">
                  <span className="font-thin text-sm">R$</span> {feSum + veSum}
                </h1>
                <p className="text-sm">Atual</p>
                <p>R$ 20.000,22</p>
                <p>Prevista</p>
              </div>
              <div>
                <div>
                  <h1 className="font-bold">R$ {feSum}</h1>
                  <p className="">Despesas Fixas</p>
                </div>
                <span className="underline"> </span>
                <div>
                  <h1 className="font-bold">R$ {veSum} </h1>
                  <p className="">Despesas Variáveis</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Investiments ==============================*/}
        <p className="font-semibold">Investimentos</p>
        {inSum !== null && (
          <Link href={"/investments"}>
            <div className="grid grid-cols-2 drop-shadow-2xl text-white text-center p-2 rounded bg-sky-800 hover:bg-yellow-500 transition duration-500">
              <div className="border-r-2">
                <h1 className="font-bold text-3xl">
                  <span className="font-thin text-sm">R$</span> {inSum}
                </h1>
                <p className="text-sm">Deste mês</p>
              </div>
              <div>
                <div>
                  <h1 className="font-bold">R$ 100.000,21</h1>
                  <p className="">Total</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Graficos */}
      </div>
    </>
  );
}
