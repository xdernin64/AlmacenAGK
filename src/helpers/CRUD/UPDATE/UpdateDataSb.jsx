import { supabase } from "../../../supabaseClient";

export const UpdateDataSb = async (table, fieldName, fieldValue, props) => {
    try {
        const { error } = await supabase
            .from(table)
            .update(props)
            .eq(fieldName, fieldValue);

        return { error };
    } catch (error) {
        console.error('Error al actualizar el registro en Supabase:', error);
        return { error };
    }
};
