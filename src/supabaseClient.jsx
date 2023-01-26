import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './constants/env'


/*
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//supabase get data from user by id 

*/

export const getUser = async (id) => {
    /*const { data } = await supabase.from('users').select('*').eq('id', id)
    return <data></data>*/
    console.log(process.env.REACT_APP_SUPABASE_URL);

}