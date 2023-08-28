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
export const GetPrimaryDataRT = async (db, select = '*', where = {}) => {
    const { data, error } = await supabase
        .from(db)
        .select(select)
        .match(where)
        .on('INSERT', payload => {
            console.log('New row inserted!', payload);
        })
        .on('UPDATE', payload => {
            console.log('Row updated!', payload);
        })
        .on('DELETE', payload => {
            console.log('Row deleted!', payload);
        });

    console.log(data, error);
    return data;
};
export const GetPrimaryDatReTime = async (db, select = '*', where = {}, supabase) => {
    // Listen to inserts
    // Query the database
    const { data: result, error: queryError } = await supabase.from(db).select(select).match(where)

    console.log(result, queryError)

    return result
}