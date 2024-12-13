import { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

export function Transactions(){
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="flex flex-col justify-center m-8">
            <TransactionForm 
                transactions={transactions}
                setTransactions={setTransactions}
                />
            <TransactionList 
                transactions={transactions}
                setTransactions={setTransactions}
            />
        </div>
    )
}