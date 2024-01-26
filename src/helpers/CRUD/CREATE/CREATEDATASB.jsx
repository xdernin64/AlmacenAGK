import { supabase } from "../../../supabaseClient";
import { errorMessage, successMessage } from "../../Alerts/alerts";

export const createauthuser = async (id, email, props) => {
    const { error } = await supabase
        .from('auth_users')
        .insert({ id: id, email: email, cod: props.cod, cargo: props.cargo, name: props.name, lastname: props.lastname, rol: props.rol })
    if (error) {
        console.log(error)
    }
    else {
        console.log("user created")
    }
};
export const createuser = async (props, id) => {
    const { error } = await supabase.from('users')
        .insert({
            cod: props.cod,
            name: props.name,
            lastname: props.lastname,
            dni: props.dni,
            gender: props.gender,
            state: props.state,
            locationcod: props.locationcod,
            startworkdate: props.startworkdate,
            birthdate: props.birthdate,
            phonenumber: props.phonenumber,
            shoesize: props.shoesize,
            shirtsize: props.shirtsize,
            pantsize: props.pantsize,
            campaingnumber: props.campaingnumber,
            expyears: props.expyears,
            edulevel: props.edulevel,
            skills: props.skills,
            areacod: props.areacod,
            departamentcod: props.departamentcod,
            jobcode: props.jobcode,
            ocupationcod: props.ocupationcod,
            cecocod: props.cecod,
            subdepartamentcod: props.subdepartamentcod,
            groupcod: props.groupcod,
            jobtime: props.jobtime,
        })
    if (error) {
        console.log(error)
    }
    else {
        console.log("user created")
    }
};
export const CreatePrimaryDataSb = async (dtname, newData) => {

    try {
        const { data, error } = await supabase.from(dtname).insert([newData]);
        if (error) {
            errorMessage('Error al agregar el registro');
            return { error: true, message: 'Error al agregar el registro' };
        }
        return { data };
    } catch (error) {
        errorMessage('Error al agregar el registro');
        return { error: true, message: 'Error al agregar el registro' };
    }
};
export const CreateFromObject = async (dtname, newData) => {
    const { error } = await supabase
        .from(dtname)
        .insert(newData)

    console.log(error)
    if (error) {
        errorMessage('Error al agregar el registro');
        return { error: true, message: 'Error al agregar el registro' };
    } else {
        successMessage('Registro agregado correctamente');
    }
    return { error: false, message: 'Registro agregado correctamente' };

}
export const CreateOrUpdateFromObjectUpsert = async (dtname, newData) => {
    const { error } = await supabase
        .from(dtname)
        .upsert(newData)

    console.log(error)
    if (error) {
        errorMessage('Error al agregar o actualizar el registro');
        return { error: true, message: 'Error al agregar o actualizar el registro' };
    } else {
        successMessage('Registro agregado o actualizado correctamente');
    }
    return { error: false, message: 'Registro agregado o actualizado correctamente' };
}
export const InsertIfNotExists = async (tableName, newData) => {
    console.log(newData)
    let omitidos = 0;
        let agregados = 0;
    for (const dataItem of newData) {
        const { data: existingData, error: fetchError } = await supabase
            .from(tableName)
            .select('*')
            .eq('codas', dataItem.codas);  // Utiliza 'dateas' en lugar de 'campoUnico'

        if (fetchError) {
            console.error('Error al verificar la existencia del dato:', fetchError);
            errorMessage('Error al verificar la existencia del dato');
            return { error: true, message: 'Error al verificar la existencia del dato' };
        }
        

        if (!(existingData && existingData.length > 0)) {
            // El dato no existe, realizar la inserción
            const { error: insertError } = await supabase
                .from(tableName)
                .upsert([dataItem]);

            if (insertError) {
                console.error('Error al insertar el dato:', insertError);
                errorMessage('Error al insertar el dato');
                return { error: true, message: 'Error al insertar el dato' };
            }

            agregados++;
        } else {
            // El dato ya existe, emitir un mensaje
            omitidos++;
        }

    }
    successMessage(`Proceso completado correctamente, ${agregados} registros agregados y ${omitidos} registros omitidos`);
    return { error: false, message: 'Proceso completado correctamente' };
};



