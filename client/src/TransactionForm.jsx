import { useState } from 'react';

export function TransactionForm(props){
    const [trType, setTrType] = useState("expense");
    const [amount, setAmount] = useState(0);
    const [place, setPlace] = useState("");
    const [error, setError] = useState("");
    
    // Get current date as a default
    var curr = new Date(Date.now());
    curr.setTime(curr.getTime())
    var default_date = curr.toISOString().substring(0,10);
    const [date, setDate] = useState(default_date);

    async function createTransaction(e){
        e.preventDefault();

        // Data validation for amount and place
        if (amount <= 0){
            setError("Error: \"Amount\" cannot be less than or equal to zero.");
        }
        else if (place === ""){
            setError("Error: Please enter a business, person, or place connected to the transaction");
        }
        else {
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

            // clear error div
            setError("");
            const data = await res.json();
            const transactions = data.transactions.reverse();
            props.setTransactions(...transactions);
        }
    }

    return (
        <form onSubmit={createTransaction} className="new-transaction flex flex-col self-center w-3/5 border border-accent m- 18">
                Type of Transaction:
                <div className="flex flex-row w-auto">
                    <label className="input form-control radio-primary gap-20" htmlFor="tr-type-expense">
                        <span className='label-text'>Expense</span>
                        <input type="radio" name="tr-type" value="expense" id="tr-type-expense" defaultChecked onClick={() => setTrType("expense")}/>
                    </label>
                    <label className="input form-control radio-primary w-full gap-20" htmlFor="tr-type-income">
                    <span className='label-text'>Income</span>
                        <input type="radio" name="tr-type" value="income" id="tr-type-income" onClick={() => setTrType("income")}/>
                    </label>
                </div>
                <label className="input form-control input-bordered w-full gap-20" htmlFor="amount">
                    Amount: 
                    <input type="number" name="amount" id="amount" step=".01" onChange={e => setAmount(e.target.value)} />
                </label>
                <label className="input form-control input-bordered w-full gap-20" htmlFor="place">
                    Place
                    <input type="text" className="grow" id="place" name="place" placeholder="Wendy's" onChange={e => setPlace(e.target.value)} />
                </label>
                <label className="input form-control input-bordered w-full gap-20" htmlFor="date">Date: <input type="date" name="date" id="date" defaultValue={default_date} onChange={e => setDate(e.target.value)} /></label>
                <button className="btn btn-accent w-full">Save</button>
                <span className='items-center'>{error && <div id="error">{error}</div>}</span>
        </form>
    )
}