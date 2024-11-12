import { NextResponse } from "next/server";
import { fetchTransactionById, deleteTransaction } from "@/app/lib/transactions";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const transaction = await fetchTransactionById(Number(params.id));
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteTransaction(Number(params.id));
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}