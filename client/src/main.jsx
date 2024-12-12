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
                element: <Reports />
            },
            {
                path: "/transactions",
                element: <Transactions />,
                // children: [
                //     {
                //         path: "/transactions/:id",
                //         element: <EditTransaction />
                //         // TODO: see if the "/:id" works
                //         // Then actually implement the edit form
                //     }
                // ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
