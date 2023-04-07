import { useState } from "react";
import { deleteorder, delorderproduct, updateorder } from "../../helpers/CRUD/delarticle";
import { columns, ordersproducts } from "../../helpers/colums/columns";
import Tabla from "../organism/inventario";
import ModalOrders from "../organism/modals/ModalOrders";
import SimpleListTable from "../organism/SimpleListTable";



const Orders = () => {
    const [open, setOpen] = useState(false);
    const openmodal = () => setOpen(true);

    return (
        <div className="pagina max-[770px]:mb-24 ">
            <h1 className="tittlepage">Solicitudes</h1>
            <button onClick={openmodal} className="bg-green-100 font-bold text-black"> Estado de ordenes</button>
            <h2 className="text-center bg-slate-200 text-xl font-bold">Listado de ordenes</h2>
            <ModalOrders
                open={open}
                onClose={() => setOpen(false)}
            ></ModalOrders>
            <div className="m-auto text-center">
                <Tabla table="pedidos" columnas="*"
                    tablecols={columns} customdel={deleteorder}
                    customupd={updateorder} colid="id"
                    modalcod="id" containchild={true} order="created_at" asc={false}
                    editbuttons={true}
                    initstate={
                        {
                            showColumnFilters: false,
                            columnVisibility: { id: false , Actions: false},
                            density: 'compact',
                            
                        }
                    }
                    detailtable={({row}) => (
                        <SimpleListTable id={row.original.id}></SimpleListTable>
                    )}

                />
            </div>
        </div>
    );
}
export default Orders;