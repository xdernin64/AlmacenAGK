import { supabase } from "../../../supabaseClient";

export const GetAuthDataUser = async (id) => {
    const { data, error } = await supabase
        .from('authusers')
        .select('*')
        .eq('id', id)
        .single();
    console.log(data, error);
    return data;
};
export const GetPrimaryData = async (db) => {
    const { data, error } = await supabase
        .from(db)
        .select('*');
    console.log(data, error);
    return data;
};
