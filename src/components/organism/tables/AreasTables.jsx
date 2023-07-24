import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { dbfirestore } from "../../../firebase";
import NewSubAreaModal from "../modals/ModalNewSubArea";
import { getdata } from "../../../helpers/CRUD/READ/GetAreasData";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importamos los íconos de react-icons/fa

const AccordionTable = () => {
    const [data, setData] = useState([]);
    const [subareadata, setSubareadata] = useState({});
    const [expandedRows, setExpandedRows] = useState([]);
    const [subareaopen, setSubareaopen] = useState(false);
    const [selectedAreacod, setSelectedAreacod] = useState(null);
    const [selectedAreaname, setSelectedAreaname] = useState(null);

    const subareaopenmodal = (item) => {
        setSubareaopen(!subareaopen);
        setSelectedAreacod(item.areacod);
        setSelectedAreaname(item.areaname);
    }

    useEffect(() => {
        const unsubscribe = getdata("areas", null, (results) => {
            setData(results);
        });
        return () => unsubscribe();
    }, []);




    const handleRowClick = (rowId) => {
        const currentExpandedRows = expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded
            ? currentExpandedRows.filter((id) => id !== rowId)
            : currentExpandedRows.concat(rowId);

        setExpandedRows(newExpandedRows);

        // Fetch subareas data when a row is clicked
        if (!isRowCurrentlyExpanded) {
            const unsubscribe = getdata(`areas/${rowId}/subareas`, null, (results) => {
                setSubareadata((prevSubareadata) => ({
                    ...prevSubareadata,
                    [rowId]: results,
                }));
            });
            // Asegúrate de llamar a unsubscribe cuando ya no necesites escuchar cambios en los datos
        }

    };

    const handleModifyArea = (areacod) => {
        // Implementa la lógica para modificar el área usando el areacod
        console.log(`Modificar área con código: ${areacod}`);
    };

    const handleDeleteArea = (areacod) => {
        // Implementa la lógica para eliminar el área usando el areacod
        console.log(`Eliminar área con código: ${areacod}`);
    };

    const handleModifySubarea = (subareacod) => {
        // Implementa la lógica para modificar la subárea usando el subareacod
        console.log(`Modificar subárea con código: ${subareacod}`);
    };

    const handleDeleteSubarea = (subareacod) => {
        // Implementa la lógica para eliminar la subárea usando el subareacod
        console.log(`Eliminar subárea con código: ${subareacod}`);
    };

    const renderSubareas = (subareas) => {
        return subareas.map((subarea) => (
            <tr key={subarea.subareacod}>
                <td className="px-6 py-4 whitespace-nowrap">{subarea.subareacod}</td>
                <td className="px-6 py-4 whitespace-wrap">{subarea.subareaname}</td>
                <td className="px-6 py-4 whitespace-wrap">{subarea.subareadesc}</td>
                <td className="px-6 py-4">
                    <div className="flex space-x-2">
                        <button
                            className="bg-amber-300 hover:bg-amber-600 text-gray-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleModifySubarea(subarea.subareacod)}
                        >
                            <FaEdit className="inline-block mr-1" /> Modificar departamnto
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDeleteSubarea(subarea.subareacod)}
                        >
                            <FaTrash className="inline-block mr-1" /> Eliminar departamnto
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    const renderItem = (item) => {
        const clickCallback = () => handleRowClick(item.areacod);
        const isExpanded = expandedRows.includes(item.areacod);
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.areacod} className={`${isExpanded ? "bg-gray-400 text-gray-950 rounded-t-lg" : ""}`}>
                <td className={`px-6 py-4 whitespace-nowrap ${isExpanded ? "rounded-tl-lg" : ""}`}>
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    )}
                    {item.areacod}
                </td>
                <td className={`px-6 py-4 whitespace-wrap ${isExpanded ? "font-bold" : ""}`}>{item.areaname}</td>
                <td className={`px-6 py-4 whitespace-wrap ${isExpanded ? "font-bold rounded-tr-lg" : ""}`}>{item.areadesc}</td>
            </tr>
        ];

        if (expandedRows.includes(item.areacod)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.areacod}>
                    <td colSpan={4}>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full mt-4 rounded-lg shadow-lg bg-gray-800 ">
                                <thead className="bg-blue-900 ">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Código Departamento</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Nombre Departamento</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Descripción Departamento</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-300 text-gray-800 ">
                                    {renderSubareas(subareadata[item.areacod] || [])}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => subareaopenmodal(item)}
                            >
                                Agregar Departamento
                            </button>
                            <button
                                className="bg-amber-300 hover:bg-amber-600 text-gray-900 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleModifyArea(item.areacod)}
                            >
                                <FaTrash className="inline-block mr-1" /> Modificar Gerencia
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleDeleteArea(item.areacod)}
                            >
                                <FaTrash className="inline-block mr-1" /> Eliminar Gerencia
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }

        return itemRows;
    };

    return (
        <>
            <NewSubAreaModal open={subareaopen} close={() => setSubareaopen(false)} areacod={selectedAreacod} areaname={selectedAreaname}></NewSubAreaModal>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Código</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Gerencia/Departamento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Descripción</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">{data.map(renderItem)}</tbody>
            </table>
        </>
    );

};

export default AccordionTable;

