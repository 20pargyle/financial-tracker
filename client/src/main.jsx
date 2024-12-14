import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { Reports } from './Reports.jsx'
import { Transactions } from './Transactions.jsx'
import {
    RouterProvider,
    createHashRouter
} from 'react-router-dom'

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Transactions />
            },
            {
                path: "/reports",
                element: <Reports />
            },
            {
                path: "/transactions",
                element: <Transactions />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
