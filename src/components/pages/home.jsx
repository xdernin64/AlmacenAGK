import { useEffect, useState } from "react";
import { AiOutlineAreaChart } from 'react-icons/ai'
import { GetPrimaryDataBetweenDates } from "../../helpers/CRUD/READ/GetDataSb";
import { countByStateAs, countFaltasBySubdepartament, getQuincena, hoursdata, transformDataForBarChart, transformDataForRecharts } from "../charts/chartshelpers/functionhelpers";
import Exampleforpie from "../charts/vchart";
import RtAsistence from "./RtAsistence";


const Home = ({ subdepartament }) => {
    const [selectedquincena, setSelectedquincena] = useState(getQuincena());
    const [selectedmes, setSelectedmes] = useState(new Date().getMonth() + 1);
    const [selectedyear, setSelectedyear] = useState(new Date().getFullYear());
    const [startdatequincena, setStartdatequincena] = useState([]);
    const [enddatequincena, setEnddatequincena] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(false);

    //primera vez que se carga la pagina se ejecuta el useeffect para obtener la fecha de inicio y fin de la quincena
    useEffect(() => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        //get number of month
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        if (dia > 10 && dia <= 25) {
            setSelectedquincena(2)
            setSelectedmes(mes)
            setSelectedyear(anio)
            getStartandEndDate(anio, mes, 2)
        } else {
            if (mes == 12) {
                setSelectedmes(1)
                setSelectedyear(anio + 1)
                setSelectedquincena(1)
                getStartandEndDate(anio + 1, 1, 1)
            } else {
                
                setSelectedyear(anio)
                setSelectedquincena(1)
                if (dia>0 && dia<=10) {
                setSelectedmes(mes )
                getStartandEndDate(anio, mes, 1)
                }else{
                setSelectedmes(mes +1)
                getStartandEndDate(anio, mes+1, 1)
                }
            }
        }

    }, []);

    useEffect(() => {
        if (search) {
            GetPrimaryDataBetweenDates(
                'assistence',
                'cod, dateas, stateas, user(name, lastname),sdptdtcod,extratime25 , extratime35, doubletime ,discounthours, subdepartamentdetail(subdepartament(subdepartamentname,subdepartamentcode))', {}, startdatequincena, enddatequincena
            ).then((r) => {
                setData(r);
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
            setStartdatequincena(startDate);
            setEnddatequincena(endDate);
        } else if (quincena === 2) {
            // Calcula la fecha de inicio para la segunda quincena
            const startDate = `${year}-${formatNumber(month)}-11`;
            // Calcula la fecha de fin para la segunda quincena
            const endDate = `${year}-${formatNumber(month)}-25`;
            setStartdatequincena(startDate);
            setEnddatequincena(endDate);
        } else {
            console.log("El valor de quincena debe ser 1 o 2");
        }
        setSearch(true);
    };

    return (
        <>
            <div className=" pt-0 mt-0">
                <div className="text-center w-full flex justify-center mt-2"></div>
                <div className="group">
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <select className="border-2 border-gray-300 p-2 rounded-lg m-2" onChange={(e) => setSelectedquincena(e.target.value)} value={selectedquincena}>
                                <option value="1">Quincena 1</option>
                                <option value="2">Quincena 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
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
                            <input className="border-2 border-gray-300 p-2 rounded-lg m-2" type="number" onChange={(e) => setSelectedyear(e.target.value)} value={selectedyear} />
                        </div>
                        <div className="flex flex-col">
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
                        <Exampleforpie hoursdata={hoursdata(data,subdepartament)} datos={countFaltasBySubdepartament(data)} linedata={transformDataForRecharts(data, subdepartament)} statepiedata={countByStateAs(data, subdepartament)} barchardata={transformDataForBarChart(data, "dateas", "stateas", subdepartament)} />
                        
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;