import Tabla from "../organism/inventario";


const Orders = () => {
    return (
        <div className="pagina max-[770px]:mb-24">
            <h1 className="tittlepage">Solicitudes</h1>
            <div className="flex overflow-x-auto">
                <Tabla />
            </div>
        </div>
    );
}
export default Orders;