export const dynamic = "force-dynamic";
import { Transaction } from "@/app/type";
const API_URL = "https://expense-app-production-d2a4.up.railway.app/transactions";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(API_URL);
  console.log(response);
  return response.json();
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await fetch(API_URL + `/${id}`, { method: "DELETE" });
};

export const fetchTransactionById = async (
  id: number,
): Promise<Transaction> => {
  const response = await fetch(API_URL + `/${id}`);
  return response.json();
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id">,
): Promise<Transaction> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return response.json();
};
