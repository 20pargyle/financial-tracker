import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

export function Chart(){
    const [monthData, setMonthData] = useState([]);
    const [dataMin, setDataMin] = useState(0);
    const [dataMax, setDataMax] = useState(0);
    const [enoughData, setEnoughData] = useState(true);

    async function getMonthData(){
        const res = await fetch("/month-data/", {
            method: "GET",
            credentials: "same-origin"
            }
        )
        const body = await res.json();
        
        // TODO: If the month-data dataset only has one value, do not display (and tell the user such)
        if (body.monthData.length < 2){
            setEnoughData(() => false);
            console.log(body.monthData.length);
        }
        else {
            setMonthData([...body.monthData]);
            setDataMin(() => body.dataMin);
            setDataMax(() => body.dataMax);
        }
    }

    useEffect(() => {
        getMonthData();
    }, [])


    if (enoughData){
        return (
            <div className="">
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
                    domain = {([dataMin, dataMax])}
                    label = {{
                        value: `USD`,
                        style: { textAnchor: 'middle' },
                        angle: -90,
                        position: 'left',
                        offset: 0,
                    }}/>
                    <Tooltip />
                    <CartesianGrid />
                </LineChart>
            </div>
        );
    }
    else {
        return (
            <div className="font-bold text-xl p-12 flex text-center">
                Not enough data to show a chart;<br />
                Please add more than one month of data.
            </div>
        )
    }
}
