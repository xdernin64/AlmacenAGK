import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, BarChart, Bar, Label } from 'recharts';
import { convertirFecha } from './chartshelpers/functionhelpers';
import { useState } from 'react';
const Exampleforpie = ({ datos, linedata, statepiedata, barchardata, hoursdata }) => {
    const [searchText, setSearchText] = useState('');
    const filteredData = hoursdata.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const date = payload[0].payload.name;
            const missingPersons = payload[0].payload.missingPersons.map((person, index) => (
                <li className='decoration-black font-extrabold' key={index}>- {person}</li>
            ));
            return (
                <div className="custom-tooltip bg-indigo-80 runde0 rounded-lg bg-opacity-25">
                    <p className="label font-extrabold">{`${convertirFecha(date)}`}</p>
                    <p className="label">Personas que faltaron:</p>
                    <ul className='text-start'>{missingPersons}</ul>
                </div>
            );
        }
        return null;
    };
    return (
        <div className='w-100 m-0 p-0'>
            <div className='grid-cols-2'>

                <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
                    <figure className="flex flex-col items-center justify-center  text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 p-2">
                        <div className="chart-container w-full h-96 lg:pl-10 lg:pr-10 pb-5 mb-2" >
                            <h3 className='font-extrabold text-indigo-700 text-2xl'>Faltas quincenales</h3>
                            <ResponsiveContainer width="100%" height="100%" className='bg-indigo-700 w-full  rounded-lg text-white'  >
                                <AreaChart data={linedata}  >

                                    <XAxis dataKey="name" stroke="#d8e6f2" tickFormatter={(value) => convertirFecha(value)} />
                                    <YAxis stroke="#d8e6f2" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="uv" stroke="#d8e6f2" fill="#d8e6f2" />

                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </figure>
                    <figure className="flex flex-col items-center justify-center lg:p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="chart-container w-full h-96 lg:pl-10 lg:pr-10 pb-6 mb-2" >
                            <h3 className='font-extrabold text-indigo-700 text-2xl'>Resumen Diario</h3>

                            <ResponsiveContainer width="100%" height="100%" className='bg-indigo-700 w-full  rounded-lg text-white'>
                                <BarChart data={barchardata}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" stroke="#d8e6f2" tickFormatter={(value) => convertirFecha(value)} />
                                    <YAxis stroke="#d8e6f2" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="ASISTENCIA" stackId="a" fill="#00C49F" />
                                    <Bar dataKey="ASISTENCIAFERIADO" stackId="a" fill="#00C40F" />
                                    <Bar dataKey="DSO" stackId="a" fill="#FFBB28" />
                                    <Bar dataKey="DSOFERIADO" stackId="a" fill="#92cddc" />
                                    <Bar dataKey="DXHA" stackId="a" fill="#FF8042" />
                                    <Bar dataKey="FALTA" stackId="a" fill="#d93f35" />
                                    <Bar dataKey="LICENCIA" stackId="a" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </figure>
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                        <h3 className='font-extrabold text-indigo-700 text-2xl'>Faltas por Sub-Área</h3>
                        <div className="chart-container w-full h-96  pl-10 pr-10" >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart >
                                    <Pie data={datos} dataKey="value" nameKey="name" outerRadius={110} fill="#8884d8" label >
                                        <Cell key={`cell-${1}`} fill="#0088FE" />
                                        <Cell key={`cell-${2}`} fill="#00C49F" />
                                        <Cell key={`cell-${3}`} fill="#FFBB28" />

                                    </Pie>
                                    <Tooltip />
                                    <Legend layout="vertical" align="center" verticalAlign="top" />
                                </PieChart>

                            </ResponsiveContainer></div>
                    </figure>
                    <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="chart-container w-full h-96  pl-10 pr-10" >
                            <h3 className='font-extrabold text-indigo-700 text-2xl'>Resumen Total</h3>

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={200} height={400}>
                                    <Pie data={statepiedata} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                        <Cell key={`cell-${1}`} fill="#00C49F" />
                                        <Cell key={`cell-${2}`} fill="#FFBB28" />
                                        <Cell key={`cell-${3}`} fill="#FF8042" />
                                        <Cell key={`cell-${4}`} fill="#d93f35" />
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [value, name]}
                                    />
                                    <Legend layout="vertical" align="center" verticalAlign="bottom" />
                                </PieChart></ResponsiveContainer></div>
                    </figure>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <BarChart width={2500} height={300} data={hoursdata}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="extratime25" fill="#82ca9d" stackId="a" />
                        <Bar dataKey="extratime35" fill="#ffc658" stackId="a" />
                        {hoursdata.map((entry, index) => (
                            <text
                                key={index}
                                x={index * 60 + 30} // Ajusta la posición horizontal
                                y={280} // Ajusta la posición vertical
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#000" // Color del texto
                            >
                                {entry.totalHours}
                            </text>
                        ))}
                    </BarChart>
                </div>

            </div>
        </div>
    );
}
export default Examplefor