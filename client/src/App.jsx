import { useEffect, useState } from 'react';
import { TransactionList } from './TransactionList';
import { TransactionForm } from './TransactionForm';
import "./App.css";

export function App() {
    const [user, setUser] = useState();
    // some overarching state to tell everything to change?
    const [updateState, setUpdateState] = useState(true);
    
    // getUser / authenticate

    return (
        <div className='content'>
            {/* todo: logout function onClick */}
            <button>Logout</button>
            <TransactionForm />
            <TransactionList />
        </div>
    )
}
