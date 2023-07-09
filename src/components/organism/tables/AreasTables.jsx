import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { dbfirestore } from "../../../firebase";
import NewSubAreaModal from "../modals/ModalNewSubArea";
import { getdata } from "../../../helpers/CRUD/READ/GetAreasData";

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
        getdata("areas").then((results) => {
            setData(results);
        });
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
            const subareasRef = collection(dbfirestore, `areas/${rowId}/subareas`);
            getDocs(subareasRef).then((subareasSnap) => {
                setSubareadata((prevSubareadata) => ({
                    ...prevSubareadata,
                    [rowId]: subareasSnap.docs.map((doc) => doc.data()),
                }));
            });
        }
    };

    const renderItem = (item) => {
        const clickCallback = () => handleRowClick(item.areacod);
        const isExpanded = expandedRows.includes(item.areacod);
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.areacod} className={`${isExpanded ? "bg-gray-100 rounded-t-lg" : ""}`}>
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
                    <td colSpan={3}>
                        {/* Add a new table to display subareas data */}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full mt-4 rounded-lg shadow-lg bg-white divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Subárea</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Subárea</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Subárea</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(subareadata[item.areacod] || []).map((subarea) => (
                                        <tr key={subarea.subareacod}>
                                            <td className="px-6 py-4 whitespace-nowrap">{subarea.subareacod}</td>
                                            <td className="px-6 py-4 whitespace-wrap">{subarea.subareaname}</td>
                                            <td className="px-6 py-4 whitespace-wrap">{subarea.subareadesc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="bg-gray-600 mt-4" onClick={() => subareaopenmodal(item)}>Agregar Subarea</button>
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
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codigo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area/Sub-area</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">{data.map(renderItem)}</tbody>
            </table>
        </>
    );

};

export default AccordionTable;
