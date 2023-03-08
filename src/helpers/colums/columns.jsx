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
                    Total de {' '}
                    {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
                    <Box sx={
                        cell.getValue() > 20 ? 
                        {color: 'success.main', fontWeight: 'bold'}  :
                        (cell.getValue() < 20 && 
                        {color: 'warning.main', fontWeight: 'bold'})
                        
                        }>
                        {cell.getValue()}
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