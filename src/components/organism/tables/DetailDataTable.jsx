import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { supabase } from '../../../supabaseClient';


const DetailDataTable = ({ tittle, dbtable, dbsl1, dbsl2, titlearray, fieldarray, selectname }) => {
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
            <ThemeProvider theme={theme}>
                <MaterialTable
                    title={tittle}
                    columns={columns}
                    data={async query => {
                        const { data, error } = await supabase
                            .from(dbtable)
                            .select('*')
                            .filter( `${fieldarray[0]}`, 'ilike', `%${query.search}%`)

                        return {
                            data: data,
                            page: query.page,
                            totalCount: data.length
                        };
                    }}
                    options={
                        {
                            exportButton: true,
                            exportAllData: true,
                            exportFileName: tittle,
                            grouping: true

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
                            }),
                    }}
                /></ThemeProvider></div>
    )
}
export default DetailDataTable; 