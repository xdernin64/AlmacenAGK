import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useEffect } from "react";

const Table = () => {
    //create table with supabase querys for articles and stocks 
    const [Articles, setArticles] = useState();
    const getArticles = async () => {
        // make paginate for articles
        const { data, error } = await supabase.from('Inventario')
            .select('COD, NAME, UM, ARTICLE_DESC').limit(10)
        console.log(data, error)



        setArticles(data);
    }
    useEffect(() => {
        getArticles();
    }, []);
    return (
        <div className="table">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="border-4 border-gdark p-3">Codigo</th>
                        <th className="border-4 border-gdark p-3">Nombre</th>
                        <th className="border-4 border-gdark p-3">Unidad de medida</th>
                        <th className="border-4 border-gdark p-3">Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {Articles !== undefined && (
                        <>
                            {Articles.map((item) => (
                                <tr key={item.COD}>
                                    <td className="border-4 border-gdark p-3">{item.COD}</td>
                                    <td className="border-4 border-gdark p-3">{item.NAME}</td>
                                    <td className="border-4 border-gdark p-3">{item.UM}</td>
                                    <td className="border-4 border-gdark p-3">{item.ARTICLE_DESC}</td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );

}
export default Table;