
import { columnsarticle } from "../../helpers/colums/columns";
import { delarticle, updatearticle } from "../../helpers/CRUD/delarticle";
import Tabla from "../organism/inventario";
const Store = () => {
    return (
        <div className="pagina max-[770px]:mb-24">
            <h1 className="tittlepage">Articulos</h1>
            <div>
                <Tabla table="Inventario" columnas="COD, NAME, UM, ARTICLE_DESC,URL" 
                tablecols={columnsarticle} customdel={delarticle}
                customupd={updatearticle} colid="COD" modalcod="COD"
                />
            </div>  
        </div>
    );
}
export default Store;
