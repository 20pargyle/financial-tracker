import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

export function Chart(){
    const [monthData, setMonthData] = useState([]);
    const dataMin = -1;
    const dataMax = 1;

    async function getMonthData(){
        const res = await fetch("/monthData/", {
            method: "GET",
            credentials: "same-origin"
            }
        )
        const body = await res.json();
        setMonthData([...body.monthData]);

        // set a min and max for the domain
        // for (let index = 0; index < array.length; index++) {
            
        // }

    }

    useEffect(() => {
        getMonthData();
    }, [])

    return (
        <LineChart width={600} height={300} data={monthData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <Line type="monotone" dataKey="netExpense" stroke="black" />
            <XAxis 
            dataKey="month"
            label={{
              value: `Month`,
              style: { textAnchor: 'middle' },
              position: 'bottom',
              offset: 0,
            }}/>
            <YAxis
            // domain = {([dataMin, dataMax]) => { const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax)); return [-absMax, absMax]; }}
            label = {{
              value: `USD`,
              style: { textAnchor: 'middle' },
              angle: -90,
              position: 'left',
              offset: 0,
            }}/>
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