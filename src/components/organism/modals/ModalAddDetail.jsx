import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { createdetailData } from "../../../helpers/CRUD/CREATE/createuser";
import { UpdateDetailData } from "../../../helpers/CRUD/UPDATE/UpdateFunctions";
import { errorMessage, successMessage } from "../../../helpers/Alerts/alerts";


const ModalAddDetail = ({ NameProps, PropsLabels, Dtittle, Props, onEdit, open, close, dbname }) => {
    // Verificar si existen los nombres de los campos antes de renderizar el formulario
    if (!NameProps || NameProps.length !== 3) {
        return null; // No renderizar nada si no hay nombres suficientes
    }

    const [name1, name2, name3] = NameProps;
    const [label1 = "", label2 = "", label3 = ""] = PropsLabels;

    const [formData, setFormData] = useState({
        [name1]: "",
        [name2]: "",
        [name3]: "",
    });
    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const resetForm = () => {
        setFormData({
            [name1]: "",
            [name2]: "",
            [name3]: "",
        });
    };

    const detailsubmit = async (e) => {
        e.preventDefault();
        console.log("this is my formData: " + JSON.stringify(formData));
        console.log("this is my dbname: " + dbname + " and this is my formData[name1]: " + formData[name1]);

        const saveFunction = onEdit ? UpdateDetailData : createdetailData;
        const aprovedmessage = onEdit ? "Datos actualizados" : "Datos guardados";
        try {
            const rest = await saveFunction(formData, dbname,formData[name1]);
            successMessage(aprovedmessage);
            resetForm();
            close();
            
        } catch (error) {
            console.log(error);
            errorMessage("Error al guardar los datos");
            
        }
    };
    const pretittle = onEdit ? "Modificar " : "Agregar ";

    return (
        <Dialog open={open} onClose={close} maxWidth="xs" fullWidth={true}>
            <DialogTitle className="text-center">{pretittle+Dtittle}</DialogTitle>
            <DialogContent>
                <form onSubmit={detailsubmit}>
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor={name1} className="text-lg">{label1}</label>
                                <input type="text" className={`border-2 rounded-lg ${onEdit ? 'border-amber-500' : 'border-blue-500'}  p-1`} name={name1} value={formData[name1]} onChange={handleChange} />

                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor={name2} className="text-lg">{label2}</label>
                                <input type="text" className={`border-2 rounded-lg ${onEdit ? 'border-amber-500' : 'border-blue-500'}  p-1`} name={name2} value={formData[name2]} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor={name3} className="text-lg">{label3}</label>
                                <input type="text" className={`border-2 rounded-lg ${onEdit ? 'border-amber-500' : 'border-blue-500'}  p-1`} name={name3} value={formData[name3]} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button type="submit" className={`${onEdit ? 'bg-amber-600 text-black' : 'bg-blue-600 text-white'}-500 px-4 py-2 rounded-lg`}>{onEdit ? "Modificar" : "Guardar"}</button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ModalAddDetail;
