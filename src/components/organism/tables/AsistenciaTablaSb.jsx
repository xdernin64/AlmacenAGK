

import { Autocomplete, Select, TextField, ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import { DatePicker } from '@mui/x-date-pickers';
import { dateToString } from '../../../helpers/dateconverter';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutoCompleteRemoteSubmit from '../../molecules/fields/RAutocompleteSubmit';
import AutoCompleteRemote from '../../molecules/fields/AutoCompleteRemote';
import { Col } from 'react-bootstrap';
const ColumnTotal = (location, subdepartament, occupation, work, ceco) => {
    return [
        { title: 'Codigo', field: 'cod', editable: 'never' },
        { title: 'Apellido', field: 'lastname', editable: 'never' },
        { title: 'Nombre', field: 'name', editable: 'never' },
        {
            title: 'Estado Asistencia', field: 'asiststate',
            //render cell color by value
            cellStyle: (e, rowData) => {
                if (rowData.asiststate === "ASISTENCIA") {
                    return { backgroundColor: '#00ff00', color: '#000000', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "DSO") {
                    return { backgroundColor: '#FFA500', color: '#000000', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "DXHA") {
                    return { backgroundColor: '#FFD700', color: '#000000', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "FALTO JUSTIFICADO") {
                    return { backgroundColor: '#FFC0CB', color: '#000000', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "FALTO INJUSTIFICADO") {
                    return { backgroundColor: '#FF0000', color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "LICENCIA") {
                    return { backgroundColor: '#ADD8E6', color: '#000000', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "DSO FERIADO") {
                    return { backgroundColor: '#800080', color: '#ffff', fontWeight: 'bold', textAlign: 'center' }
                }
                if (rowData.asiststate === "ASISTENCIA FERIADO") {
                    return { backgroundColor: '#008000', color: '#ffff', fontWeight: 'bold', textAlign: 'center' }
                }
            },
            editComponent: props => {
                const initialValue = props.value || '';
                console.log

                return (
                    <Select
                        native
                        value={initialValue}
                        onChange={e => props.onChange(e.target.value)}
                        inputProps={{
                            name: 'asiststate',
                            id: 'asiststate',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value="ASISTENCIA">ASISTENCIA</option>
                        <option value="DSO">DSO</option>
                        <option value="DXHA">DXHA</option>
                        <option value="FALTO JUSTIFICADO">FALTO JUSTIFICADO</option>
                        <option value="FALTO INJUSTIFICADO">FALTO INJUSTIFICADO</option>
                        <option value="LICENCIA">LICENCIA</option>
                        <option value="DSO FERIADO">DSO FERIADO</option>
                        <option value="ASISTENCIA FERIADO">ASISTENCIA FERIADO</option>
                    </Select>

                );
            }
        },
        {
            title: 'Hora de inicio', field: 'intime',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <input
                        type="time"
                        value={initialValue}
                        onChange={e => props.onChange(e.target.value)}
                    />
                );
            }
        },
        {
            title: 'Observaciones', field: 'obs'
        },
        {
            title: 'Sede', field: 'lcdtcod',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <AutoCompleteRemote db="detaillocationzone"
                        title="Sede" dataprops={["lcdtcod", "lcdtdesc"]}
                        value={initialValue} onChange={props.onChange} qstate={true} qdata={location} />
                );
            },
        },
        {
            title: 'Subdepartamento', field: 'sdptdtcod',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <AutoCompleteRemote db="subdepartamentdetail"
                        title="SubDepartamento" dataprops={["sdptdtcod", "sdptdtdesc"]}
                        value={initialValue} onChange={props.onChange} qstate={true} qdata={subdepartament} />

                );
            },

        },
        {
            title: 'Ocupacion', field: 'ocptdtcod',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <AutoCompleteRemote db="occupationdetail"
                        title="Ocupacion" dataprops={["ocptdtcod", "ocptdtdesc"]}
                        value={initialValue} onChange={props.onChange} qstate={true} qdata={occupation} />

                );
            },
        },
        {
            title: 'Labor', field: 'wdtcod',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <AutoCompleteRemote db="workdetail"
                        title="Labor" dataprops={["wdtcod", "wdtdesc"]}
                        value={initialValue} onChange={props.onChange} qstate={true} qdata={work} />

                );
            }
        },
        {
            title: 'Centro de Coste', field: 'cecodtcod',
            editComponent: props => {
                const initialValue = props.value || '';
                return (
                    <AutoCompleteRemote db="cecodetail"
                        title="Centro de Coste" dataprops={["cecodtcod", "cecodtdesc"]}
                        value={initialValue} onChange={props.onChange} qstate={true} qdata={ceco} />

                );
            }

        }
    ]
}
const TableAsistenciaSb = () => {
    const theme = createTheme();
    const [userslist, setUserslist] = useState([]);
    const [update, setUpdate] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [asistencedata, setAsistencedata] = useState([]);
    const [userdetail, setUserdetail] = useState({});
    const [location, setLocation] = useState([]);
    const [subdepartament, setSubdepartament] = useState({});
    const [occupation, setOccupation] = useState({});
    const [work, setWork] = useState({});
    const [ceco, setceco] = useState({});
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const selectdata1 = await GetPrimaryData("detaillocationzone");
            setLocation(selectdata1);
            const selectdata2 = await GetPrimaryData("subdepartamentdetail");
            setSubdepartament(selectdata2);
            const selectdata3 = await GetPrimaryData("occupationdetail");
            setOccupation(selectdata3);
            const selectdata4 = await GetPrimaryData("workdetail");
            setWork(selectdata4);
            const selectdata5 = await GetPrimaryData("cecodetail");
            setceco(selectdata5);
            console.log(selectdata1);
        }
        fetchData();
    }, []);

    const [currentdate, setCurrentdate] = useState(dateToString(new Date()));
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setCurrentdate(newDate);
        console.log(`Formatted Date: ${newDate}`);
    };
    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        
    ]);
    useEffect(() => {
        GetPrimaryData("user").then((res) => {
            setData(res);

        });
        setUpdate(false);
    }, [update]);
    useEffect(() => {
        GetPrimaryData("assistence").then((res) => {
            setAsistencedata(res);
        });
    }, []);
    useEffect(() => {
        const combinedData = data.map((user) => {
            const assistence = asistencedata.find(
                (assistence) => assistence.commonColumn === user.commonColumn
            );
            return {
                ...user,
                ...assistence,
            };
        });
        setCombinedData(combinedData);
    }, [data, asistencedata]);

    //getting the userslist with respective data
    return (
        <ThemeProvider theme={theme}>
            <div className="text-center flex items-center cursor-pointer">
                <input value={currentdate} onChange={handleDateChange} className="w-full text-center text-2xl mx-auto bg-gray-100 border-gray-300 rounded-md py-2 px-3 md:w-1/5" type="date" />
                {unlocked ? (<LockOpenIcon onClick={() => setUnlocked(() => { console.log(location) })} />) : (<LockPersonIcon onClick={() => setUnlocked(true)} className="text-5xl" />)}
            </div>



            <MaterialTable
                title="Editable Preview"
                columns={ColumnTotal(location, subdepartament, occupation, work, ceco)}
                data={combinedData}
                editable={{

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
                }
                }
            />
        </ThemeProvider>);

}
export default TableAsistenciaSb;