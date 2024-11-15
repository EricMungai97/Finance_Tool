import React from "react";
import { Button } from "@/components/ui/button";

interface TransactionFormProps {
  type: "income" | "expense";
  setType: (value: "income" | "expense") => void;
  category: string;
  setCategory: (value: string) => void;
  amount: number | "";
  setAmount: (value: number | "") => void;
  description: string;
  setDescription: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  description,
  setDescription,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-gray-700 font-medium">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Category:</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value ? parseFloat(e.target.value) : "")
          }
          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm"
          required
        />
      </div>
     
      <div>
        <label className="block text-gray-700 font-medium">Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm"
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md w-full mt-4"
      >
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;