import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Transaction } from "@/app/type";

interface TxnChartProps {
  transactions: Transaction[];
}

const TxnDetailedChart: React.FC<TxnChartProps> = ({ transactions }) => {
  let cumulativeIncome = 0;
  let cumulativeExpense = 0;

  // Calculate cumulative income and expense
  transactions.forEach((txn) => {
    if (txn.type === "income") {
      cumulativeIncome += txn.amount;
    } else if (txn.type === "expense") {
      cumulativeExpense += txn.amount;
    }
  });

  // Data for the Pie Chart
  const data = [
    { name: "Income", value: cumulativeIncome },
    { name: "Expense", value: cumulativeExpense },
  ];

  const COLORS = ["#28a745", "#dc3545"]; // Green for income, red for expense

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { name, value } = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-lg rounded-md text-center">
                  <p className="font-semibold">{name}: ${value.toFixed(2)}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TxnDetailedChart;