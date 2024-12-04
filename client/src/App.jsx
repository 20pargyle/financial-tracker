import { useEffect, useState } from 'react';
import "./App.css";

export function App() {
    const [user, setUser] = useState();
    // the following three go where the form goes
    const [trType, setTrType] = useState("expense");
    const [amount, setAmount] = useState(0);
    const [place, setPlace] = useState("");
    
    // Get current date as a default for 
    var curr = new Date(Date.now());
    curr.setTime(curr.getTime())
    var default_date = curr.toISOString().substring(0,10);
    const [date, setDate] = useState(default_date);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");

    async function createTransaction(e){
        e.preventDefault();

        // Data validation for amount and place
        if (amount <= 0){
            setError("Error: \"Amount\" cannot be less than or equal to zero.");
        } else if (place === ""){
            setError("Error: Please enter a business, person, or place connected to the transaction");
        } else {

            // Get csrf token out of cookie
            let cookies = {};
            let cookie_array = document.cookie.split(";");
            cookie_array.forEach(el => {
                // split into key-pair values, store in cookies
                let pieces = el.split("=");
                cookies[pieces[0]] = pieces[1];
            });
            // Now that it is validated, push the new tr to the database 
            const res = await fetch("/transaction/", {
                method: "post",
                credentials: "same-origin",
                body: JSON.stringify({
                    amount,
                    place,
                    date,
                    trType
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies["csrftoken"]
                }
            });

            // if (res.status != 200) {
            //     setError(res.statusText)
            // }

            // clear error div and call getTransactions to show the new changes
            setError("");
            getTransactions();
        }
    }

    // getUser / authenticate

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

    function isError(){
        if(error){
            return (
                <div id="error">{error}</div>
            );
        } else {
            return null;
        }
    }

    useEffect(() => {
        getTransactions();
        isError();
    }, []);

    return (
        <div className='content'>
            {/* todo: logout function onClick */}
            <button>Logout</button>
            <form onSubmit={createTransaction} className="new-transaction">
                Type of Transaction:
                <label htmlFor="tr-type-expense">Expense <input type="radio" name="tr-type" value="expense" id="tr-type-expense" defaultChecked onClick={() => setTrType("expense")}/></label>
                <label htmlFor="tr-type-income">Income <input type="radio" name="tr-type" value="income" id="tr-type-income" onClick={() => setTrType("income")}/></label>
                <label htmlFor="amount">Amount: <input type="number" name="amount" id="amount" step=".01" onChange={e => setAmount(e.target.value)} /></label>
                <label htmlFor="place">Place: <input type="text" name="place" id="place" onChange={e => setPlace(e.target.value)} /></label>
                <label htmlFor="date">Date: <input type="date" name="date" id="date" defaultValue={default_date} onChange={e => setDate(e.target.value)} /></label>
                <button>Save</button>
            </form>
            {isError()}
            <div id="transaction-list">
                {transactions.map(tr => (
                    <div key={tr.id}>
                        <p>$ {tr.expense && "-"}{tr.amount}</p>
                        <p>{tr.place}</p>
                        <p>{tr.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

