import React, { useState, useEffect } from 'react';
import PrimaryDataTable from '../organism/tables/PrimeryDataTable';
import { useLocation } from 'react-router-dom';

const PrimaryDataPage = ({ tittle, dtname, colsnames }) => {
    const [key, setKey] = useState(0);

    const location = useLocation();

    useEffect(() => {
        // Cambia la clave solo cuando cambia la ubicación (ruta)
        setKey(key + 1);
    }, [location.pathname]);

    return (
        <div className="pagina">
            <h1 className="tittlepage">{tittle}</h1>
            <div>
                <PrimaryDataTable tittle={tittle} dtname={dtname} colsnames={colsnames} key={key} />
            </div>
        </div>
    );
};

export default PrimaryDataPage;
