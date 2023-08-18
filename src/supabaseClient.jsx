import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './constants/env'
import { Authstate } from './firebase';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const checkUserAuthentication = async () => {
    
const { data: { user } } = await supabase.auth.getUser()
console.log(user)
}
/*

//supabase get data from user by id 

*/
export const signsupabase = async (email1, password1) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email1,
        password: password1,
    })
    console.log(data, error, email1, password1)
}
//logut supabase
export const logoutsupabase = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error)
}
const createrole = async () => {
    auth.createRole({
        role: 'administrador',
        permissions: [
            {
                resource: 'posts',
                actions: ['create', 'read', 'update', 'delete'],
                filter: {
                    authorId: auth.currentUser.uid,
                },
            },
        ],
    })
        .then((role) => {
            // Role created!
        }
        )
        .catch((error) => {
            if (error.code === 'auth/invalid-argument') {
                console.log('The role already exists')
            }
        }
        )
}