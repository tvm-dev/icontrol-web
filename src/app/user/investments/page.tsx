"use client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { manualToken } from "../services/token";
import { formatCurrencyBRL } from "@/app/utils/formatCurrencies";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  payment?: string;
  category: string;
  type: number;
  details?: string;
  paid: boolean;
  createdAt: string;
}

export default function PageInvestments() {
  const [investments, setInvestments] = useState<Transaction[]>([]);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  useEffect(() => {
    const loadInvestments = async () => {
      try {
        console.log("Iniciando a busca por transações...");
        const response = await api.get("/transactions", {
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        console.log("Resposta da API:", response.data);

        const allTransactions = response.data;

        // Verifique a estrutura dos dados
        console.log("Transações recebidas:", allTransactions);

        // Filtragem correta para o tipo numérico
        const investments = allTransactions.filter(
          (transaction: Transaction) => {
            console.log("Tipo de transação:", transaction.type);
            return transaction.type === 5; // Corrigido para comparação numérica
          }
        );

        console.log("Investimentos filtrados:", investments);

        setInvestments(investments);

        // Calcular o total investido
        const total = investments.reduce(
          (sum, investment) => sum + investment.amount,
          0
        );
        setTotalInvested(total);
      } catch (error) {
        console.error("Erro ao carregar investimentos:", error);
      }
    };

    loadInvestments();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4">
      <h2 className="text-xl font-bold mb-4 mt-4 text-center">Investimentos</h2>

      {/* Div do Total Investido */}
      <div className="w-4/5 mx-auto bg-gradient-to-r from-green-400 to-yellow-500 text-white text-center p-4 rounded-lg mb-4">
        <h3 className="text-lg font-bold">Total Investido</h3>
        <p className="text-2xl font-semibold">
          {formatCurrencyBRL(totalInvested)}
        </p>
      </div>

      {/* Tabela de Investimentos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>

              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investments.length > 0 ? (
              investments.map((investment) => (
                <tr key={investment.id}>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(investment.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {investment.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {investment.amount.toFixed(2).replace(".", ",")}
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-900">
                    {investment.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {investment.details ?? "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-3 px-4 text-center text-sm text-gray-500"
                >
                  Nenhum investimento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
