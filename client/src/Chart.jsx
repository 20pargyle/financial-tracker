import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

export function Chart(){
    const [monthData, setMonthData] = useState([]);

    async function getMonthData(){
        const res = await fetch("/monthData/", {
            method: "GET",
            credentials: "same-origin"
            }
        )
        const body = await res.json();
        setMonthData([...body.monthData]);
    }

    useEffect(() => {
        getMonthData();
    }, [])

    return (
        <LineChart width={400} height={400} data={monthData}>
            <Line type="monotone" dataKey="netExpense" stroke="#8884d8" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}


// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// import { useState } from 'react';

// export function Chart(){
//     const [data, setData] = useState([{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: "Page B", uv: 500, pv: 1200, amt: 1300}]);

//     return (
//         <LineChart width={600} height={300} data={data}>
//             <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//             <CartesianGrid stroke="#ccc" />
//             <XAxis dataKey="uv" />
//             <YAxis />
//             <Tooltip />
//         </LineChart>
//     );
// }