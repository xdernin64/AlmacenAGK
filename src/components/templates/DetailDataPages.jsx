import { useLocation } from "react-router-dom";
import DetailDataTable from "../organism/tables/DetailDataTable"
import { useEffect, useState } from "react";

const DetailDataPages = ({config}) => {
    const [key, setKey] = useState(0);

    const location = useLocation();

    useEffect(() => {
        // Cambia la clave solo cuando cambia la ubicación (ruta)
        setKey(key + 1);
    }, [location.pathname]);
    return (
        <div className="pagina">
            <h1>DetailDataPages</h1>
            <DetailDataTable 
            {...config} key={key}
            />
        </div>
    )
}
export default DetailDataPages;