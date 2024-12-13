import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { Reports } from './Reports.jsx'
import { Transactions } from './Transactions.jsx'
import { TransactionList } from './TransactionList.jsx'
import { TransactionForm } from './TransactionForm.jsx'
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
                element: <Reports />
            },
            {
                path: "/transactions",
                element: <Transactions />,
                children: [
                    {
                        path: "/transactions/",
                        element: <TransactionList />
                    },
                    {
                        path: "/transactions/new",
                        element: <TransactionForm/>
                    }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
