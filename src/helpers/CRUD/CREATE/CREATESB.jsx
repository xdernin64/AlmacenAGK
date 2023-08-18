import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { useEffect } from "react";

export const createusersb = async (props) => {
    const email = props.email;
    const password = props.password;

    try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            throw error;
        }

        if (user) {
            // Imprime el ID del usuario creado
            console.log('ID del usuario creado:', user.id);
        } else {
            console.error('Error al crear el usuario:', 'No se ha podido obtener el ID del usuario.');
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
    }



}