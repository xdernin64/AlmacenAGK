import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
import { createauthuser } from "./CREATEDATASB";
import { errorMessage, successMessage } from "../../Alerts/alerts";

export const createusersb = async (props) => {
    
    
    const { data, error } = await supabase.auth.signUp(
        {
            email: props.email,
            password: props.password,
            options: {
                data: {
                    cod: props.cod,
                    name: props.name,
                    lastname: props.lastname,
                    rol: props.rol,
                    cargo: props.cargo,
                    location: props.location,
                    area: props.area,
                    departament: props.departament,
                    subdepartament: props.subdepartament,
                    email: props.email
                }
            }
        })
    if (error) {
        console.log(error)
        errorMessage("Error al crear usuario")
    }
    else {
        successMessage("Usuario creado");
        const { error } = await supabase
            .from('auth_users')
            .insert([
                { 
                    id: data.user.id, 
                    cod: props.cod, 
                    name: props.name, 
                    lastname: props.lastname, 
                    rol: props.rol, 
                    cargo: props.cargo, 
                    email: props.email ,
                    location: props.location,
                    area: props.area,
                    departament: props.departament,
                    subdepartament: props.subdepartament,
                    suuser: props.suuser
                }
            ])
        //i want to insert now insise the table usersb the id of the user created
        
        if (error) {
            console.log(error)

        }
        else {
            console.log("user inserted")
        }
    }
    

    
}
export const updateregister = async () => {
    const { data, error } = await supabase.auth.updateUser("92dc0634-1f11-4ab1-9af4-717dd6e067dd", {
        data: {

            age: 24,
        },
    })
} 