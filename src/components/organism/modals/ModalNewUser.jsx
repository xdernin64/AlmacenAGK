import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { createUserData } from "../../../helpers/CRUD/CREATE/createuser";
import { auth } from "../../../firebase";
import Swal from "sweetalert2";
import { getdata } from "../../../helpers/CRUD/READ/GetAreasData";

const NewUserModal = ({ open, close, tipo }) => {
    const [formData, setFormData] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        dni: '',
        ubicacion: '',
        estado: '',
    });
    //get submit data
    //consulta de datos para la ubicacion codigo ubicacion y nombre ubicacion
    const [data, setData] = useState([]);
    useEffect(() => {
        const unsubscribe = getdata(`details/ubicacion/general`, null, (results) => {
            setData(results);
        });
        return () => unsubscribe();
    }, []);
    console.log(data);

    const handleChange = (e) => {
        const value = e.target.type === 'text' ? e.target.value.toUpperCase() : e.target.value;
        if (tipo == "add") {
            setFormData({
                ...formData,
                [e.target.name]: value,
                tipo: "Sin usuario"

            })
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: value,
                uid: auth.currentUser.uid,
                tipo: "Con usuario"
            })
        }
        ;
    };
    //function to reset form after submit
    const resetForm = () => {
        setFormData({
            codigo: '',
            nombres: '',
            apellidos: '',
            dni: '',

        });
    };

    const usersubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // i want to use this function createUserData(formData) and after swall if success closing the modal  and if error show swal error and dont close the modal
        createUserData(formData)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos guardados',
                    showConfirmButton: false,
                    timer: 1500
                })
                resetForm();
                close();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
            });



        // Aquí puedes realizar acciones adicionales con los datos del formulario, como enviarlos a un servidor
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle>Nuevo usuario </DialogTitle>
            <DialogContent>
                <div className="mt-5">
                    <form className="max-w-md mx-auto" onSubmit={usersubmit}>
                        <div className="mb-4">
                            <label htmlFor="codigo" className="block text-gray-700 font-bold mb-2">
                                Código:
                            </label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.codigo}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombres" className="block text-gray-700 font-bold mb-2">
                                Nombres:
                            </label>
                            <input
                                type="text"
                                id="nombres"
                                name="nombres"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.nombres}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apellidos" className="block text-gray-700 font-bold mb-2">
                                Apellidos:
                            </label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.apellidos}
                                required

                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dni" className="block text-gray-700 font-bold mb-2">
                                DNI:
                            </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.dni}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ubicacion" className="block text-gray-700 font-bold mb-2">
                                Ubicación:
                            </label>
                            <select
                                id="ubicacion"
                                name="ubicacion"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.ubicacion}
                                required
                            >

                                <option value="">Seleccionar</option>
                                {data !== undefined ? (
                                    data.map((item, index) => (
                                        <option key={index} value={item.codubi}>
                                            {item.codubi}: {item.nameubi}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Seleccionar</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="estado" className="block text-gray-700 font-bold mb-2">
                                Estado:
                            </label>
                            <div className='flex flex-col'>
                                <label className='text-gray-600'>Estado:</label>
                                <select
                                    id='estado'
                                    name='estado'
                                    className='border border-gray-400 p-2 w-full rounded-md'
                                    onChange={handleChange}
                                    value={formData.estado}
                                    required
                                >
                                    <option value=''>Seleccionar</option>
                                    <option value='ACTIVO'>ACTIVO</option>
                                    <option value='INACTIVO'>INACTIVO</option>
                                </select>
                            </div>

                        </div>


                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </DialogContent >

        </Dialog >
    )

}

export default NewUserModal