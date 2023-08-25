

import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import { DatePicker } from '@mui/x-date-pickers';
import { dateToString } from '../../../helpers/dateconverter';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
const TableAsistenciaSb = () => {
    const theme = createTheme();
    const [userslist, setUserslist] = useState([]);
    const [update, setUpdate] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    const [currentdate, setCurrentdate] = useState(dateToString(new Date()));
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setCurrentdate(newDate);
        console.log(`Formatted Date: ${newDate}`);
    };


    const [columns, setColumns] = useState([
        { title: 'Codigo', field: 'cod' },
        { title: 'Apellido', field: 'lastname', initialEditValue: 'initial edit value' },
        { title: 'Nommbre', field: 'name' },
        { title: 'Ocupacion', field: 'ocptdtcod' },
        { title: 'Labor', field: 'wdtcod'},
        { title: 'Centro de Coste', field: 'cecodtcod' },
        { tittle: 'Estado Asistencia', field:"Asiststate"}

    ]);

    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);
    useEffect(() => {
        GetPrimaryData("user").then((res) => {
            setData(res);


        });
        setUpdate(false);
    }, [update]);
    //getting the userslist with respective data

    return (
        <ThemeProvider theme={theme}>
            <div className="text-center flex items-center cursor-pointer">
                <input value={currentdate} onChange={handleDateChange} className="w-full text-center text-2xl mx-auto bg-gray-100 border-gray-300 rounded-md py-2 px-3 md:w-1/5" type="date" />
                {unlocked ? (<LockOpenIcon onClick={()=>setUnlocked(false)} />):(<LockPersonIcon onClick={()=>setUnlocked(true)} className="text-5xl" />)}
            </div>


            <MaterialTable
                title="Editable Preview"

                columns={columns}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve()
                            }, 1000)
                        }),
                }}
            />
        </ThemeProvider>);

}
export default TableAsistenciaSb;