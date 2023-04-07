import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Fab, IconButton, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import AddIcon from '@mui/icons-material/Add';
import { Authstate } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';

const PreOrders = () => {
    const [preOrders, setPreOrders] = useState([]);

    //funtion to remove local storage item by key
    const removeItem = (index) => {
        const newItems = [...preOrders];
        newItems.splice(index, 1);
        setPreOrders(newItems);
        localStorage.setItem('local', JSON.stringify(newItems));
    };
    const makeorder = async (e) => {
        e.preventDefault();
        const articulos = JSON.parse(localStorage.getItem('local'));
        const newid=uuidv4();

        const {data, error} = await supabase.from('pedidos').upsert(
            {
                id: newid,
                Name: (e.target.nombre.value).toUpperCase(),
                user: Authstate().uid,
                date: new Date(),
                Estado: 'PENDIENTE',
                
            }, { returning: 'minimal' });
        //insertar datos de local storage
        
        const listaproducts = articulos.map((articulo)=>({
            codiproduct:articulo.p_id,
            quantityproduct:parseInt(articulo.quantity),
            codarea: articulo.area,
            codpedido: newid,
            date: articulo.date,
            description: articulo.description
        }));
        const {error: inserterror} = await supabase.from('productos_pedidos').insert(listaproducts)
        console.log(inserterror)
        //limpiar local storage
        localStorage.removeItem('local');
        setPreOrders([]);
    }

    useEffect(() => {
        setPreOrders(JSON.parse(localStorage.getItem('local')) || []);

    }, []);



    return (
        <div className="pagina max-[770px]:mb-24">
            <h1 className="tittlepage">Pre Orders</h1>

            {preOrders.length == 0 ? <div className="m-auto text-center ">
                <img className="m-auto text-center" src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png" alt="Sin ordenes" />
                <p className="text-3xl font-mono text-white w-auto font-bold">No hay articulos pre ordenados</p>
            </div> :
                <>
                    <form onSubmit={makeorder}>
                        <div className="grid grid-flow-col grid-cols-5">
                            <input type="text" name="nombre" className="border-b-4 border-sky-600 unborded max-[770px]:col-span-3 col-span-4 text-xl" placeholder="Nombre del pedido" />
                            <input type="submit" className="bg-teal-600 text-white cursor-pointer col-span-2" value="Hacer pedido" />
                        </div>
                    </form>
                </>
            }
            <div className="md:flex ">

                {preOrders.map((item, key) => {
                    return (
                        <div key={key} className="border m-5  shadow-lg rounded-md">
                            <div className="h-auto">
                                <h1 className=" border-b-2 p-2 grid grid-cols-12 bg-sky-600 border-t-2 text-white font-bold ">
                                    <span className="text-left col-span-10">{item.product} x {item.quantity}{item.und} </span>
                                    <span></span>
                                    <span className=" text-center  ">
                                        <p className="cursor-pointer rounded-full bg-red-800" onClick={() => removeItem(key)} > x </p>
                                    </span>
                                </h1>
                                <div className="body-card max-[770px]:flex max-[770px]:p-0 bg-white">
                                    <div className="h-60 w-80 max-[770px]:h-28 max-[770px]:w-3/6 max-[770px]:border-r-2  sm:m-2 max-[770px]:pr-2 max-[770px]:pl-2 ">
                                        <img className="object-contain max-[770px]:h-24 sm:h-full m-auto text-center " src={item.url} alt="producto" />
                                    </div>
                                    <div className="max-[770px]:w-full  bg-gray-600 p-2 text-white">
                                        Almacen: {item.areaname}
                                        <br />
                                        Cantidad: {item.quantity}
                                        <br />
                                        Unidad: {item.und}
                                        <br />
                                        Descripcion: {item.description}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
            <div className="m-auto text-center">
            </div>
        </div>
    );
};
export default PreOrders;