import { useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';

import { supabase } from "../../supabaseClient";
import Loader from "../organism/loader";
const Store = () => {
    const columns = [
        {
            accessorKey: 'COD', //access nested data with dot notation
            header: 'Codigo',
        },
        {
            accessorKey: 'NAME',
            header: 'Nombre',
        },
        {
            accessorKey: 'UM', //normal accessorKey
            header: 'UMD',
        },
        {
            accessorKey: 'ARTICLE_DESC',
            header: 'Articulo',
        }
    ]
    const [Articles, setArticles] = useState();
    const getArticles = async () => {
        const { data, error } = await supabase.from('Inventario')
            .select('COD, NAME, UM, ARTICLE_DESC').limit(16000)
        setArticles(data);
    }
    useEffect(() => {
        getArticles();
    }, []);
    console.log(Articles);
    

    return (
        <div className="store pagina">
            <h1 className="tittlepage">Articulos</h1>
            {Articles !== undefined ? (
                <MaterialReactTable columns={columns} data={Articles} />
            ) : (<Loader></Loader>) }
        </div>
    );
}
export default Store;
