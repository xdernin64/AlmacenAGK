import { useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';

import { supabase } from "../../supabaseClient";
import Loader from "../organism/loader";
import { artcolumns } from "../../helpers/colums/articlecols";
const Store = () => {
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
                <MaterialReactTable columns={artcolumns} data={Articles} />
            ) : (<Loader></Loader>) }
        </div>
    );
}
export default Store;
