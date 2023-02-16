import { delstock, updatestock } from "../../helpers/CRUD/delarticle";
import { columnstocks } from "../../helpers/colums/columns";
import Tabla from "../organism/inventario";
import Example from "../organism/modals/modalexample";

const Home = () => {
    return (
        <div className="pagina">
            <h1 className="tittlepage">Inicio</h1>
            <Tabla table="Stocks" columnas="tuid,p_id(COD,NAME),user_id(apellidosynombres),date,area(area),quantity,tipo" 
                tablecols={columnstocks} customdel={delstock}
                customupd={updatestock} colid="tuid"
                modalcod="p_id.COD"
                />
        </div>
    );
}	
export default Home;