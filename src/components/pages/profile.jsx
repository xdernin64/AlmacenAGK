import { useEffect, useState } from "react";
import { Authstate, auth, logout } from "../../firebase";
import { checkUserAuthentication, logoutsupabase, supabase } from "../../supabaseClient";
import { supabaseAnonKey, supabaseUrl } from "../../constants/env";
import NewUserModal from "../organism/modals/ModalNewUser";
import { getcurrentuser } from "../../helpers/CRUD/READ/GetCurrentUser";
import { GetAuthDataUser } from "../../helpers/CRUD/READ/GetDataSb";

const Profile = () => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }

    useEffect(() => {
        GetAuthDataUser(checkUserAuthentication().user)
            .then((userData) => {
                setUser(userData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                // handle error
            });
    }, []);

    const renderUserData = () => {
        if (loading) {
            return <div className="text-center text-lg font-bold">Loading...</div>;
        }
        if (!user) {
            return <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openmodal}>Agregar Datos de perfil</button>;
        }
        return (
            <div>
                <div className="font-bold text-lg pt-2">Codigo:</div>
                <div className="border-b-4 border-blue-500 text-2xl m-3 text-blue-500 font-mono">{user.codigo}</div>
                <div className="font-bold text-lg pt-2">Nombres:</div>
                <div className="border-b-4 border-blue-500 text-2xl m-3 text-blue-500 font-mono">{user.apellidos + " " + user.nombres }</div>
                <div className="font-bold text-lg pt-2">Celular:</div>
                <div className="border-b-4 border-blue-500 text-2xl m-3 text-blue-500 font-mono">{user.numeroCelular}</div>
                <div className="font-bold text-lg pt-2">Labor:</div>
                <div className="border-b-4 border-blue-500 text-2xl m-3 text-blue-500 font-mono">{user.labor}</div>
                <div className="font-bold text-lg pt-2">Area:</div>
                <div className="border-b-4 border-blue-500 text-2xl m-3 text-blue-500 font-mono">{user.area}</div>
            </div>
        );
    };

    return (
        <div className="pagina">
            <NewUserModal open={open} close={() => setOpen(false)} />
            <h1 className="tittlepage">Perfil de usuario</h1>
            <div className="flex flex-row  max-[770px]:flex-col-reverse ">
                <div className="basis-1/2">
                    <div className="border bg-gray-100 max-[770px]:p-3 min-[770px]:p-14 border-blue-500 h-auto rounded-xl">
                        <h2 className="font-bold text-xl ocuro">Datos generales</h2>
                        <div className="datosp pt-4">{renderUserData()}</div>
                    </div>
                </div>
                <div className="basis-1/2">
                    <img className="border min-[770px]:ml-10" src="https://cdn-icons-png.flaticon.com/512/3126/3126177.png" alt="Icono del usuario" />
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={logoutsupabase} className="bg-red-500 m-10 text-xl max-[770px]:mb-24">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Profile;
