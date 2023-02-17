import { delstock, updatestock } from "../../helpers/CRUD/delarticle";
import { columnstocks } from "../../helpers/colums/columns";
import Tabla from "../organism/inventario";


const Home = () => {
    return (
        <div className="pagina">
            <h1 className="tittlepage">Inicio</h1>
            <Tabla table="Stocks" columnas="tuid,p_id(COD,NAME),user_id(apellidosynombres),date,area(area),quantity,tipo,description" 
                tablecols={columnstocks} customdel={delstock}
                customupd={updatestock} colid="tuid"
                modalcod="p_id.COD" containchild={true}
                />
        </div>
    );
}	
export default Home;