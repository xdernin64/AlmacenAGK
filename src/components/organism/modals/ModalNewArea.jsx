import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CreateAreaData } from "../../../helpers/CRUD/CREATE/createuser";
import { UpdateAreaData } from "../../../helpers/CRUD/UPDATE/UpdateFunctions";

const NewAreaModal = ({ open, close, editing, propdata }) => {
    console.log("Esta es mi propdata:  " + propdata)
    const [formData, setFormData] = useState({
        areacod: '',
        areaname: '',
        areadesc: ''
    });

    useEffect(() => {
        if (editing && propdata) {
            setFormData({
                areacod: propdata.areacod || '',
                areaname: propdata.areaname || '',
                areadesc: propdata.areadesc || ''
            });
        } else {
            resetForm();
        }
    }, [editing, propdata]);

    const handleChange = (e) => {
        const value = e.target.type === 'text' ? e.target.value.toUpperCase() : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const resetForm = () => {
        setFormData({
            areacod: '',
            areaname: '',
            areadesc: ''
        });
    }

    const areasubmit = async (e) => {
        e.preventDefault();

        const saveFunction = editing ? UpdateAreaData : CreateAreaData;
        const successMessage = editing ? 'Datos actualizados' : 'Datos guardados';

        try {
            const res = await saveFunction(formData);
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                timer: 1500
            });
            resetForm();
            close();
        } catch (err) {
            console.log(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al guardar los datos',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const dialogTitle = editing ? "Editar Área" : "Nueva Área";
    const buttonLabel = editing ? "Modificar" : "Guardar";

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth="xs">
            <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={areasubmit}>
                    <div className="flex flex-col">
                        <label className="text-lg">Código</label>
                        <input
                            type="text"
                            name="areacod"
                            className={`border-2 rounded-lg ${editing ? 'border-transparent bg-gray-500 text-gray-200 text-center':'border-blue-500'}  p-1`}
                            value={formData.areacod}
                            onChange={handleChange}
                            required
                            {...(editing && { disabled: true })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg">Nombre</label>
                        <input
                            type="text"
                            name="areaname"
                            className={`border-2 rounded-lg ${editing ? 'border-amber-500':'border-blue-500'}  p-1`}
                            value={formData.areaname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg">Descripción</label>
                        <input
                            type="text"
                            name="areadesc"
                            className={`border-2 rounded-lg ${editing ? 'border-amber-500':'border-blue-500'}  p-1`}
                            value={formData.areadesc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className={`${editing ? 'bg-amber-600 text-black' : 'bg-blue-600 text-white'}-500 px-4 py-2 rounded-lg`}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default NewAreaModal;