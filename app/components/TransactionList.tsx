'use client';
import { Transaction } from '@/app/type';
import { Button } from '@/components/ui/button';

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: number) => void;
    }
    
    const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
            {transactions.map((txn) => (
              <div key={txn.id} className="p-4 border rounded-md mb-2">
                <h3>{txn.category}</h3>
                <p>Type: {txn.type}</p>
                <p>Amount: ${txn.amount}</p>
                <p>{txn.description}</p>

                <Button  onClick={() => onDelete(txn.id)}
            className="text-red-500">
                  Delete
                </Button>
              </div>
            ))}
          </div>
        );
      };
      
      export default TransactionList;