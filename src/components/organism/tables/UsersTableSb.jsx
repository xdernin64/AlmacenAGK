import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";
import { supabase } from '../../../supabaseClient';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import { Navigate, useNavigate } from 'react-router-dom';

const UserTableSb = ({ tittle, dbtable, dbsl1, dbsl2, titlearray, fieldarray, selectname }) => {
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
            validate: rowData => rowData[fieldarray[4]] ? true : 'Location cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;

                const initialdbsl1 = selectsdb1.find(selectdb1 => selectdb1[fieldarray[4]] === initialValue);
                return (
                    <Autocomplete
                        value={initialdbsl1 || null}
                        onChange={(event, newValue) => {
                            const selectedDb1 = newValue ? newValue[fieldarray[4]] : '';
                            props.onChange(selectedDb1);
                        }}
                        options={selectsdb1}
                        getOptionLabel={selectdb1 => selectdb1[fieldarray[4]] + ": " + selectdb1[selectname[0]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[4]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[5],
            field: fieldarray[5],
            validate: rowData => rowData[fieldarray[5]] ? true : 'Zone cannot be empty',
            editComponent: props => {
                const initialValue = props.value || '';
                const rowData = props.rowData;
                const initialdbsl2 = selectsdb2.find(selectdb2 => selectdb2[fieldarray[5]] === initialValue);

                return (
                    <Autocomplete
                        value={initialdbsl2 || null}
                        onChange={(event, newValue) => {
                            const selectedDb2 = newValue ? newValue[fieldarray[5]] : '';
                            props.onChange(selectedDb2);
                        }}
                        options={selectsdb2}
                        getOptionLabel={selectdb2 => selectdb2[fieldarray[5]] + ": " + selectdb2[selectname[1]]}
                        renderInput={params => (
                            <TextField {...params} label={titlearray[5]} variant="outlined" />
                        )}
                    />
                );
            },
        },
        {
            title: titlearray[6],
            field: fieldarray[6],
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
            validate: rowData => rowData[fieldarray[6]] ? true : 'El nombre no puede estar vacío'
        }
        
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        GetPrimaryData(dbtable).then((res) => {
            setData(res);

        });
        setUpdate(false);
    }, [update]);


    return (
        <ThemeProvider theme={UserTheme}>
            <MaterialTable
                title="Tabla de usuarios"
                columns={columns}
                data={data}
                editable={{
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
                }}
                actions={[
                    {
                        icon: 'edit_note',
                        tooltip: 'Editar detalles',
                        onClick: (event, rowData) => {
                          // código para manejar el clic en el botón Editar detalles
                          //get the cod from the row
                            console.log(rowData.cod);
                            navigate(`${rowData.cod}/edit`);   
                        }}
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