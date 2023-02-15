import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { supabase } from '../../supabaseClient';

//nested data is ok, see accessorKeys in ColumnDef below





const Example = () => {
    const [Articles, setArticles] = useState();

    const getArticles = async () => {

        const { data, error } = await supabase
            .from('Stocks')
            .select(`p_id(COD,NAME),user_id(apellidosynombres),date,area(area)`)
            .order('created_at', { ascending: false })

        setArticles(data);
    }
    console.log(Articles);

    useEffect(() => {
        getArticles();
    }, []);
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'p_id.COD', //access nested data with dot notation
                header: 'Codigo',
            },
            {
                accessorKey: 'p_id.NAME',
                header: 'Articulo',
            },
            {
                accessorKey: 'user_id.apellidosynombres', //normal accessorKey
                header: 'Usuario',

            },
            {
                accessorKey: 'date',
                header: 'Fecha',
            },
            {
                accessorKey: 'area.area',

                header: 'Area',
            },
        ],
        [],
    );

    return (
        <>
            {
                Articles !== undefined ? (<MaterialReactTable columns={columns}
                    data={Articles} />) : (<h1>loading</h1>)
            }

        </>
    );
};

export default Example;
