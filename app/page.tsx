"use client";

import TransactionList from "@/app/components/TransactionList";
import { addTransaction } from "@/app/api/route";
import { useState, useEffect } from "react";
import { fetchTransactions } from "@/app/api/route";
import { Transaction } from "@/app/type";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/app/api/route";

export default function HomePage() {
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTransactions();
        setTransactions(response);
      } catch (error) {
        console.log("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof amount === "number" && !isNaN(amount)) {
      try {
        const newTransaction: Transaction = await addTransaction({
          type,
          category,
          amount,
          description,
        });

        setTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]);

        setCategory("");
        setAmount("");
        setDescription("");
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id); // Delete transaction on backend
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      ); // Remove transaction from state
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Finance Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Card */}
        <Card className="shadow-lg rounded-lg bg-beige-50">
          <CardHeader className="text-center">
            <h2 className="text-xl font-semibold">Add Transaction</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Type:</label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "income" | "expense")
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Category:</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value ? parseFloat(e.target.value) : "")
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Description:</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mt-2 text-white py-2 px-4 rounded-md shadow-md"
            >
              Add Transaction
            </Button>
          </CardFooter>
        </Card>

        {/* Transactions List Card */}
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <h2 className="text-xl font-semibold">Transaction History</h2>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
