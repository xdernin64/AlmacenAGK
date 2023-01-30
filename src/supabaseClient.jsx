import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './constants/env'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*

//supabase get data from user by id 

*/

export const getUser = async (id) => {
    const { data,error } = await supabase.from('Usuarios').select()
    // print all data 
    console.log(data)
    
    return  data
}