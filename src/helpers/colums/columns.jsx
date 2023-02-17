import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { getareas } from '../CRUD/delarticle';

var areas = getareas();



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
            header: 'Area'
        },
        {
            accessorKey: 'description',
            header: 'Detalles',
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