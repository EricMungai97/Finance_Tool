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
  const COLORS_INCOME = ["#28a745", "#20c997", "#1e7e34", "#2e8b57"]; // Shades of green for income categories
  const COLORS_EXPENSE = ["#dc3545", "#e4606d", "#c82333", "#f86c6b"]; // Shades of red for expense categories

  // Group data by categories for income and expense
  const groupedData: { name: string; value: number; type: string }[] = [];

  transactions.forEach((txn) => {
    const existingIndex = groupedData.findIndex(
      (entry) => entry.name === txn.category && entry.type === txn.type
    );
    if (existingIndex > -1) {
      groupedData[existingIndex].value += txn.amount;
    } else {
      groupedData.push({
        name: txn.category,
        value: txn.amount,
        type: txn.type,
      });
    }
  });

  // Calculate total expense
  const totalExpense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div className="flex flex-col items-center space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={groupedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
          >
            {groupedData.map((entry, index) => {
              const colors =
                entry.type === "income" ? COLORS_INCOME : COLORS_EXPENSE;
              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
            })}
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
      <div className="text-center text-gray-800">
        <p className="font-bold text-lg">Total Expense: ${totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TxnDetailedChart;