import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function TransactionForm(props){
    const [searchParams, setSearchParams] = useSearchParams();
    const [trType, setTrType] = useState("expense");
    const [amount, setAmount] = useState(0);
    const [place, setPlace] = useState("");
    const [error, setError] = useState("");

    let typeToEdit = 0;
    let amountToEdit = 0;
    let placeToEdit = "";
    let dateToEdit = default_date;
    
    // Get current date as a default
    var curr = new Date(Date.now());
    curr.setTime(curr.getTime())
    var default_date = curr.toISOString().substring(0,10);
    const [date, setDate] = useState(default_date);

    if(searchParams.has("id")){
        getSingleTransaction(searchParams.get("id"));
    }

    async function getSingleTransaction(id){
        const res = await fetch(`transactions/${id}`, {
            method: "GET",
            credentials: "same-origin"
            }
        );
        const body = await res.json();
        setTrType(() => body.expense == 1 ? "expense" : "income" );
        setAmount(() => body.amount);
        setPlace(() => body.place);
        setDate(() => body.date);
        typeToEdit = body.expense;
        amountToEdit = body.amount;
        placeToEdit = body.place;
        dateToEdit = body.date;
        // TODO: submitting the edit form doesn't actually POST yet
    }

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
            const res = await fetch("/transactions/", {
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

            // clear error div
            setError("");
            const body = await res.json();
            const transactions = body.transactions.reverse();
            props.setTransactions([...transactions]);
        }
    }

    return (
        <>
        {/* the 'edit' forms as ternary expressions: if "edit" then placeholder and/or value = {default}, else none */}
            <form onSubmit={createTransaction} className="flex flex-col self-center w-3/5 border-2 rounded-box border-accent p-4 gap-4">
                <h1 className="font-bold text-lg">{searchParams.has("id") ? "Edit" : "New"} Transaction</h1>
                    <div className="flex flex-row items-center gap-6">
                        Type of Transaction:
                        <label className="input form-control radio-primary" htmlFor="tr-type-expense">
                            <span className='label-text'>Expense</span>
                            <input type="radio" required name="tr-type" value="expense" id="tr-type-expense" onClick={() => setTrType("expense")}/>
                        </label>
                        <label className="input form-control radio-primary" htmlFor="tr-type-income">
                        <span className='label-text'>Income</span>
                            <input type="radio" name="tr-type" value="income" id="tr-type-income" onClick={() => setTrType("income")}/>
                        </label>
                    </div>
                    <label className="input form-control input-bordered h-16" htmlFor="amount">
                        Amount: 
                        <input type="number" required name="amount" id="amount" step=".01" placeholder={searchParams.has("id") ? amountToEdit : 0} onChange={e => setAmount(e.target.value)} />
                    </label>
                    <label className="input form-control input-bordered h-16" htmlFor="place">
                        Place
                        <input type="text" required className="grow" id="place" name="place" placeholder={searchParams.has("id") ? placeToEdit : "Wendy's"} onChange={e => setPlace(e.target.value)} />
                    </label>
                    <label className="input form-control input-bordered h-16" htmlFor="date">Date: 
                        <input type="date" required name="date" id="date" defaultValue={searchParams.has("id") ? dateToEdit : default_date} onChange={e => setDate(e.target.value)} /></label>
                    <button className="btn btn-primary">Save</button>
                    <span className='items-center'>{error && <div id="error">{error}</div>}</span>
            </form>
        </>
    )
}