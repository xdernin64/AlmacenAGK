import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './constants/env'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*

//supabase get data from user by id 

*/
export const signsupabase = async (email1,password1) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email1,
        password: password1,
    })
    console.log(data,error,email1,password1)
}