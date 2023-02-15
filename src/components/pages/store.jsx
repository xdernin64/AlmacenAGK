
import Tabla from "../organism/inventario";
const Store = () => {

    return (
        <div className="pagina max-[770px]:mb-24">
            <h1 className="tittlepage">Articulos</h1>
            <div>
                <Tabla />
            </div>
        </div>
    );
}
export default Store;
