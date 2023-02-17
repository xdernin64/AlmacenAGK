import React, { useMemo, useCallback } from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete, Edit, Add, Article } from '@mui/icons-material';
import Loader from './loader';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from './modals/Modal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Tabla = ({ table, columnas, tablecols, customdel, customupd, colid, modalcod,containchild=false }) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [tableData, setTableData] = useState();
    
    const [selectedRow, setSelectedRow] = useState(null);
    const MySwal = withReactContent(Swal);

    const getArticles = async () => {
        const { data, error } = await supabase.from(table)
            .select(columnas).limit()
        setTableData(data);
        console.log(error);
    }
    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            if (!containchild) {
            tableData[row.index] = values;
            customupd(values);
            //spilce objects from values
            console.log(values["p_id.COD"]);
            //get value from p_id.COD
            setTableData([...tableData]);
            exitEditingMode();}
            else {
                console.log(values);
                //refresh the table
                //swal to confirm update
                MySwal.fire({
                    title: '¿Quieres actualizar el articulo?',
                    text: "No podrás recuperarlo luego!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, Actualizar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        
                        //render this component
                        Swal.fire(
                            'Actualizado!',
                            'El articulo fue actualizado.',
                            'success'
                        )
                        customupd(values);
                        exitEditingMode();
                        getArticles();
                        //refresh the table

                    }
                })
            }
        }
    };
    const handleDeleteRow = useCallback(
        (row) => {
            MySwal.fire({
                title: '¿Quieres eliminar de la lista?',
                text: "No podrás recuperarlo luego!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    customdel(row.getValue(colid)).then(() => {

                        tableData.splice(row.index, 1);
                        setTableData([...tableData]);
                    });
                    Swal.fire(
                        'Elimininado!',
                        'El articulo fue eliminado.',
                        'success'
                    )
                }
            })
        },
        [tableData],
    );
    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
            };
        },
        [validationErrors],
    );

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };
    const columns = tablecols(getCommonEditTextFieldProps);

    useEffect(() => {
        getArticles();
    }, []);
    return (
        <div className=''>
            
            <Modal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                cod={selectedRow} customf={(containchild) => {
                    if (containchild) {
                        getArticles();
                    }
                    
                }
            }
            />
            {tableData !== undefined ? (
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    editingMode="modal"
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enablePinning
                    enableRowActions
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={{ showColumnFilters: false, columnVisibility: { URL: false }, density: 'compact' }}
                    positionToolbarAlertBanner="bottom"
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="right" title="Add">
                                <IconButton color="success" onClick={() => {
                                    setCreateModalOpen(true)
                                    setSelectedRow(row.getValue(modalcod))
                                }}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>

                        </Box>
                    )}
                />) : (<Loader></Loader>)
            }</div>
    );
};
export default Tabla;
