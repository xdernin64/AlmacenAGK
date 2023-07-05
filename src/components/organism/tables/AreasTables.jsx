import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { dbfirestore } from "../../../firebase";

const AccordionTable = () => {
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(dbfirestore, "areas"));
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
            setData(results);
        }
        fetchData();
    }, []);

    const handleRowClick = (rowId) => {
        const currentExpandedRows = expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded
            ? currentExpandedRows.filter((id) => id !== rowId)
            : currentExpandedRows.concat(rowId);

        setExpandedRows(newExpandedRows);
    };

    const renderItem = (item) => {
        const clickCallback = () => handleRowClick(item.areacod);
        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.areacod}>
                <td>{item.areacod}</td>
                <td>{item.areaname}</td>
                <td>{item.areadesc}</td>
            </tr>
        ];

        if (expandedRows.includes(item.areacod)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.areacod}>
                    <td colSpan={3}>
                        {/* Render the subareas here */}
                    </td>
                </tr>
            );
        }

        return itemRows;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Codarea</th>
                    <th>Area</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>{data.map(renderItem)}</tbody>
        </table>
    );
};
export default AccordionTable;
