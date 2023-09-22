import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const data = [{ name: 'Page A', uv: 600, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 200, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 200, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 300, pv: 2400, amt: 2400 }];
const datapie = [
    { name: 'OHYE', value: 400 },
    { name: 'PROGRAMACION', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const Examplechart = () => {
    return (
        <div>
            <h1 className=''>Examplechart</h1>
            <div className='grid'>
            <div className=''>
                <LineChart width={400} height={400} data={data} className='bg-orange-100' >
                    <Line type="bumpX" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#c2cc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
            <div>
                <h1 className=''>Example PieChart</h1>
                
                    <PieChart width={400} height={400}>
                        <Pie data={datapie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label >
                            <Cell key={`cell-${1}`}  fill='#0088FE' />
                            <Cell key={`cell-${2}`} fill='#00C49F' />
                            <Cell key={`cell-${3}`} fill='#FFBB28' />
                            <Cell key={`cell-${4}`} fill='#FF8042' />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                
            </div></div>
        </div>
    );
}
export default Examplechart;
