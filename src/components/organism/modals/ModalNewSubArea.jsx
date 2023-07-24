// i want to create a NewJobModal where consider only cod and name for that area
//
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { CreateSubareaData } from "../../../helpers/CRUD/CREATE/createuser";

const NewSubAreaModal = ({ open, close ,areacod,areaname}) => {
    const [formData, setFormData] = useState({
        subareacod: '',
        subareaname: '',
        subareadesc: '',
    });
    //get submit data
    const handleChange = (e) => {
        const value = e.target.type === 'text' ? e.target.value.toUpperCase() : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            areacod: areacod,
            areaname: areaname
        });
    }
    //function to reset form after submit
    const resetForm = () => {
        setFormData({
            subareacod: '',
            subareaname: '',
            subareadesc: ''
        });
    }
    const subareasubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // i want to use this function createJobData(formData) and after swall if success closing the modal  and if error show swal error and dont close the modal
        CreateSubareaData(formData,areacod)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos guardados',
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();
                close();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al guardar los datos',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
    return (
        //return a dialog
        <Dialog open={open} onClose={close} fullWidth={true}
        maxWidth="xs">
            <DialogTitle className="text-center">Nuevo departamento</DialogTitle>
            <DialogContent>
                <form onSubmit={subareasubmit}>
                    <div className="flex flex-col">
                        <div className="flex">
                        <h2>{areacod} - {areaname} </h2>
                        </div>
                        <label className="text-lg">Codigo</label>
                        <input
                            type="text"
                            name="subareacod"
                            className="border-2 rounded-lg border-blue-500 p-1"
                            value={formData.subareacod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg">Nombre</label>
                        <input
                            type="text"
                            name="subareaname"
                            className="border-2 rounded-lg border-blue-500 p-1"
                            value={formData.subareaname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg">Descripcion</label>
                        <input
                            type="text"
                            name="subareadesc"
                            className="border-2 rounded-lg border-blue-500 p-1"
                            value={formData.subareadesc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    );
}

export default NewSubAreaModal;

