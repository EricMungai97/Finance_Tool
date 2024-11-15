"use client";

import TransactionList from "@/app/components/TransactionList";
import { useState, useEffect } from "react";
import { Transaction } from "@/app/type";
import { fetchTransactions, addTransaction, deleteTransaction } from "@/app/lib/transactions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TxnChart from "./components/Txn";
import TransactionForm from "@/app/components/txnForm"; // Import the form component

export default function HomePage() {
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchTransactions();
        setTransactions(response);
      } catch (error) {
        console.log("Error fetching transactions:", error);
      } finally {
        setLoading(false);
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
      await deleteTransaction(id);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Finance Dashboard</h1>

      {/* Chart */}
      <Card className="shadow-lg rounded-lg p-6 bg-white">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold">Income vs Expense</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center">Loading chart...</div>
          ) : transactions.length > 0 ? (
            <TxnChart transactions={transactions} />
          ) : (
            <div className="text-center">No transactions to display</div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Card */}
        <Card className="shadow-lg rounded-lg bg-white p-4">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Add New Transaction</h2>
          </CardHeader>
          <CardContent>
            <TransactionForm
              type={type}
              setType={setType}
              category={category}
              setCategory={setCategory}
              amount={amount}
              setAmount={setAmount}
              description={description}
              setDescription={setDescription}
              handleSubmit={handleSubmit}
            />
          </CardContent>
        </Card>

        {/* Open Modal Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md"
        >
          View Transaction History
        </Button>

        {/* Transactions Modal */}
        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}