import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./output.css";

export function App() {
    const [user, setUser] = useState();
    
    // getUser / authenticate
    async function logout() {
        const res = await fetch("/registration/logout/", {
          credentials: "same-origin", // include cookies!
        });
    
        if (res.ok) {
          // navigate away from the single page app!
          window.location = "/registration/sign_in/";
        } else {
          // handle logout failed!
        }
      }

    return (
        <div className='content' data-theme="base">
            {/* TODO: navbar here */}
            <div className="navbar bg-primary">
                <div className="dropdown">
                    <div className="navbar-start">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/reports">Reports</Link></li>
                            <li><Link to="/transactions">Transactions</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl align-center">daisyUI</a>
                </div>
                <div className="navbar-end">
                    <button onClick={logout} className="btn btn-primary ">Logout</button>
                </div>
            </div>
            {/* TODO: logout function onClick */}
            <button className='btn btn-primary'>Logout</button>
            <Outlet />
        </div>
    )
}
