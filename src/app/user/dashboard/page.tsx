"use client";

import Head from "next/head";
import { manualToken } from "../services/token";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrencyBRL } from "../../utils/formatCurrencies";
import Greeting from "../../utils/greetings";
import BalancesCharts from "../components/charts/balances";
import NewTransactionButton from "../components/NewTransactionButton";

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
    <>
      <Head>
        <title>Título da Página no Cliente</title>
        <meta name="description" content="Descrição da Página no Cliente" />
      </Head>

      <div className="md:ml-5 p-4 pt-7 ">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold mt-2">Início</h2>
          <NewTransactionButton />
        </div>

        <div className="text-center">
          <h2>
            <Greeting />
          </h2>
        </div>
        {/* Início === */}

        <div className="p-4">
          {/* Container para os quatro blocos */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4">
            {/* Div de Saldo */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <div className="flex flex-col items-start">
                <h2 className="text-sm">Saldo</h2>
                <p className="text-2xl font-bold mb-1">
                  {formatCurrencyBRL(fiSum + viSum - (feSum + veSum + inSum))}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <ul className="list-none text-xs flex flex-col space-y-1">
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Previsto:</span>
                    <span>R$ 12.000</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Div de Receitas */}
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold mb-1">Receitas</h2>
                <p className="text-2xl font-bold mb-1">
                  {formatCurrencyBRL((fiSum ?? 0) + (viSum ?? 0))}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:ml-2">
                <ul className="list-none text-xs flex flex-col space-y-1">
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Prevista:</span>
                    <span>R$ 20.000</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Fixa:</span>
                    <span>R$ 15.500</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Variável:</span>
                    <span>R$ 1.500</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Div de Despesas */}
            <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold mb-1">Despesas</h2>
                <p className="text-2xl font-bold mb-1">
                  {formatCurrencyBRL((feSum ?? 0) + (veSum ?? 0))}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:ml-2">
                <ul className="list-none text-xs flex flex-col space-y-1">
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Prevista:</span>
                    <span>R$ 15.000</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Fixa:</span>
                    <span>R$ 8.000</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Variável:</span>
                    <span>R$ 5.000</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Div de Investimentos */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold mb-1">Investimentos</h2>
                <p className="text-2xl font-bold mb-1">
                  {formatCurrencyBRL(inSum ?? 0)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:ml-2">
                <ul className="list-none text-xs flex flex-col space-y-1">
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Prevista:</span>
                    <span>R$ 10.000</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Fixa:</span>
                    <span>R$ 5.000</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <span className="font-semibold">Variável:</span>
                    <span>R$ 2.000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Balances */}
        <div className="flex justify-center items-center mt-8 mb-4 p-4 bg-white rounded-lg shadow-md w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
          <BalancesCharts />
        </div>
      </div>
    </>
  );
}
