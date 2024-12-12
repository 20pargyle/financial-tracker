import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart } from "./Chart";

export function Reports(){

    return(
        <div className="flex justify-center">
            <Chart/>
        </div>
    )
}
