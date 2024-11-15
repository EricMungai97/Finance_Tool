"use client";

import React, { useState } from "react";
import { Transaction } from "@/app/type";
import { Button } from "@/components/ui/button";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  isOpen,
  onClose,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleAccordion = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-lg shadow-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Transaction List
        </h2>

        {/* Scrollable Container */}
        <div className="max-h-96 overflow-y-auto space-y-4">
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <div key={txn.id} className="border rounded-md shadow-sm">
                {/* Accordion Header */}
                <div
                  onClick={() => toggleAccordion(index)}
                  className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-t-md"
                >
                  <h3 className="text-lg font-semibold">{txn.category}</h3>
                  <span className="text-gray-500">
                    {expandedIndex === index ? "▲" : "▼"}
                  </span>
                </div>

                {/* Accordion Content */}
                {expandedIndex === index && (
                  <div className="p-4 bg-white flex flex-col gap-2">
                    <p>
                      <strong>Type:</strong> {txn.type}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${txn.amount}
                    </p>
                    <p>
                      <strong>Description:</strong> {txn.description}
                    </p>
                    <Button
                      onClick={() => onDelete(txn.id)}
                      className="text-white bg-red-500 hover:bg-red-600 mt-2 w-full"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;