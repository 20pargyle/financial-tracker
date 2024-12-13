import { useEffect } from "react";
import { Link } from "react-router-dom";

export function TransactionList(props){

    async function getTransactions(){
        const res = await fetch("/transactions", {
            method: "GET",
            credentials: "same-origin"
            }
        );
        const body = await res.json();
        body.transactions.reverse();
        props.setTransactions([...body.transactions]);
    }

    async function deleteTransaction(id){
        let cookies = {};
        let cookie_array = document.cookie.split(";");
        cookie_array.forEach(el => {
            // split into key-pair values, store in cookies
            let pieces = el.split("=");
            cookies[pieces[0]] = pieces[1];
        });

        const res = await fetch(`transactions/${id}/delete`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": cookies["csrftoken"]
            }
        });
        const body = await res.json();
        body.transactions.reverse();
        props.setTransactions([...body.transactions])
    }

    useEffect(() => {
        getTransactions();
    },[]);

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>Amount</th>
                    <th>Place</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {/* rows */}
                {props.transactions.map(tr => (
                    <tr key={tr.id}>
                        <td>$ {tr.expense && "-"}{tr.amount}</td>
                        <td className="underline">
                            <Link to={"/transactions?id=" + tr.id}>
                                {tr.place}
                            </Link>
                        </td>
                        <td>{tr.date.split("T")[0]}</td>
                        <td><button onClick={() => deleteTransaction(tr.id)}>
                            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            width="14px" height="14px" 
                            viewBox="0 0 41.336 41.336" xmlSpace="preserve">
                                <g>
                                    <path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2
                                        s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2
                                        S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                                        s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                                        s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
                                        c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z"/>
                                </g>
                                </svg>
                        </button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}