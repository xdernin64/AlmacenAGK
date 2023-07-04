import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { createUserData } from "../../../helpers/CRUD/CREATE/createuser";

const NewUserModal = ({ open, close }) => {
    const [formData, setFormData] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        dni: '',
        fechaNacimiento: '',
        fechaIngreso: '',
        numeroCelular: '',
    });
    //get submit data

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const usersubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        createUserData(formData);
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
                            <label htmlFor="fechaNacimiento" className="block text-gray-700 font-bold mb-2">
                                Fecha de Nacimiento:
                            </label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.fechaNacimiento}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fechaIngreso" className="block text-gray-700 font-bold mb-2">
                                Fecha de Ingreso:
                            </label>
                            <input
                                type="date"
                                id="fechaIngreso"
                                name="fechaIngreso"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.fechaIngreso}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="numeroCelular" className="block text-gray-700 font-bold mb-2">
                                Número de Celular:
                            </label>
                            <input
                                type="tel"
                                id="numeroCelular"
                                name="numeroCelular"
                                className="border border-gray-400 p-2 w-full rounded-md"
                                onChange={handleChange}
                                value={formData.numeroCelular}
                            />
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