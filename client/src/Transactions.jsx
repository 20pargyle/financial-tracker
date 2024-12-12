import { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

export function Transactions(){
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="flex flex-col justify-center">
            <TransactionForm 
                transactions={transactions}
                />
            <TransactionList 
                transactions={transactions}
                setTransactions={setTransactions}
            />
        </div>
    )
}