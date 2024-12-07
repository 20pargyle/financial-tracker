import { useEffect, useState } from "react";

export function TransactionList(){
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions();
    }, []);

    async function getTransactions(){
        const res = await fetch("/transaction/", {
            method: "GET",
            credentials: "same-origin"
            }
        )
        const body = await res.json();
        body.transactions.reverse();
        setTransactions([...body.transactions]);
    }

    return (
        <div id="transaction-list">
            {transactions.map(tr => (
                <div key={tr.id}>
                    <p>$ {tr.expense && "-"}{tr.amount}</p>
                    <p>{tr.place}</p>
                    <p>{tr.date}</p>
                </div>
            ))}
        </div>
    )
}