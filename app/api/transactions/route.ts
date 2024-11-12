// app/api/route.ts

import { NextResponse } from "next/server";
import { fetchTransactions, addTransaction } from "@/app/lib/transactions";
import type { NextRequest } from "next/server";

export async function GET() {
  try {
    const transactions = await fetchTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newTransaction = await addTransaction(data);
    return NextResponse.json(newTransaction);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Failed to add transaction" }, { status: 500 });
  }
}