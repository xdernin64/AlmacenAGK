import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { GetPrimaryData } from '../../../helpers/CRUD/READ/GetDataSb';
import { CreatePrimaryDataSb } from '../../../helpers/CRUD/CREATE/CREATEDATASB';
import { DeleteDataSb } from '../../../helpers/CRUD/DELETE/DeleteDataSb';
import { UpdateDataSb } from '../../../helpers/CRUD/UPDATE/UpdateDataSb';

const PrimaryDataTable = ({ dtname, colsnames }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const useStyles = makeStyles({
        root: {
            '& .MuiIconButton-root': {
                height: '24px',
                width: '24px',
            },
            '& .MuiSvgIcon-root': {
                fontSize: '18px',
            },
        },
    });
    const defaultMaterialTheme = createTheme({
        overrides: {
            // Estilos personalizados para Material-UI
        },
    });

    const [columns, setColumns] = useState(colsnames);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetPrimaryData(dtname);
            if (response) {
                setData(response);
            }
        };
        fetchData();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    const handleRowAdd = async (newData) => {
        try {
            // Convertir automáticamente los valores a mayúsculas
            const newDataUpperCase = { ...newData };
            Object.keys(newDataUpperCase).forEach((field) => {
                if (typeof newDataUpperCase[field] === 'string') {
                    newDataUpperCase[field] = newDataUpperCase[field].toUpperCase();
                }
            });

            const response = await CreatePrimaryDataSb(dtname, newDataUpperCase);
            if (response.error) {
                setSnackbarOpen(true);
                setSnackbarMessage('Error al agregar el registro');
                setSnackbarSeverity('error');
            } else {
                setData([...data, newDataUpperCase]);
            }
        } catch (error) {
            setSnackbarOpen(true);
            setSnackbarMessage('Error al agregar el registro');
            setSnackbarSeverity('error');
        }
    };
    const handleRowDelete = async (oldData) => {
        try {
            const deleteFieldName = Object.keys(oldData)[0]; // Obtiene el primer campo del objeto oldData

            if (deleteFieldName) {
                const deleteFieldValue = oldData[deleteFieldName];

                const response = await DeleteDataSb(dtname, deleteFieldName, deleteFieldValue);
                if (!response) {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData(dataDelete);
                }
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };
    const handleRowUpdate = async (newData, oldData) => {
        try {
            // Convertir todos los valores a mayúsculas
            const updatedData = Object.fromEntries(
                Object.entries(newData).map(([key, value]) => [key, value.toUpperCase()])
            );
            
            const updateFieldName = Object.keys(updatedData)[0]; // Obtén el primer campo del objeto updatedData
            
            if (updateFieldName) {
                const updateFieldValue = updatedData[updateFieldName];
                
                const response = await UpdateDataSb(dtname, updateFieldName, updateFieldValue, updatedData);
                if (!response.error) {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = updatedData;
                    setData(dataUpdate);
                } else {
                    console.error('Error al actualizar el registro:', response.error);
                }
            }
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
        }
    };
    
    return (
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                title=""
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
                //i want a green header for my table
                options={{
                    headerStyle: {
                        backgroundColor: '#007148',
                        color: '#FFF'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                }
                }
                editable={{
                    onRowAdd: handleRowAdd,
                    onRowUpdate: handleRowUpdate,
                    onRowDelete: handleRowDelete,
                }}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default PrimaryDataTable;
