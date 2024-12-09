import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Reports(){

    return(
        <>
            <p>this will be a report!</p>
            <Link to="/transactions">Transaction page</Link>
        </>
    )
}
