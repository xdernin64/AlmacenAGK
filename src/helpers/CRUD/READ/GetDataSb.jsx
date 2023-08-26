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
export const GetPrimaryData = async (db, select = '*', where = {}) => {
    const { data, error } = await supabase
        .from(db)
        .select(select)
        .match(where);
    console.log(data, error);
    return data;
};

export const GetSpecificData = async (db, field, value) => {
    const { data, error } = await supabase
        .from(db)
        .select('*')
        .eq(field, value);
    console.log(data, error);
    return data;
};
