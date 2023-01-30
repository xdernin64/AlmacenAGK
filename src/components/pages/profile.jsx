import { useEffect } from "react";
import { Authstate } from "../../firebase";
import { getUser } from "../../supabaseClient";


const Profile = () => {
    //use effect when user data is loaded


    function usuario() {

        console.log(Authstate().uid);
        console.log(getUser(Authstate().uid));
    }
    return (
        <div className="pagina">
            <h1 className="tittlepage">Perfil de usuario</h1>
            <button className="text-black hidden" onClick={usuario}>Edit Profile</button>
            <div className="flex flex-row  max-[770px]:flex-col-reverse h-full">
                <div className="basis-1/2">
                    <div className="border-4 p-14 border-gdark  h-auto rounded-xl">
                        <h2 className="font-bold text-3xl ocuro">Datos generales</h2>
                        <div className="datosp pt-4">
                            <div className="font-bold text-lg pt-2">Codigo:</div>
                            <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono"> Codigo del usuario de area  </div>
                            <div className="font-bold text-lg pt-2">Nombres:</div>
                            <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono"> Nombre del usuario de area  </div>
                            <div className="font-bold text-lg pt-2">Celular:</div>
                            <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono"> Celular del usuario de area  </div>
                            <div className="font-bold text-lg pt-2">Labor:</div>
                            <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono"> Labor del usuario de area  </div>
                            <div className="font-bold text-lg pt-2">Area:</div>
                            <div className="border-b-4 border-gdark text-2xl m-3 text-gdark font-mono"> Area del usuario de area  </div>
                        </div>
                    </div>

                </div>
                <div className="basis-1/2">
                    <img className=" border-4 min-[770px]:ml-10 mt-8 " src="https://cdn-icons-png.flaticon.com/512/3126/3126177.png" alt="Icono del usuario" />

                </div>
            </div>

        </div>
    );
}
export default Profile;