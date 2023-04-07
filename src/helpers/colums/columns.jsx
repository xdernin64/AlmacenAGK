import { Box, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { getareas } from '../CRUD/delarticle';



export const columnsarticle = (getCommonEditTextFieldProps) => useMemo(

    () => [

        {

            accessorKey: 'NAME',
            header: 'Nombre',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
        },
        {
            accessorKey: 'COD', //access nested data with dot notation
            header: 'Codigo',
        },
        {
            accessorKey: 'UM', //normal accessorKey
            header: 'UMD',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
            type: 'number',
        },
        {
            accessorKey: 'ARTICLE_DESC',
            header: 'Articulo',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'text',
            }),
        },
        {
            accessorKey: 'URL',
            header: 'URL',
            //hide this column
            hide: false,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'text',

            }),
        }
    ],
    [getCommonEditTextFieldProps],
);

export const columnstocks = (getCommonEditTextFieldProps) => useMemo(
    () => [
        {
            accessorKey: 'p_id.NAME',
            header: 'Articulo',
            enableEditing: false,
        },
        {
            accessorKey: 'quantity',
            header: 'Cantidad',
            aggregationFn: 'sum',
            //required to render an aggregated cell, show the average salary in the group
            AggregatedCell: ({ cell, table }) => (
                <>
                    Total de {''}
                    {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                    <Box sx={
                        cell.getValue() > 20 ?
                            { color: 'success.main', fontWeight: 'bold' } :
                            (cell.getValue() < 20 &&
                                { color: 'warning.main', fontWeight: 'bold' })

                    }>
                        {cell.getValue() + ' ' + cell.row.original.p_id.UM}
                    </Box>
                </>
            ),

            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'number',
            }),

        },
        {
            accessorKey: 'date',
            header: 'Fecha',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'date',
            }),
        },
        {
            accessorKey: 'area.area',
            header: 'Area',
            enableEditing: false,
        },
        {
            accessorKey: 'description',
            header: 'Detalles',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'text',
            }),
        },


        {
            accessorKey: 'p_id.COD', //access nested data with dot notation
            header: 'Codigo',
            enableEditing: false,
        },
        {
            accessorKey: 'user_id.apellidosynombres', //normal accessorKey
            header: 'Usuario',
            enableEditing: false,
        },
        {
            accessorKey: 'tipo',
            header: 'Tipo',
            enableEditing: false,

        },
        {
            accessorKey: 'tuid',
            header: 'tuid',
            enableEditing: false,
        },


    ],
    [],
);
export const ordersproducts = (getCommonEditTextFieldProps) => useMemo(
    () => [
        {
            accessorKey: 'quantityproduct',
            header: 'Cantidad',
            enableEditing: false,
        },
        {
            accessorKey: 'codiproduct.COD',
            header: 'Codigo',
            enableEditing: false,
        },
        {
            accessorKey: 'codiproduct.NAME',
            header: 'Articulo',
            enableEditing: false,
        },
        {
            accessorKey: 'codarea.area',
            header: 'Area',
            enableEditing: false,
        },
        {
            accessorKey: 'codpedido.user.apellidosynombres',
            header: 'Usuario',
            enableEditing: false,
        },
        {
            accessorKey: 'codpedido.Name',
            header: 'Pedido',
            enableEditing: false,
        },

        {
            accessorKey: 'description',
            header: 'Detalles',
            enableEditing: false,
        },
        {
            accessorKey: 'id',
            header: 'id',
            enableEditing: false,
        }

    ],
    [],
);
const estados = ['Pendiente', 'En Proceso', 'Finalizado'];
export const columns = (getCommonEditTextFieldProps) => useMemo(
    () => [
        {
            accessorFn: (row) => `${row.Name} `, //accessorFn used to join multiple data into a single cell
            id: 'Name', //id is still required when using accessorFn instead of accessorKey
            header: 'Nombre',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >

                    {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                    <span>{renderedCellValue}</span>
                </Box >
            ),
        },
        {
            accessorKey: 'id',
            header: 'id',
            enableEditing: false,
        },
        {
            accessorKey: 'date',
            header: 'Fecha',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'text',
            }),
        },
        {
            accessorKey: 'Estado',
            header: 'Estado',
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                
                //i want to have a radio group instead of a text field
                type: 'select',
                options: estados,
                //i want to have a radio group instead of a text field
                


                
            }),
        },


    ], [])
