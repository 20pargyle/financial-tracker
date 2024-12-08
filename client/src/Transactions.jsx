import { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

export function Transactions(){
    const [transactions, setTransactions] = useState([]);

    return (
        <>
            <TransactionForm 
                transactions={transactions}
                />
            <TransactionList 
                transactions={transactions}
                setTransactions={setTransactions}
            />
        </>
    )
}