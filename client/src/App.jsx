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
        <div className='content'>
            <div className="navbar bg-primary">
                <div className="dropdown navbar-start">
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
                        <li><Link to="/Reports">Reports</Link></li>
                        <li><Link to="/">Transactions</Link></li>
                    </ul>
                </div>
                <div className="navbar-center">
                    <div className="btn btn-ghost text-xl align-center"><Link to="/">MyWallet</Link></div>
                </div>
                <div className="navbar-end">
                    <div className="dropdown">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                            <svg
                            fill="#000000"
                            className="h-5 w-5"
                            viewBox="0 0 32 32" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path 
                            d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/>
                            </svg>
                        </div>
                        <ul 
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 p-2 right-0.5 shadow"
                            >
                            <li onClick={logout}>
                                <a className="tooltip tooltip-left flex justify-center" data-tip="Logout">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24" 
                                fill="none"
                                stroke="currentColor">
                                    <path 
                                    d="M21 12L13 12" 
                                    stroke="#323232" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                    <path 
                                    d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                                    stroke="#323232" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                    <path 
                                    d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" 
                                    stroke="#323232" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                </svg>
                                </a>
                            </li>
                            <li>
                                <div className="tooltip tooltip-left" data-tip="Dark Mode">
                                    <input type="checkbox" value="dim" className="toggle theme-controller" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
