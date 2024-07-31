//===
"use client";
//===

import { useState, useEffect } from "react";
import { api } from "../services/api";
import { manualToken } from "../services/token";
import * as XLSX from "xlsx";
import pdfMake from "./pdfMakeConfig";
import Papa from "papaparse";

// Mapeamento de tipos de transação
const typeMapping: Record<number, string> = {
  1: "DV",
  2: "RV",
  3: "DF",
  4: "RF",
  5: "In",
};

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
  createdAt: string; // Não incluir no XLSX
  updatedAt: string; // Não incluir no XLSX
  userID: number; // Não incluir no XLSX
}

const formatMonthYear = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("pt-BR", options);
};

const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = formatMonthYear(date);

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(transaction);
  });

  return grouped;
};

const calculateTotalsByMonth = (transactions: Transaction[]) => {
  const totals: Record<
    string,
    { income: number; expenses: number; total: number }
  > = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = formatMonthYear(date);

    if (!totals[monthYear]) {
      totals[monthYear] = { income: 0, expenses: 0, total: 0 };
    }

    const amount = transaction.amount;
    if (transaction.type === 1 || transaction.type === 2) {
      // Assuming 1 and 2 are for income
      totals[monthYear].income += amount;
    } else {
      // Assuming others are for expenses
      totals[monthYear].expenses += amount;
    }

    totals[monthYear].total =
      totals[monthYear].income - totals[monthYear].expenses;
  });

  return totals;
};

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
    const csv = Papa.unparse(
      data.map((transaction) => ({
        ...transaction,
        type: typeMapping[transaction.type] || "Unknown",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  ///===============================================================================
  const generateXLSX = (data: Transaction[]) => {
    // Define o mapeamento de cabeçalhos em português
    const headers = [
      "Data",
      "Descrição",
      "Valor",
      "Categoria",
      "Tipo",
      "Detalhes",
      "Pagamento",
      "Pago",
    ];

    // Remove a coluna `id` e traduz os dados conforme os cabeçalhos
    const filteredData = data.map((transaction) => ({
      Data: new Date(transaction.date).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
      Descrição: transaction.description,
      Valor: transaction.amount.toFixed(2).replace(".", ","),
      Categoria: transaction.category,
      Tipo: typeMapping[transaction.type] || "Desconhecido",
      Detalhes: transaction.details ?? "N/A",
      Pagamento: transaction.payment ?? "N/A",
      Pago: transaction.paid ? "Sim" : "Não",
    }));

    // Cria a planilha com os cabeçalhos e dados traduzidos
    const ws = XLSX.utils.json_to_sheet(filteredData, { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório Excel");
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  ///===========

  const generatePDF = (data: Transaction[]) => {
    const groupedData = groupTransactionsByMonth(data);
    const totalsByMonth = calculateTotalsByMonth(data);

    const body: any[] = [];

    Object.keys(groupedData).forEach((monthYear) => {
      const transactions = groupedData[monthYear];
      const totals = totalsByMonth[monthYear];

      body.push([
        { text: `Mês: ${monthYear}`, colSpan: 8, style: "monthHeader" },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      body.push([
        "Data",
        "Descrição",
        "Valor",
        "Categoria",
        "Tipo",
        "Detalhes",
        "Pagamento",
        "Pago",
      ]);

      transactions.forEach((transaction) => {
        body.push([
          new Date(transaction.date).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          }),
          transaction.description,
          transaction.amount.toFixed(2).replace(".", ","),
          transaction.category,
          typeMapping[transaction.type] || "Unknown",
          transaction.details ?? "N/A",
          transaction.payment ?? "N/A",
          transaction.paid ? "Sim" : "Não",
        ]);
      });

      body.push([
        { text: "Totais", colSpan: 2 },
        {},
        {
          text: `Receitas: ${totals.income.toFixed(2).replace(".", ",")}`,
          colSpan: 6,
        },
        {},
        {
          text: `Despesas: ${totals.expenses.toFixed(2).replace(".", ",")}`,
          colSpan: 6,
        },
        {},
        {
          text: `Saldo: ${totals.total.toFixed(2).replace(".", ",")}`,
          colSpan: 6,
        },
        {},
      ]);
    });

    const docDefinition = {
      pageOrientation: "landscape",
      pageMargins: [40, 60, 40, 80], // Adjusted bottom margin for footer
      content: [
        {
          text: "iControl: porque VC controla sua grana!",
          style: "title",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          text: "Relatório de Transações",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
            body,
          },
          layout: "lightHorizontalLines",
        },
      ],
      footer: (currentPage: number, pageCount: number) => ({
        columns: [
          {
            text: `Página ${currentPage} de ${pageCount}`,
            alignment: "center",
            color: "black",
          },
          { text: "icontrol.com", alignment: "center", color: "blue" },
        ],
        margin: [10, 0, 10, 10], // Adjust margin for footer
      }),
      styles: {
        title: { fontSize: 24, bold: true, margin: [0, 20, 0, 10] },
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
        monthHeader: {
          fontSize: 14,
          bold: true,
          fillColor: "#f0f0f0",
          margin: [0, 10, 0, 10],
        },
      },
    };

    if (pdfMake) {
      pdfMake.createPdf(docDefinition).download("relatorio.pdf");
    } else {
      console.error("pdfMake não está definido.");
    }
  };

  const handleGenerateReport = () => {
    if (!reportType) {
      console.error("Tipo de relatório não selecionado.");
      return;
    }

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
      <h1 className="text-3xl font-bold text-center">
        iControl: porque VC controla sua grana!
      </h1>
      <h2 className="text-xl font-bold p-1">Relatórios</h2>
      <p className="font-thin border px-2 text-blue-500">
        Selecione a data inicial e a data final, clique em filtrar para ver as
        transações. Depois, se precisar do relatório em PDF, Excel(xlsx) ou CSV,
        clique no botão Gerar o Relatório!
      </p>

      <div className="flex items-end space-x-6 mb-4">
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
                  Tipo
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalhes
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pago
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
                    {typeMapping[transaction.type] || "Unknown"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.details ?? "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.payment ?? "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.paid ? "Sim" : "Não"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredTransactions.length > 0 && (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-4">
              <label className="block text-red-700">Gerar Relatório em:</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="p-2 border rounded w-32"
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="pdf">PDF</option>
                <option value="xlsx">XLSX</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <button
              onClick={handleGenerateReport}
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Agora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
