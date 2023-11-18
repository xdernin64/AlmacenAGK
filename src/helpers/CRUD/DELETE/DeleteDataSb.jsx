import { supabase } from "../../../supabaseClient";
import { errorMessage } from "../../Alerts/alerts";

export const DeleteDataSb = async (table, fieldName, fieldValue) => {
    console.log("mis datos", table, fieldName, fieldValue);
    const { error } = await supabase
        .from(table)
        .delete()
        .eq(fieldName, fieldValue);
    console.log(error);
    if (error){
        errorMessage('Error al eliminar el registro');
    }
    return error;
};