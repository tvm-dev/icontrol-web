"use client";
import { manualToken } from "../services/token";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrencyBRL } from "@/utils/formatCurrencies";
import Greeting from "@/utils/greetings";

export default function Dashboard() {
  const [fiSum, setFiSum] = useState<number | null>(null);
  const [viSum, setViSum] = useState<number | null>(null);
  const [feSum, setFeSum] = useState<number | null>(null);
  const [veSum, setVeSum] = useState<number | null>(null);
  const [inSum, setInSum] = useState<number | null>(null);

  useEffect(() => {
    loadBalances();
  }, []);

  const loadBalances = async () => {
    await Promise.all([
      loadFixedIncome(),
      loadVariableIncome(),
      loadFixedExpense(),
      loadVariableExpense(),
      loadInvestments(),
    ]);
  };

  const loadFixedIncome = async () => {
    try {
      const response = await api.get("/balance/fi", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setFiSum(response.data);
    } catch (error) {
      console.log("Error loading fixed income: ", error);
    }
  };

  const loadVariableIncome = async () => {
    try {
      const response = await api.get("/balance/vi", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setViSum(response.data);
    } catch (error) {
      console.log("Error loading variable income: ", error);
    }
  };

  const loadFixedExpense = async () => {
    try {
      const response = await api.get("/balance/fe", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setFeSum(response.data);
    } catch (error) {
      console.log("Error loading fixed expense: ", error);
    }
  };

  const loadVariableExpense = async () => {
    try {
      const response = await api.get("/balance/ve", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setVeSum(response.data);
    } catch (error) {
      console.log("Error loading variable expense: ", error);
    }
  };

  const loadInvestments = async () => {
    try {
      const response = await api.get("/balance/in", {
        headers: { Authorization: `Bearer ${manualToken}` },
      });
      setInSum(response.data);
    } catch (error) {
      console.log("Error loading investments: ", error);
    }
  };

  return (
    <div className="md:ml-64 p-4 pt-20">
      <div className="flex flex-row justify-between my-2">
        <h2 className="font-bold mt-2">Dashboard</h2>
      </div>

      <div className="text-center bg-blue-50 p-2 rounded mb-4">
        <h2>
          <Greeting />
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance */}
        <div className="bg-blue-400 text-white text-center p-2 rounded-lg shadow-lg">
          <p className="font-semibold">Saldos</p>
          <div className="flex flex-col">
            <div className="flex flex-1 justify-between items-center">
              <div className="flex flex-col items-center flex-1">
                <h1 className="font-bold text-xl">
                  {formatCurrencyBRL((fiSum ?? 0) + (viSum ?? 0))}
                </h1>
                <p className="text-sm">Atual</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <h1 className="font-bold text-2xl">
                  <span className="font-thin text-sm">R$</span> ?
                </h1>
                <p className="text-sm">Previsto</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenues */}
        <Link href="/revenues">
          <div className="bg-green-400 text-black text-center p-4 rounded-lg shadow-lg hover:bg-green-500 transition duration-500">
            <p className="font-semibold mb-2">Receitas</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold text-xl">
                    {formatCurrencyBRL((fiSum ?? 0) + (viSum ?? 0))}
                  </h1>
                  <p className="text-sm">Atual</p>
                  <p>
                    <span className="font-thin text-sm">R$</span> ?
                  </p>
                  <p>Prevista</p>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold">{formatCurrencyBRL(fiSum ?? 0)}</h1>
                  <p>Fixas</p>
                  <h1 className="font-bold">{formatCurrencyBRL(viSum ?? 0)}</h1>
                  <p>Variáveis</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Expenses */}
        <Link href="/expenses">
          <div className="bg-red-400 text-white text-center p-4 rounded-lg shadow-lg hover:bg-red-500 transition duration-500">
            <p className="font-semibold mb-2">Despesas</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold text-xl">
                    - {formatCurrencyBRL((feSum ?? 0) + (veSum ?? 0))}
                  </h1>
                  <p className="text-sm">Atual</p>
                  <p> - R$ ?</p>
                  <p>Prevista</p>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold">
                    - {formatCurrencyBRL(feSum ?? 0)}
                  </h1>
                  <p>Fixas</p>
                  <h1 className="font-bold">
                    - {formatCurrencyBRL(veSum ?? 0)}
                  </h1>
                  <p>Variáveis</p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Investments */}
        <Link href="/investments">
          <div className="bg-sky-800 text-white text-center p-4 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-500">
            <p className="font-semibold mb-2">Investimentos</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold text-xl">
                    <span className="font-thin text-sm"> - </span>
                    {formatCurrencyBRL(inSum ?? 0)}
                  </h1>
                  <p className="text-sm">Este mês</p>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <h1 className="font-bold">?</h1>
                  <p>Total</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
