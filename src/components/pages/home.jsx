import { useEffect, useState } from "react";
import { AiOutlineAreaChart } from 'react-icons/ai'
import Examplechart from "../charts/vchart";
import EjemploEx from "../charts/PieChartAs";


const Home = () => {
    const getQuincena = () => {
        const day = new Date().getDate();
        if (day >= 25 || day <= 10) {
            return 1;
        } else {
            return 2;
        }
    }
    const [selectedquincena, setSelectedquincena] = useState(getQuincena());
    const [selectedmes, setSelectedmes] = useState(new Date().getMonth() + 1);
    const [selectedyear, setSelectedyear] = useState(new Date().getFullYear());
    const [startdatequincena, setStartdatequincena] = useState([]);
    const [enddatequincena, setEnddatequincena] = useState([]);
    //thats the instruction to get the start and end date of the quincena if quiencena is 1 then estart date is from the 26 of the last month to the 10 of the current month if quincena is 2 then start date is from the 11 of the current month to the 25 of the current month and gt the format yyyy-mm-dd and console log
    const getStartandEndDate = (year, month, quincena) => {
        // Convierte los valores de entrada a números
        // Convierte los valores de entrada a números
        year = Number(year);
        month = Number(month);
        quincena = Number(quincena);

        // Función auxiliar para formatear números menores que 10 con un cero al inicio
        const formatNumber = (num) => (num < 10 ? `0${num}` : num);

        if (quincena === 1) {
            // Calcula la fecha de inicio para la primera quincena
            let startDateYear = year;
            let startDateMonth = month;
            if (month === 1) {
                startDateYear -= 1;
                startDateMonth = 12;
            } else {
                startDateMonth -= 1;
            }
            const startDate = `${startDateYear}-${formatNumber(startDateMonth)}-26`;

            // Calcula la fecha de fin para la primera quincena
            const endDate = `${year}-${formatNumber(month)}-10`;

            console.log("Primera quincena:", startDate, endDate);
            setStartdatequincena(startDate);
            setEnddatequincena(endDate);
        } else if (quincena === 2) {
            // Calcula la fecha de inicio para la segunda quincena
            const startDate = `${year}-${formatNumber(month)}-11`;

            // Calcula la fecha de fin para la segunda quincena
            const endDate = `${year}-${formatNumber(month)}-25`;

            console.log("Segunda quincena:", startDate, endDate);
            setStartdatequincena(startDate);
            setEnddatequincena(endDate);
        } else {
            console.log("El valor de quincena debe ser 1 o 2");
        }
    };
    useEffect(() => {
        getStartandEndDate(selectedyear, selectedmes, selectedquincena);
    }, [    ]);
    
    return (
        <>
            <div className="pagina">
                <div className="text-center w-full flex justify-center mt-2">
                    <h1 className=" font-bold font-sans text-2xl bg-light-blue-600 border rounded-xl pl-10 pr-10 text-gray-100 " > <p className="flex pl-2 ml-3">    Dashboard de SisRa <AiOutlineAreaChart className="text-orange-200 m-1" /></p></h1>
                </div>
                <div className="group">
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <label className="text-center text-gray-700 text-xl font-bold">Quincena</label>
                            <select className="border-2 border-gray-300 p-2 rounded-lg m-2" onChange={(e) => setSelectedquincena(e.target.value)} value={selectedquincena}>
                                <option value="1">Primera</option>
                                <option value="2">Segunda</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-center text-gray-700 text-xl font-bold">Mes</label>
                            <select className="border-2 border-gray-300 p-2 rounded-lg m-2" onChange={(e) => setSelectedmes(e.target.value)} value={selectedmes}>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-center text-gray-700 text-xl font-bold">Año</label>
                            <input className="border-2 border-gray-300 p-2 rounded-lg m-2" type="number" onChange={(e) => setSelectedyear(e.target.value)} value={selectedyear} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-center text-gray-700 text-xl font-bold">Buscar</label>
                            <button className="border-2 border-gray-300 text-gray-800 p-2 rounded-lg m-2" onClick={() => getStartandEndDate(selectedyear, selectedmes, selectedquincena)}>Buscar</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <input className="border-2 border-gray-300 p-2 rounded-lg m-2" type="date" value={startdatequincena} disabled />
                    </div>
                    <div className="flex flex-col">
                        <input className="border-2 border-gray-300 p-2 rounded-lg m-2" type="date" value={enddatequincena} disabled />
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="bg-red-600 rounded-md p-5 text-white font-bold">
                            <h2>Faltas de la quincena</h2>
                        </div>
                        <Examplechart />
                        
                        

                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;