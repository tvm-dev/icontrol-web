"use client";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { manualToken } from "../services/token";
import * as XLSX from "xlsx";
import pdfMake from "./pdfMakeConfig";
import Papa from "papaparse";

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

export default function PageReports() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reportType, setReportType] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await api.get("/transactions", {
          headers: { Authorization: `Bearer ${manualToken}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };
    loadTransactions();
  }, []);

  const filterTransactions = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize start and end dates to UTC
    const startUTC = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
    );
    const endUTC = new Date(
      Date.UTC(
        end.getUTCFullYear(),
        end.getUTCMonth(),
        end.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    // Check if dates are valid
    if (isNaN(startUTC.getTime()) || isNaN(endUTC.getTime())) {
      return [];
    }

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionUTC = new Date(
        Date.UTC(
          transactionDate.getUTCFullYear(),
          transactionDate.getUTCMonth(),
          transactionDate.getUTCDate()
        )
      );
      return transactionUTC >= startUTC && transactionUTC <= endUTC;
    });
  };

  const handleFilter = () => {
    const filteredData = filterTransactions();
    setFilteredTransactions(filteredData);
  };

  const generateCSV = (data: Transaction[]) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateXLSX = (data: Transaction[]) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  const generatePDF = (data: Transaction[]) => {
    const docDefinition = {
      content: [
        { text: "Relatório de Transações", style: "header" },
        {
          table: {
            body: [
              ["Data", "Descrição", "Valor", "Categoria", "Detalhes"],
              ...data.map((transaction) => [
                new Date(transaction.date).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                }),
                transaction.description,
                transaction.amount.toFixed(2).replace(".", ","),
                transaction.category,
                transaction.details ?? "N/A",
              ]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
      },
    };
    pdfMake.createPdf(docDefinition).download("relatorio.pdf");
  };

  const handleGenerateReport = () => {
    const filteredData = filterTransactions();
    switch (reportType) {
      case "csv":
        generateCSV(filteredData);
        break;
      case "xlsx":
        generateXLSX(filteredData);
        break;
      case "pdf":
        generatePDF(filteredData);
        break;
      default:
        console.error("Tipo de relatório não selecionado.");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Relatórios</h2>

      <div className="flex items-end space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700">Data de Início</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="flex-1">
          <label className="block text-gray-700">Data de Fim</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </div>

      {filteredTransactions.length > 0 && (
        <div className="mb-4">
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.amount.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.details ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredTransactions.length > 0 && (
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Tipo de Relatório</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Selecione um tipo</option>
              <option value="pdf">PDF</option>
              <option value="xlsx">XLSX</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <button
            onClick={handleGenerateReport}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Gerar Relatório
          </button>
        </div>
      )}
    </div>
  );
}
