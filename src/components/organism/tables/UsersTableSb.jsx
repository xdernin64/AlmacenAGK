import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";
import { supabase } from '../../../supabaseClient';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import { Navigate, useNavigate } from 'react-router-dom';

const UserTableSb = ({rol, tittle, dbtable, dbsl1, dbsl2, titlearray, fieldarray, selectname, wheresb }) => {
    const { useState } = React;
    const UserTheme = createTheme({});
    const [selectsdb1, setSelectsdb1] = useState([]);
    const [selectsdb2, setSelectsdb2] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

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
            //i want to set label to the field

            editComponent: props => (
                <input
                    type="text"
                    value={props.value || ''}
                    placeholder={titlearray[0]}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
            validate: rowData => rowData[fieldarray[0]] ? true : 'Name cannot be empty'
            // Convert to uppercase
        },
        {
            title: titlearray[1],
            field: fieldarray[1],

            editComponent: props => (
                <input
                    type="text"
                    placeholder={titlearray[1]}
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
            validate: rowData => rowData[fieldarray[1]] ? true : 'Name cannot be empty'
            // Convert to uppercase
        },
        {
            title: titlearray[2],
            field: fieldarray[2],

            editComponent: props => (
                <input
                    type="text"
                    value={props.value || ''}
                    placeholder={titlearray[2]}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
            validate: rowData => rowData[fieldarray[2]] ? true : 'Name cannot be empty'
            // Convert to uppercase
        },
        {
            title: titlearray[3],
            field: fieldarray[3],
            editComponent: props => (
                <input
                    type="text"
                    value={props.value || ''}
                    placeholder={titlearray[3]}
                    onChange={e => props.onChange(e.target.value.toUpperCase())} // Convert to uppercase
                />
            ),
            validate: rowData => rowData[fieldarray[3]] ? true : 'Name cannot be empty'
            // Convert to uppercase
        },
        {
            title: titlearray[4],
            field: fieldarray[4],
            editComponent: props => (
                <select
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                    <option value="O">OTRO</option>
                </select>
            ),
            validate: rowData => rowData[fieldarray[6]] ? true : 'El nombre no puede estar vacío'
        },
        {
            title: titlearray[5],
            field: fieldarray[5],
            editComponent: props => (
                <select
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    <option value="CAMPO">CAMPO</option>
                    <option value="OFICINA">OFICINA</option>
                </select>
            ),
            validate: rowData => rowData[fieldarray[6]] ? true : 'El nombre no puede estar vacío'
        },


        {
            title: titlearray[6],
            field: fieldarray[6],
            validate: rowData => rowData[fieldarray[6]] ? true : 'Location cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;

                const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[fieldarray[6]] === initialValue);
                return (
                    <Autocomplete
                        value={initialdbsl1 || null}
                        onChange={(event, newValue) => {
                            const selectedDb1 = newValue ? newValue[fieldarray[6]] : '';
                            props.onChange(selectedDb1);
                        }}
                        options={selectsdb1}
                        getOptionLabel={selectdb1 => selectdb1[fieldarray[6]] + ": " + selectdb1[selectname[0]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[6]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[7],
            field: fieldarray[7],
            validate: rowData => rowData[fieldarray[7]] ? true : 'Zone cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;
                const initialdbsl2 = selectsdb2.find(selectdb2 => selectdb2[fieldarray[7]] === initialValue);

                return (
                    <Autocomplete
                        value={initialdbsl2 || null}
                        onChange={(event, newValue) => {
                            const selectedDb2 = newValue ? newValue[fieldarray[7]] : '';
                            props.onChange(selectedDb2);
                        }}
                        options={selectsdb2}
                        getOptionLabel={selectdb2 => selectdb2[fieldarray[7]] + ": " + selectdb2[selectname[1]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[7]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[8],
            field: fieldarray[8],
            editComponent: props => (
                <select
                    value={props.value || ''}
                    onChange={e => props.onChange(e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                </select>
            ),
            validate: rowData => rowData[fieldarray[8]] ? true : 'El nombre no puede estar vacío'
        }

    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        GetPrimaryData(dbtable, '*', wheresb).then((res) => {
            setData(res);

        });
        setUpdate(false);
    }, [update]);

    const [avaibleroles, setAvaibleroles] = useState(false);
    const [editableoptions, setEditableoptions] = useState([]);
    useEffect(() => {
        if (rol === "ADMINISTRADOR") {
            setAvaibleroles(true);
        }
        else {
            setAvaibleroles(false);
        }
    }, [rol]);




return (
    <ThemeProvider theme={UserTheme}>
        <MaterialTable
            title="Tabla de usuarios"
            columns={columns}

            data={data}
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
            editable={avaibleroles ? {
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        // Agrega el nuevo registro a Supabase
                        supabase
                            .from(dbtable)
                            .insert(newData)
                            .then(() => {
                                // Actualiza el estado de tus datos para reflejar los cambios en la tabla Material Table
                                setUpdate(true);
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
                                // Actualiza el estado de tus datos para reflejar los cambios en la tabla Material Table
                                //want to activate the useEffect
                                setUpdate(true);
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
                                setUpdate(true);
                                resolve();
                            });
                    }),
            }:{}}
            actions={[
                {
                    icon: 'edit_note',
                    tooltip: 'Editar detalles',
                    onClick: (event, rowData) => {
                        // código para manejar el clic en el botón Editar detalles
                        //get the cod from the row
                        console.log(rowData.cod);
                        navigate(`${rowData.cod}/edit`);
                    }
                }
            ]}


            //i want to color my header with a custom color

            options={{
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },
                actionsColumnIndex: -1,
                exportButton: true,
                exportAllData: true,
                exportFileName: 'Reporte de usuarios',
                grouping: true
            }}
        /></ThemeProvider>
)
}
export default UserTableSb;