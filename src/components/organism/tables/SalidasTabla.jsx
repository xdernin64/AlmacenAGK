

import { ThemeProvider, createTheme } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { GetFilterData, GetPrimaryData, GetSpecificData } from '../../../helpers/CRUD/READ/GetDataSb';
import { dateToString } from '../../../helpers/dateconverter';
import { DeleteDataSb } from '../../../helpers/CRUD/DELETE/DeleteDataSb';
import { getStatusBackgroundColor, getStatusColor } from '../../../helpers/combineddata';
import { Horasdobles, calcularJornada, convertirHorasAMinutos, horasextras25, horasextras35 } from '../../../helpers/localcount';
import { UpdateDataSb } from '../../../helpers/CRUD/UPDATE/UpdateDataSb';




const ColumnTotal = () => {
    return [
        { title: 'Codigo', field: 'cod', editable: 'never' },
        { title: 'Apellido', field: 'user.lastname', editable: 'never' },
        { title: 'Nombre', field: 'user.name', editable: 'never' },
        {
            title: 'Estado Asistencia', field: 'stateas', editable: 'never',
            render: rowData => (
                <div className='border rounded-md' style={{ backgroundColor: getStatusBackgroundColor(rowData.stateas), color: getStatusColor(rowData.stateas), padding: '8px' }}>
                    {rowData.stateas}
                </div>
            ),
        },
        {
            title: 'Tipo de horario', field: 'user.jobtime', editable: 'never'
        },
        { title: 'Hora de inicio', field: 'intime', editable: 'never' },
        {
            title: 'Hora de salida', field: 'outtime',
            editComponent: props => {
                const sanitizedValue = props.value !== null ? props.value : ''; // Asegúrate de que props.value no sea null
                return (
                    <input
                        type="time"
                        value={sanitizedValue}
                        onChange={e => props.onChange(e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Horas Trabajadas', field: 'workinghours'
        },
        {
            title: 'Horas Extras al 25%', field: 'extratime25'
        },
        {
            title: 'Horas Extras al 35%', field: 'extratime35'
        },
        {
            title: 'Horas totales',
            field: 'totalHours',
            editable: 'never',
            render: rowData => rowData.extratime25 + rowData.extratime35
        },
        {
            title: 'Horas Dobles', field: 'doubletime'
        },
        { title: 'Observaciones', field: 'asdesc' },
        { title: 'Sede', field: 'lcdtcod', editable: 'never' },
        {
            title: 'Subdepartamento', field: 'sdptdtcod', editable: 'never',
        },
        {
            title: 'Ocupacion', field: 'ocptdtcod', editable: 'never',
        },
        {
            title: 'Labor', field: 'wdtcod', editable: 'never',
        },
        {
            title: 'Centro de Coste', field: 'cecodtcod', editable: 'never',
        }
    ];
};

const TableSalidasSb = ({wheresb}) => {
    const theme = createTheme();
    const [update, setUpdate] = useState(false);
    const [asistencedata, setAsistencedata] = useState([]);
    const [currentdate, setCurrentdate] = useState(dateToString(new Date()));
    const [apellido, setApellido] = useState('');
    const [nombre, setNombre] = useState('');
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setCurrentdate(newDate);
        console.log(`Formatted Date: ${newDate}`);
    };
    useEffect(() => {
        const combinedobject = {dateas: currentdate,...wheresb}
        GetFilterData("assistence", "cod,user(name,lastname,jobtime),stateas,lcdtcod,ocptdtcod,wdtcod,cecodtcod,intime,outtime,sdptdtcod,asdesc,extratime25,extratime35,doubletime,workinghours",  combinedobject ).then((res) => {
            setAsistencedata(res);
        });
        setUpdate(false);
    }, [update]);
    return (
        <ThemeProvider theme={theme}>
            <div className="text-center flex items-center w-2/4 cursor-pointer">
                <input value={currentdate} onChange={handleDateChange} className="text-center text-2xl mx-auto bg-gray-100 border-gray-300 rounded-md py-2 px-3" type="date" />
                <button onClick={() => setUpdate(true)} className="text-center text-2xl mx-auto bg-gray-100 text-gray-800 border-gray-300 rounded-md py-2 px-3" type="button">Buscar</button>
            </div>
            <MaterialTable
                title={`${apellido} ${nombre}`}
                columns={ColumnTotal()}
                data={asistencedata}
                onRowClick={(event, rowData) => {
                    // Perform your custom action here
                    setApellido(rowData.user.lastname);
                    setNombre(rowData.user.name);
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const newData2 = {
                                    
                                    intime: newData.intime,
                                    outtime: newData.outtime,
                                    workinghours: (newData.workinghours !== null && newData.workinghours !== "") ? newData.workinghours : calcularJornada(newData.intime, newData.outtime, newData.user.jobtime,newData.stateas),
                                    extratime25: (newData.extratime25 !== null && newData.extratime25 !== "") ? newData.extratime25 : horasextras25(newData.outtime, newData.user.jobtime,newData.stateas),
                                    extratime35: (newData.extratime35 !== null && newData.extratime35 !== "") ? newData.extratime35 : horasextras35(newData.outtime, newData.user.jobtime,newData.stateas),
                                    doubletime: (newData.doubletime !== null && newData.doubletime !== "") ? newData.doubletime : Horasdobles(newData.outtime,newData.stateas),
                                    asdesc: newData.asdesc
                        
                                }
                                UpdateDataSb("assistence","codas",newData.cod + currentdate, newData2);
                                setUpdate(true);
                                console.log(newData2);
                                console.log(newData)
                                /*  
                                */resolve();
                            }, 1500)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                DeleteDataSb("assistence", "codas", oldData.cod + currentdate);
                                setUpdate(true);
                                resolve()
                            }, 1000)
                        }),
                }
                }
            />
        </ThemeProvider>);
}
export default TableSalidasSb;