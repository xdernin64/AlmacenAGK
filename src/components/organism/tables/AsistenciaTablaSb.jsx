

import { Autocomplete, Select, TextField, ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { GetPrimaryData, GetSpecificData } from '../../../helpers/CRUD/READ/GetDataSb';
import { DatePicker } from '@mui/x-date-pickers';
import { dateToString } from '../../../helpers/dateconverter';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutoCompleteRemoteSubmit from '../../molecules/fields/RAutocompleteSubmit';
import AutoCompleteRemote from '../../molecules/fields/AutoCompleteRemote';
import { Col } from 'react-bootstrap';
import { getStatusBackgroundColor, getStatusColor, mergeDatauseras } from '../../../helpers/combineddata';
import { UpdateDataSb } from '../../../helpers/CRUD/UPDATE/UpdateDataSb';
import { CreateFromObject, CreatePrimaryDataSb } from '../../../helpers/CRUD/CREATE/CREATEDATASB';
import { DeleteDataSb } from '../../../helpers/CRUD/DELETE/DeleteDataSb';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { FaSearch } from 'react-icons/fa';

const ColumnTotal = (location, subdepartament, occupation, work, ceco,callbacknombre , callbackapellido) => {
    return [
        { title: 'Codigo', field: 'cod', editable: 'never' },
        { title: 'Apellido', field: 'lastname', editable: 'never' 
            //i want to have callback that allow setapellido here
        },
        { title: 'Nombre', field: 'name', editable: 'never' },
        {
            title: 'Estado Asistencia', field: 'stateas',
            //render cell color by value
            render: rowData => (
                <div style={{ backgroundColor: getStatusBackgroundColor(rowData.stateas), padding: '8px', color: getStatusColor(rowData.stateas) }}>
                    {rowData.stateas}
                </div>
            ),
            editComponent: props => {
                const initialValue = props.value || '';
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
                        <option value="FALTA JUSTIFICADA">FALTA JUSTIFICADA</option>
                        <option value="FALTA INJUSTIFICADA">FALTA INJUSTIFICADA</option>
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
            title: 'Observaciones', field: 'asdesc'
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
const TableAsistenciaSb = ({wheresb}) => {
    const theme = createTheme();
    const [update, setUpdate] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [asistencedata, setAsistencedata] = useState([]);
    const [location, setLocation] = useState([]);
    const [subdepartament, setSubdepartament] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [work, setWork] = useState([]);
    const [ceco, setceco] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [apellido, setApellido] = useState('');
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        async function fetchData() {
            const selectdata1 = await GetPrimaryData("detaillocationzone","*");
            setLocation(selectdata1);
            const selectdata2 = await GetPrimaryData("subdepartamentdetail","*",wheresb);
            setSubdepartament(selectdata2);
            const selectdata3 = await GetPrimaryData("occupationdetail","*",wheresb);
            setOccupation(selectdata3);
            const selectdata4 = await GetPrimaryData("workdetail","*",wheresb);
            setWork(selectdata4);
            const selectdata5 = await GetPrimaryData("cecodetail","*",wheresb);
            setceco(selectdata5);
        }
        fetchData();
    }, []);

    const [currentdate, setCurrentdate] = useState(dateToString(new Date()));
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setCurrentdate(newDate);
        console.log(`Formatted Date: ${newDate}`);
    };
    async function checkassistance(codas, newData2) {
        const data = await GetSpecificData("assistence", "codas", codas);
        if (data.length == 0) {
            await CreateFromObject("assistence", newData2).then(() => {
                setUpdate(true);


            });


        } else {
            console.log("si existe")
            await UpdateDataSb("assistence", "codas", codas, newData2).then(() => {
                setUpdate(true);
            });

        }
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        
        GetPrimaryData("user", "cod,name,lastname,lcdtcod,ocptdtcod,wdtcod,cecodtcod,sdptdtcod",wheresb).then((res) => {
            setData(res);

        });
        setUpdate(false);
    }, []);
    useEffect(() => {
        const combinedobject = {dateas: currentdate,...wheresb}
        GetPrimaryData("assistence", "cod,user(name,lastname),stateas,lcdtcod,ocptdtcod,wdtcod,cecodtcod,intime,sdptdtcod,asdesc", combinedobject).then((res) => {
            setAsistencedata(res);
            console.log(wheresb.sdptdtcod)
        });
        setUpdate(false);
    }, [update]);


    //getting the userslist with respective data
    return (

        <ThemeProvider theme={theme}>
            <div className="text-center flex items-center w-2/4 cursor-pointer">

                <input value={currentdate} onChange={handleDateChange} className="text-center text-2xl mx-auto bg-gray-100 border-gray-300 rounded-md py-2 px-3" type="date" />
                <button onClick={() => setUpdate(true)} className="text-center text-2xl mx-auto bg-gray-100 text-gray-800 border-gray-300 rounded-md py-2 px-3" type="button">Buscar</button>
            </div>

            <MaterialTable
                title={`${apellido} ${nombre}`}
                columns={ColumnTotal(location, subdepartament, occupation, work, ceco)}
                data={mergeDatauseras(data, asistencedata)}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'Filas',
                        labelRowsPerPage: 'Filas por página:',
                    },
                    toolbar: {
                        searchPlaceholder: 'Buscar',
                    },
                    //laction for change delete confirmation text 
                    header: {
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: 'No hay registros para mostrar',
                        filterRow: {
                            filterTooltip: 'Filtrar',
                        },
                        addTooltip: 'Agregar',
                        deleteTooltip: 'Eliminar',
                        editTooltip: 'Editar',
                        editRow: {
                            deleteText: '¿Estás seguro de querer eliminar esta fila?',
                            cancelTooltip: 'Cancelar',
                            saveTooltip: 'Guardar',
                        },
                    },
                    //group text for grouping
                    grouping: {
                        placeholder: "Arrastre las columnas aquí para agruparlas",
                        groupedBy: 'Agrupado por:',
                    },

                }}
                onRowClick={(event, rowData) => {
                    // Perform your custom action here
                    setApellido(rowData.lastname);
                    setNombre(rowData.name);
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const newData2 = {
                                    codas: newData.cod + currentdate,
                                    cod: newData.cod,
                                    dateas: currentdate,
                                    stateas: newData.stateas,
                                    intime: (((newData.intime == null || newData.intime == "") && (newData.stateas == "ASISTENCIA" || newData.stateas == "ASISTENCIA FERIADO")) ? "06:00" : newData.intime),
                                    asdesc: newData.asdesc,
                                    lcdtcod: newData.lcdtcod,
                                    sdptdtcod: newData.sdptdtcod,
                                    ocptdtcod: newData.ocptdtcod,
                                    wdtcod: newData.wdtcod,
                                    cecodtcod: newData.cecodtcod,
                                    outtime:(((newData.stateas == "ASISTENCIA" || newData.stateas == "ASISTENCIA FERIADO")) ? "14:00" : null),
                                    workinghours:((newData.stateas == "ASISTENCIA") ? 8 : 0),
                                    doubletime:((newData.stateas == "ASISTENCIA FERIADO") ? 8 : 0)


                                }
                                checkassistance(newData2.codas, newData2)
                                resolve();
                            }, 150)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                DeleteDataSb("assistence", "codas", oldData.cod + currentdate);
                                setUpdate(true);
                                resolve()
                            }, 10)
                        }),
                }}
                options={{
                    //grouping 
                    grouping: true
                }}
            />






        </ThemeProvider>);

}
export default TableAsistenciaSb;