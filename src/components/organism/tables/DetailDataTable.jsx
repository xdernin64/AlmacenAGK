import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { supabase } from '../../../supabaseClient';


const DetailDataTable = ({ tittle, dbtable, dbsl1, dbsl2, titlearray, fieldarray, selectname, subdepartament }) => {
    const [dbdata, setDbdata] = useState([]); //table data
    const [selectedsubdepartament, setSelectedsubdepartament] = useState(null);
    const [subdepartamentoption, setSubdepartamentoption] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            const response = await GetPrimaryData(dbtable);
            if (response) {
                setDbdata(response);
            }
            if (subdepartament) {
                setSubdepartamentoption(await GetPrimaryData('subdepartamentdetail'));
            }
        };
        fetchData();
    }, []);
    useEffect(() => {


        const fetchData = async () => {

            const response = await GetPrimaryData(dbtable, "*", { sdptdtcod: selectedsubdepartament });
            if (response) {
                setDbdata(response);
            }
        };
        if (subdepartament) {
            fetchData();
            setUpdate(false);
        }

    }, [selectedsubdepartament, update]);

    const theme = createTheme({
        //i want that width will alwais be 100% of the container
        overrides: {
            MuiTableCell: {
                root: {
                    padding: '0px 0px 0px 0px',
                },
            },
            //i want to edit foother withd cant be more than 

        },

    });
    const [selectsdb1, setSelectsdb1] = useState([]);
    const [selectsdb2, setSelectsdb2] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const selectdata1 = await GetPrimaryData(dbsl1);
            const selectdata2 = await GetPrimaryData(dbsl2);
            setSelectsdb1(selectdata1);
            setSelectsdb2(selectdata2);
        }
        fetchData();
    }, []);
    const columns = [
        {
            title: titlearray[0],
            field: fieldarray[0],
            editable: 'onAdd',
            editComponent: props => (
                <input
                    type="text"
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
            validate: rowData => rowData[fieldarray[0]] ? true : 'Name cannot be empty'
            // Convert to uppercase
        },
        {
            title: titlearray[1],
            field: fieldarray[1],
            validate: rowData => rowData[fieldarray[1]] ? true : 'Location cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;
                const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[fieldarray[1]] === initialValue);
                return (
                    <Autocomplete
                        value={initialdbsl1 || null}
                        onChange={(event, newValue) => {
                            const selectedDb1 = newValue ? newValue[fieldarray[1]] : '';
                            props.onChange(selectedDb1);
                        }}
                        options={selectsdb1}
                        getOptionLabel={selectdb1 => selectdb1[fieldarray[1]] + ": " + selectdb1[selectname[0]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[1]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[2],
            field: fieldarray[2],
            validate: rowData => rowData[fieldarray[2]] ? true : 'Zone cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;
                const initialdbsl2 = selectsdb2.find(selectdb2 => selectdb2[fieldarray[2]] === initialValue);

                return (
                    <Autocomplete
                        value={initialdbsl2 || null}
                        onChange={(event, newValue) => {
                            const selectedDb2 = newValue ? newValue[fieldarray[2]] : '';
                            props.onChange(selectedDb2);
                        }}
                        options={selectsdb2}
                        getOptionLabel={selectdb2 => selectdb2[fieldarray[2]] + ": " + selectdb2[selectname[1]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[2]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[3],
            field: fieldarray[3],
            editComponent: props => (
                <input
                    type="text"
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
        },

    ];
    return (
        <div className='p-0 m-0'>
            {
                subdepartament ? (
                    <div className="flex justify-center">
                        <div className="flex flex-col">
                            <select className="border-2 border-gray-500 rounded-lg p-1 m-1" onChange={(e) => setSelectedsubdepartament(e.target.value)}>
                                <option value="">Selecciona un subdepartamento</option>
                                {subdepartamentoption.map((item) => (
                                    <option key={item.sdptdtcod} value={item.sdptdtcod}>{item.sdptdtdesc}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title={tittle}
                    columns={columns}
                    data={dbdata}
                    options={
                        {
                            exportButton: true,
                            exportAllData: true,
                            exportFileName: tittle,
                            grouping: true,
                            headerStyle: {
                                backgroundColor: '#ff9303',
                                color: '#FFF'
                            }

                        }


                    }
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'Filas',
                            labelRowsPerPage: '',
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
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                // Agrega el nuevo registro a Supabase
                                supabase
                                    .from(dbtable)
                                    .insert(newData)
                                    .then(() => {
                                        // Actualiza el estado de tus datos para reflejar los cambios en la tabla Material Table
                                        // ...
                                        resolve();
                                    });
                                setUpdate(true);
                            }),

                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                // Actualiza el registro en Supabase
                                supabase
                                    .from(dbtable)
                                    .update(newData)
                                    .match({ [fieldarray[0]]: oldData[fieldarray[0]] })
                                    .then(() => {
                                        resolve();
                                    });
                                setUpdate(true);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                // Elimina el registro en Supabase
                                supabase
                                    .from(dbtable)
                                    .delete()
                                    .match({ [fieldarray[0]]: oldData[fieldarray[0]] })
                                    .then(() => {
                                        resolve();
                                    });
                                setUpdate(true);

                            }),
                    }}
                /></ThemeProvider></div>
    )
}
export default DetailDataTable; 