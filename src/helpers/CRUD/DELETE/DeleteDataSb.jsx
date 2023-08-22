import { supabase } from "../../../supabaseClient";

export const DeleteDataSb = async (table, fieldName, fieldValue) => {
    console.log("mis datos", table, fieldName, fieldValue);
    const { error } = await supabase
        .from(table)
        .delete()
        .eq(fieldName, fieldValue);
    console.log(error);
    return error;
};