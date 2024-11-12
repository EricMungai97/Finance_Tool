import { NextResponse } from "next/server";
import { fetchTransactionById, deleteTransaction } from "@/app/lib/transactions";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
  }

  try {
    const transaction = await fetchTransactionById(Number(id));
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
  }

  try {
    await deleteTransaction(Number(id));
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}