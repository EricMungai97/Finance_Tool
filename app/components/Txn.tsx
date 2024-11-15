import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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

  // Prepare data points with cumulative income and expense
  const data = transactions.map((txn) => {
    if (txn.type === "income") {
      cumulativeIncome += txn.amount;
    } else if (txn.type === "expense") {
      cumulativeExpense += txn.amount;
    }

    return {
      income: cumulativeIncome,
      expense: cumulativeExpense,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={false} /> {/* Hide X-axis labels */}
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { income, expense } = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-lg rounded-md">
                  <p>Income: ${income.toFixed(2)}</p>
                  <p>Expense: ${expense.toFixed(2)}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line type="linear" dataKey="income" stroke="#82ca9d" />
        <Line type="linear" dataKey="expense" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TxnDetailedChart;