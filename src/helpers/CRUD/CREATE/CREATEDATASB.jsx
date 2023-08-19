import { supabase } from "../../../supabaseClient";

export const createauthuser = async (id,email,props) => {
    const { error } = await supabase
    .from('auth_users')
    .insert({ id: id, email: email,cod:props.cod,cargo:props.cargo, name: props.name, lastname: props.lastname, rol: props.rol })
    if (error) {
        console.log(error)
    }
    else {
        console.log("user created")
    }
};
export const createuser = async (props,id) => {
    const {error} = await supabase
    .from('users')
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


