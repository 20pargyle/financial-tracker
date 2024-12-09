import { useEffect } from "react";

export function TransactionList(props){

    async function getTransactions(){
        const res = await fetch("/transaction/", {
            method: "GET",
            credentials: "same-origin"
            }
        )
        const body = await res.json();
        body.transactions.reverse();
        props.setTransactions([...body.transactions]);
    }

    // useEffect(() => {
    //     getTransactions();
    // });

    return (
        <div className="overflow-x-auto" id="transaction-list">
            {/* TODO: Give margin!!! */}
            <table className="table table-zebra">
                {/* head */}
                <thead>
                <tr>
                    <th>Amount</th>
                    <th>Place</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {props.transactions.map(tr => (
                    <tr key={tr.id}>
                        <td>$ {tr.expense && "-"}{tr.amount}</td>
                        <td>{tr.place}</td>
                        <td>{tr.date.split("T")[0]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}