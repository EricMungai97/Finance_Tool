import { NextResponse } from "next/server";
import { fetchTransactions, addTransaction } from "@/app/lib/transactions";

export async function GET() {
  try {
    const transactions = await fetchTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTransaction = await addTransaction(data);
    return NextResponse.json(newTransaction);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}