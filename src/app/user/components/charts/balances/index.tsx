import "./styles.css";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados recriados com todos os meses do ano
const data = [
  { month: "Janeiro", receitas: 4000, despesas: 2400, saldo: 1600 },
  { month: "Fevereiro", receitas: 3000, despesas: 1398, saldo: 1602 },
  { month: "Março", receitas: 2000, despesas: 2800, saldo: -800 },
  { month: "Abril", receitas: 2780, despesas: 3908, saldo: -1128 },
  { month: "Maio", receitas: 1890, despesas: 4800, saldo: -2910 },
  { month: "Junho", receitas: 2390, despesas: 3800, saldo: -1410 },
  { month: "Julho", receitas: 3490, despesas: 4300, saldo: -810 },
  { month: "Agosto", receitas: 4200, despesas: 3600, saldo: 600 },
  { month: "Setembro", receitas: 3300, despesas: 3100, saldo: 200 },
  { month: "Outubro", receitas: 4500, despesas: 4200, saldo: 300 },
  { month: "Novembro", receitas: 3800, despesas: 2900, saldo: 900 },
  { month: "Dezembro", receitas: 4000, despesas: 3500, saldo: 500 },
];

export default function saldosCharts() {
  return (
    <div className="flex justify-center items-center h-[90vh] w-[90vw]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="receitas"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="despesas"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="saldo"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
