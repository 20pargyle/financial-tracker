import { useEffect, useState } from 'react';
import "./App.css";

export function App() {
    const [user, setUser] = useState()
    // the following three go where the form goes
    const [amount, setAmount] = useState(0);
    const [place, setPlace] = useState("");
    const [datetime, setDatetime] = useState(Date.now());
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");

    async function createTransaction(e){
        e.preventDefault();
        
        // TODO: Data validation

        // Get csrf token out of cookie
        let cookies = {};
        let cookie_array = document.cookie.split(";");
        cookie_array.forEach(el => {
            // split into key-pair values, store in cookies
            let pieces = el.split("=");
            cookies[pieces[0]] = pieces[1];
        });
        const res = await fetch("/transaction/", {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify({
                amount,
                place,
                datetime
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies["csrftoken"]
            }
        });
        if (res.status != 200) {
            setError(res.statusText)
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
        setTransactions([...body.transactions]);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <div className='content'>
            {/* todo: logout function onClick */}
            <button>Logout</button>
            <form onSubmit={createTransaction} className="new-transaction">
                <label htmlFor="amount">Amount: <input type="number" name="amount" id="amount" step=".01" onChange={e => setAmount(e.target.value)} /></label>
                <label htmlFor="place">Place: <input type="text" name="place" id="place" onChange={e => setPlace(e.target.value)} /></label>
                <label htmlFor="datetime">Date: <input type="datetime-local" name="datetime" id="datetime" onChange={e => setDatetime(e.target.value)} /></label>
                <button>Save</button>
            </form>
            <div>
                {transactions.map((tr) => (
                    <div key={tr.id}>
                        <p>{tr.amount}</p>
                        <p>{tr.place}</p>
                        <p>{tr.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

