import { useEffect, useState } from "react";
import { Authstate, logout } from "../../firebase";
import { supabase } from "../../supabaseClient";
import { supabaseAnonKey, supabaseUrl } from "../../constants/env";
import NewUserModal from "../organism/modals/ModalNewUser";

const Profile = () => {
    const id = Authstate().uid;
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }	
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .from("Usuarios")
                    .select()
                    .eq("uid", id);

                if (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                    return;
                }

                setUser(data || []);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const renderUserData = () => {
        if (!user || user.length === 0) {
            return <button onClick={openmodal}>Crear Usuario</button>;

        }


        return (
            <div>
                
                {user.map((item, index) => (
                    <div key={index}>
                        <div className="font-bold text-lg pt-2">Codigo:</div>
                        <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono">{item.codigo}</div>
                        <div className="font-bold text-lg pt-2">Nombres:</div>
                        <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono">{item.apellidosynombres}</div>
                        <div className="font-bold text-lg pt-2">Celular:</div>
                        <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono">{item.celular}</div>
                        <div className="font-bold text-lg pt-2">Labor:</div>
                        <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono">{item.labor}</div>
                        <div className="font-bold text-lg pt-2">Area:</div>
                        <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono">{item.area}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="pagina">
            <NewUserModal open={open} close={()=> setOpen(false)}/>
            <h1 className="tittlepage">Perfil de usuario</h1>
            <div className="flex flex-row  max-[770px]:flex-col-reverse ">
                <div className="basis-1/2">
                    <div className="border-4 bg-gray-100 max-[770px]:p-3 min-[770px]:p-14 border-gdark  h-auto rounded-xl">
                        <h2 className="font-bold text-3xl ocuro">Datos generales</h2>
                        <div className="datosp pt-4">{renderUserData()}</div>
                    </div>
                </div>
                <div className="basis-1/2">
                    <img className="border-4 min-[770px]:ml-10" src="https://cdn-icons-png.flaticon.com/512/3126/3126177.png" alt="Icono del usuario" />
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={logout} className="bg-red-500 m-10 text-xl max-[770px]:mb-24">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Profile;
