import { useEffect, useState } from "react";
import { AiOutlineAreaChart } from 'react-icons/ai'
import { GetPrimaryDataBetweenDates } from "../../helpers/CRUD/READ/GetDataSb";
import { countByStateAs, countFaltasBySubdepartament, getQuincena, transformDataForBarChart, transformDataForRecharts } from "../charts/chartshelpers/functionhelpers";
import Exampleforpie from "../charts/vchart";


const Home = () => {

    const [selectedquincena, setSelectedquincena] = useState(getQuincena());
    const [selectedmes, setSelectedmes] = useState(new Date().getMonth() + 1);
    const [selectedyear, setSelectedyear] = useState(new Date().getFullYear());
    const [startdatequincena, setStartdatequincena] = useState([]);
    const [enddatequincena, setEnddatequincena] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(false);

    //primera vez que se carga la pagina se ejecuta el useeffect para obtener la fecha de inicio y fin de la quincena
    useEffect(() => {
        getStartandEndDate(selectedyear, selectedmes, selectedquincena);
    }, []);

    useEffect(() => {
        if (search) {
            GetPrimaryDataBetweenDates(
                'assistence',
                'cod, dateas, stateas, user(name, lastname), subdepartamentdetail(subdepartament(subdepartamentname) )', {}, startdatequincena, enddatequincena
            ).then((r) => {
                console.log(r);
                setData(r);
                console.log(countFaltasBySubdepartament(r));
            });
            setSearch(false);
        }
    }, [search, startdatequincena, enddatequincena]);

    const getStartandEndDate = (year, month, quincena) => {
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
        setSearch(true);
    };



    return (
        <>
            <div className="pagina">
                <div className="text-center w-full flex justify-center mt-2">                </div>
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
                        
                        <Exampleforpie datos={countFaltasBySubdepartament(data)} linedata={transformDataForRecharts(data)}  statepiedata={countByStateAs(data)} barchardata={transformDataForBarChart(data,"dateas","stateas","stateas")} />

                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;