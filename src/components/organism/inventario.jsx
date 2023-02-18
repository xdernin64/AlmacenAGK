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

const Tabla = ({ table, columnas, tablecols, customdel, customupd, colid, modalcod,containchild=false,order,asc=true,initstate }) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [tableData, setTableData] = useState();
    const [Requests, setRequests] = useState(false);

    
    const [selectedRow, setSelectedRow] = useState(null);
    const MySwal = withReactContent(Swal);

    const getArticles = async () => {
        const { data, error } = await supabase.from(table)
            .select(columnas).order(order, { ascending: asc });
        setTableData(data);
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
            //get value from p_id.COD
            setTableData([...tableData]);
            exitEditingMode();}
            else {
                        Swal.fire(
                            'Actualizado!',
                            'El articulo fue actualizado.',
                            'success'
                        )
                        //getArticles();
                        setRequests(false);
                        customupd(values);
                        exitEditingMode();
                        
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
        setRequests(true);
        getArticles();
    }, [Requests]);
    return (
        <div className=''>
            
            <Modal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                cod={selectedRow} customf={()=> setRequests(false) }
            
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
                    initialState={initstate}
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
