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
import { buttonstyles, cellstyles, footrerstyles, headerstyles } from '../styles/sx/tablestyles';

const Tabla = ({ table, columnas, tablecols, customdel, customupd, colid, modalcod, containchild = false, order, asc = true, initstate, reltable = false, editbuttons = true,detailtable=false }) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [tableData, setTableData] = useState();
    const [Requests, setRequests] = useState(reltable);


    const [selectedRow, setSelectedRow] = useState(null);
    const MySwal = withReactContent(Swal);

    const getArticles = async () => {
        const { data, error } = await supabase.from(table)
            .select(columnas).order(order, { ascending: asc });
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
                //get value from p_id.COD
                setTableData([...tableData]);
                exitEditingMode();
            }
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
                cod={selectedRow} customf={() => setRequests(false)}

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
                    enableRowActions={editbuttons}
                    enableEditing={editbuttons}
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={initstate}
                    renderDetailPanel={detailtable}
                    sx={{ padding: '10%' }}
                    muiTableHeadCellProps={{
                        //easier way to create media queries, no useMediaQuery hook needed.
                        sx: headerstyles,
                    }}
                    muiTableBodyCellProps={
                        {
                            sx:cellstyles,
                        }
                    }
                    muiTopToolbarProps={
                        {
                            sx:{
                                background:"#063970",
                                button:{
                                    color:"#fff"
                                },
                                div:{
                                    color:"#fff",
                                }
                                                                    
                            },
                            
                            
                        }
                    }
                    muiBottomToolbarProps={{
                        sx:{
                            background:"#063970",
                            div:{
                                color:"#fff",
                                backgroundColor:"#063970",
                            },
                            iconButton:{
                                color:"#fff",
                                backgroundColor:"#fff"
                            }

                        },
                    }}
                    positionToolbarAlertBanner="bottom"
                    renderRowActions={({ row, table }) => (
                        <Box >
                            <Tooltip arrow placement="right" title="Add">
                                
                                <IconButton className='bg-white' color="success" sx={{background:"#e4dbdb"}} onClick={() => {
                                    setCreateModalOpen(true)
                                    setSelectedRow(row.getValue(modalcod))
                                }}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton style={{ backgroundColor: 'white' }} onClick={() => table.setEditingRow(row)}>
                                    <Edit  />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Delete">
                                <IconButton style={{ backgroundColor: 'white' }} color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>

                        </Box>
                    )}
                />) : (<Loader></Loader>)
            }
            <div className='h-20'>
                
            </div>
            
            </div>
    );
};
export default Tabla;
