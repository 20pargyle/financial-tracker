import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import "./output.css";

export function App() {
    const [user, setUser] = useState();
    
    // getUser / authenticate

    return (
        <div className='content' data-theme="base">
            {/* TODO: navbar here */}
            <nav>

            </nav>
            {/* TODO: logout function onClick */}
            <button className='btn-primary'>Logout</button>
            <Outlet />
        </div>
    )
}
