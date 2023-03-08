import {  Dialog, DialogActions, DialogContent, DialogTitle, Select } from "@mui/material";
import { descarticles, umed } from "../../../helpers/artdefvals";
import Swal from "sweetalert2";
import { supabase } from "../../../supabaseClient";

const NewArt = ({ open, close,customf }) => {
    //get data by name 
    const handlesubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('Inventario')
            .insert({ 
                COD: e.target.cod.value, 
                NAME: e.target.name.value,
                UM: e.target.um.value,
                ARTICLE_DESC: e.target.desc.value,
                tipo: e.target.servicio.checked ? 'SERVICIO' : 'COMPRA',
                Precio: e.target.price.value,                
                URL: e.target.url.value,
                PROVIDER_COD: e.target.codprov.value
            })
        if (error) {
            console.log(error);
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal! :(',
                footer: '<a href="">Por que salio mal?</a>'
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos guardados',
                showConfirmButton: false,
                timer: 1500
            })
            customf()
        }
    }
    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth={true}
            maxWidth="xs"

        >
            <DialogTitle>Nuevo articulo </DialogTitle>
            <DialogContent>
                <div className="mt-5">
                    <form onSubmit={handlesubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="cod">Codigo</label>
                            <input type="text" id="cod" name="cod" placeholder="Codigo" /></div>
                        <div className="text-end">
                            <label className="relative inline-flex items-center cursor-pointer ">
                                <input type="checkbox" name="servicio" value="" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Servicio</span>
                            </label>
                        </div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Nombre" />

                        <label htmlFor="um">Unidad de medida</label>
                        <select name="um" id="um">
                            {umed.map((index, um) => (
                                <option key={um} value={index.label}>{index.label}</option>
                            ))}
                        </select>
                        <label htmlFor="desc">Descripcion</label>
                        <select name="desc" id="desc">
                            {descarticles.map((index, desc) => (
                                <option key={desc} value={index.label}>{index.label}</option>
                            ))}
                        </select>
                        <label htmlFor="codprov">codigo provedor</label>
                        <input type="text" id="codprov" name="codprov" placeholder="Codigo provedor" />
                        <label htmlFor="url">URL</label>
                        <input type="text" id="url" name="url" placeholder="URL" />
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" placeholder="Precio" />
                        <DialogActions>

                            <input type="submit" className="bg-cyan-600 text-white" value="Guardar" />
                        </DialogActions>
                    </form>
                </div>
            </DialogContent>

        </Dialog>
    );
};
export default NewArt;