import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { artcolumns } from '../../helpers/colums/articlecols';
import Loader from './loader';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const mydata = [
    {
        COD: '1',
        NAME: 'Articulo 1',
        UM: 'UND',
        ARTICLE_DESC: 'Articulo 1',
    },
    {
        COD: '2',
        NAME: 'Articulo 2',
        UM: 'UND',
        ARTICLE_DESC: 'Articulo 2',
    }
];
const Tabla = () => {
    const [Articles, setArticles] = useState();
    const getArticles = async () => {
        const { data, error } = await supabase.from('Inventario')
            .select('COD, NAME, UM, ARTICLE_DESC,URL').limit(16000)
        setArticles(data);
    }
    useEffect(() => {
        getArticles();
    }, []);
    return (
        <>
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
                    initialState={{ showColumnFilters: false }}
                    positionToolbarAlertBanner="bottom"
                    //detalles de la tabla
                    renderDetailPanel={({ row }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                alt="avatar"
                                height={200}
                                src={row.original.URL}
                                
                                loading="lazy"
                                style={{ borderRadius: '50%' }}
                            />
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4">Signature Catch Phrase:</Typography>
                                <Typography variant="h1">
                                    &quot;{Articles.URL}&quot;
                                </Typography>
                            </Box>
                        </Box>
                    )}
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
                                
                            });StaticExample();
                        };

                        const handleActivate = () => {
                            table.getSelectedRowModel().flatRows.map((row) => {
                                alert('activating ' + row.getValue('COD'));
                            });
                        };

                        const handleContact = () => {
                            table.getSelectedRowModel().flatRows.map((row) => {
                                alert('contact ' + row.getValue('COD'));
                            });
                        };

                        return (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    color="error"
                                    disabled={!table.getIsSomeRowsSelected()}
                                    onClick={handleDeactivate}
                                    variant="contained"
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    color="success"
                                    disabled={!table.getIsSomeRowsSelected()}
                                    onClick={handleActivate}
                                    variant="contained"
                                >
                                    Agregar
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
                        );
                    }}
                />) : (<Loader></Loader>)
            }</>
    );
};
export default Tabla;
