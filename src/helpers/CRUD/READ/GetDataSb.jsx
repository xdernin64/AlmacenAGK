export const GetAuthDataUser = async (id) => {
    const { data, error } = await supabase
        .from('authusers')
        .select('*')
        .eq('id', id)
        .single();
    console.log(data, error);
    return data;
};
