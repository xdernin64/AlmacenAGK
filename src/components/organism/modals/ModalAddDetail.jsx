import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { createdetailData } from "../../../helpers/CRUD/CREATE/createuser";
import { UpdateDetailData } from "../../../helpers/CRUD/UPDATE/UpdateFunctions";
import { errorMessage, successMessage } from "../../../helpers/Alerts/alerts";

const ModalAddDetail = ({ NameProps, PropsLabels, Dtittle, Props, onEdit, opend, close, dbname }) => {
    if (!NameProps || NameProps.length !== 3) {
        return null;
    }
    

    const initialFormData = {
        [NameProps[0]]: Props[NameProps[0]] || "",
        [NameProps[1]]: Props[NameProps[1]] || "",
        [NameProps[2]]: Props[NameProps[2]] || "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };
    const handleClose = () => {
        resetForm();
        close();
    };

    const detailsubmit = async (e) => {
        e.preventDefault();

        const saveFunction = onEdit ? UpdateDetailData : createdetailData;
        const message = onEdit ? "Datos actualizados" : "Datos guardados";

        try {
            const result = await saveFunction(formData, dbname, formData[NameProps[0]]);
            successMessage(message);
            resetForm();
            close();
        } catch (error) {
            console.error(error);
            errorMessage("Error al guardar los datos");
        }
    };

    const pretittle = onEdit ? "Modificar " : "Agregar ";

    return (
        <Dialog open={opend} onClose={handleClose} maxWidth="xs" fullWidth={true}>
            <DialogTitle className="text-center">{pretittle + Dtittle}</DialogTitle>
            <DialogContent>
                <form onSubmit={detailsubmit}>
                    <div className="row">
                        {NameProps.map((name, index) => (
                            <div className="col-12 col-md-4" key={index}>
                                <div className="form-group">
                                    <label htmlFor={name} className="text-lg">
                                        {PropsLabels[index]}
                                    </label>
                                    <input
                                        type="text"
                                        className={`border-2 rounded-lg ${onEdit ? 'border-amber-500' : 'border-blue-500'}  p-1`}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className={`${onEdit ? 'bg-amber-600 text-black' : 'bg-blue-600 text-white'}-500 px-4 py-2 rounded-lg`}
                        >
                            {onEdit ? "Modificar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ModalAddDetail;

