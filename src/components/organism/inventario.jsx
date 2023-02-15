import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { artcolumns } from '../../helpers/colums/articlecols';
import Loader from './loader';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from './modals/Modal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { delarticle } from '../../helpers/CRUD/delarticle';

const Tabla = () => {
    const [openModal, setOpenModal] = useState(false);
    var [cod, setCod] = useState();
    const MySwal = withReactContent(Swal);

    const [Articles, setArticles] = useState();
    const getArticles = async () => {
        const { data, error } = await supabase.from('Inventario')
            .select('COD, NAME, UM, ARTICLE_DESC,URL').limit()
        setArticles(data);
    }
    
    useEffect(() => {
        getArticles();
    }, []);
    return (
        <div className=' tablacontent'>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                cod={cod}
            />
            {Articles !== undefined ? (
                <MaterialReactTable
                    columns={artcolumns}
                    data={Articles}
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enablePinning
                    enableRowActions
                    enableRowSelection
                    initialState={{ showColumnFilters: false, columnVisibility: { URL: false }, density: 'compact' }}
                    positionToolbarAlertBanner="bottom"
                    //fin de detalles de la tabla
                    renderRowActionMenuItems={({ closeMenu }) => [
                        <MenuItem
                            key={0}
                            onClick={() => {
                                // View profile logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            View Profile
                        </MenuItem>,
                        <MenuItem
                            key={1}
                            onClick={() => {
                                // Send email logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <Send />
                            </ListItemIcon>
                            Send Email
                        </MenuItem>,
                    ]}

                    renderTopToolbarCustomActions={({ table }) => {
                        const handleDeactivate = () => {
                            table.getSelectedRowModel().flatRows.map((row) => {
                                //alert('deactivating ' + row.getValue('COD'));
                                setCod(row.getValue('COD'));
                                if (openModal === false) {
                                    setOpenModal(true);

                                } else {
                                    setOpenModal(false);

                                }
                            });
                        };

                        const handleActivate = () => {
                            table.getSelectedRowModel().flatRows.map((row) => {
                                //alert('activating ' + row.getValue('COD'));
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
                                        delarticle(row.getValue('COD'));
                                            Swal.fire(
                                                'Elimininado!',
                                                'El articulo fue eliminado.',
                                                'success'
                                            )
                                    }
                                })

                            });
                        };

                        const handleContact = () => {
                            table.getSelectedRowModel().flatRows.map((row) => {
                                //  alert('contact ' + row.getValue('COD'));

                            });
                        };

                        return (
                            <div>
                            <div className='max-[770px]:grid min-[770px]:flex' style={{  gap: '0.5rem' }}>
                                <Button
                                    color={`${openModal ? 'warning' : 'success'}`}
                                    disabled={!table.getIsSomeRowsSelected()}
                                    onClick={handleDeactivate}
                                    variant="contained"
                                >
                                    {openModal ? 'Cerrar' : 'Agregar'}
                                </Button>
                                <Button
                                    color="error"
                                    disabled={!table.getIsSomeRowsSelected()}
                                    onClick={handleActivate}
                                    variant="contained"
                                >
                                    Eliminar

                                </Button>
                                <Button
                                    color="info"
                                    disabled={!table.getIsSomeRowsSelected()}
                                    onClick={handleContact}
                                    variant="contained"
                                >
                                    Ver Detalles
                                </Button>
                            </div>
                            </div>
                        );
                    }}
                />) : (<Loader></Loader>)
            }</div>
    );
};
export default Tabla;
