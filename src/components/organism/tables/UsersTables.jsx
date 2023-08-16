import React, { useState, useEffect } from 'react';
import { getdata, getdatarealtimedatabase } from '../../../helpers/CRUD/READ/GetAreasData';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { deleteDataSwal } from '../../../helpers/Alerts/alerts';
import { deleteUserData } from '../../../helpers/CRUD/DELETE/DelFunctions';
import { useNavigate } from "react-router-dom";


const UsersTable = () => {
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [selectedData, setSelectedData] = useState(null);
        const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = getdatarealtimedatabase('users', setUserData);
        return unsubscribe;
    }, []);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const applySort = (property) => (orderBy === property ? order : false);

    const handleEditClick = (data) => {
        setSelectedData(data);
        //check if exist data.uid and if not exist data.uid navigate to /usuario/${data.codigo}/edit else navigate to /usuario/${data.uid}/edit
        const namedata = data.uid ? data.uid : data.codigo;
        navigate(`/usuario/${namedata}/edit`, { state: { data } });
    };

    const handleDeleteClick = (data) => {
        setSelectedData(data);
        console.log('Editar:', data);
        //make if if exist uid and set const namedata = data.uid; else set const namedata = data.codigo;
        var namedata = '';
        if (data.uid) {
            //set const namedata = data.uid;
            console.log('uid:', data.uid);
            namedata = data.uid;
        }
        else {
            //set const namedata = data.codigo;
            console.log('codigo:', data.codigo);
            namedata = data.codigo;
        }
        deleteDataSwal(() => { deleteUserData(namedata) }, "Borraras los datos del usuario", "Fallo al borrar los datos", "Datos borrados correctamente");
    };

    const filteredData = userData.filter(user => (
        user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    const sortedData = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) => (order === 'asc' ? a[orderBy] > b[orderBy] ? 1 : -1 : b[orderBy] > a[orderBy] ? 1 : -1));

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const Menubuttons = ({ props }) => {
        return (
            <Menu>
                <MenuHandler>
                    <ListIcon />
                </MenuHandler>
                <div className='bg-gray-700'>
                    <MenuList className='bg-blue-gray-600'>
                        <MenuItem
                            onClick={() => {
                                handleEditClick(props);
                            }}
                        >
                            <EditIcon /> Editar
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                handleDeleteClick(props)
                            }
                        >
                            <DeleteIcon /> Eliminar
                        </MenuItem>
                    </MenuList>
                </div>
            </Menu>
        );
    }

    return (
        <div className="">
            <TextField
                label="Buscar"
                variant="outlined"
                size="large"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: <SearchIcon />,
                }}
                className="mb-4"
            />
            <TableContainer
            >
                <Table>
                    <TableHead>
                        <TableRow className='bg-gray-900 text-white'>
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold'>
                                    Acciones
                                </div>
                                
                                
                                </TableCell> {/* Nueva columna para acciones */}
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold' onClick={() => handleRequestSort('codigo')}>
                                    Código {applySort('codigo') && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold' onClick={() => handleRequestSort('nombres')}>
                                    Nombres {applySort('nombres') && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold' onClick={() => handleRequestSort('apellidos')}>
                                    Apellidos {applySort('apellidos') && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold' onClick={() => handleRequestSort('dni')}>
                                    DNI {applySort('dni') && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='pointer text-gray-400 font-bold' onClick={() => handleRequestSort('ubicacion')}>
                                    Ubicación {applySort('ubicacion') && (order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                                </div>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                                                {sortedData.map((user) => (
                            <TableRow key={user.codigo}>
                                <TableCell>
                                    <Menubuttons props={user} />
                                </TableCell>
                                <TableCell>{user.codigo}</TableCell>
                                <TableCell>{user.nombres}</TableCell>
                                <TableCell>{user.apellidos}</TableCell>
                                <TableCell>{user.dni}</TableCell>
                                <TableCell>{user.ubicacion}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default UsersTable;
