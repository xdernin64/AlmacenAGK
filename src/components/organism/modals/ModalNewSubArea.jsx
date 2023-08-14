import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CreateSubareaData } from "../../../helpers/CRUD/CREATE/createuser";
import { UpdateSubareaData } from "../../../helpers/CRUD/UPDATE/UpdateFunctions";

const NewSubAreaModal = ({ open, close ,areacod,areaname,subareaprops,editsubarea}) => {
    const [formData, setFormData] = useState({
        subareacod: '',
        subareaname: '',
        subareadesc: '',
    });
    //loading data inside form
    useEffect(() => {
        if (editsubarea && subareaprops) {
            setFormData({
                subareacod: subareaprops.subareacod || '',
                subareaname: subareaprops.subareaname || '',
                subareadesc: subareaprops.subareadesc || '',
                areacod: areacod,
                areaname: areaname
            });
        } else {
            resetForm();
        }
    }, [editsubarea, subareaprops]);
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
    const subareasubmit = async (e) => {
        e.preventDefault();
        // i want to use this function createJobData(formData) and after swall if success closing the modal  and if error show swal error and dont close the modal
        const saveFunction = editsubarea ? UpdateSubareaData : CreateSubareaData;
        const successMessage = editsubarea ? 'Datos actualizados' : 'Datos guardados';
        const failedMessage = editsubarea ? 'Error al actualizar los datos' : 'Error al guardar los datos';
        try {
            const res = await saveFunction(formData);
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                timer: 150
            });
            resetForm();
            close();
        }
        catch(err)
        {
            console.log(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: failedMessage,
                showConfirmButton: false,
                timer: 150
            });
        }


        
        
        CreateSubareaData(formData,areacod)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos guardados',
                    showConfirmButton: false,
                    timer: 150
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
                    timer: 150
                });
            });
    }
    const dialogTitle = editsubarea ? 'Editar departamento' : 'Nuevo departamento';
    const buttonLabel = editsubarea ? 'Actualizar' : 'Guardar';
    return (
        //return a dialog
        <Dialog open={open} onClose={close} fullWidth={true}
        maxWidth="xs">
            <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={subareasubmit}>
                    <div className="flex flex-col">
                        <div className="flex">
                        <h2 className="w-full text-center font-bold text-xl">{areacod} - {areaname} </h2>
                        </div>
                        <label className="text-lg">Codigo</label>
                        <input
                            type="text"
                            name="subareacod"
                            className={"border-2 rounded-lg text-center bg-gray-600 text-white "}
                            value={formData.subareacod}
                            onChange={handleChange}
                            required
                            {...(editsubarea && { disabled: true })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg">Nombre</label>
                        <input
                            type="text"
                            name="subareaname"
                            className={`border-2 rounded-lg ${editsubarea ? 'border-amber-500':'border-blue-500'}  p-1`}
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
                            className={`border-2 rounded-lg ${editsubarea ? 'border-amber-500':'border-blue-500'}  p-1`}
                            value={formData.subareadesc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className={`${editsubarea ? 'bg-amber-500 text-black':'bg-blue-500 text-white' } px-4 py-2 rounded-lg`}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    );
}

export default NewSubAreaModal;

