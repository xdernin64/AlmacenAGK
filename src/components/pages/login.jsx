import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { redirect, useNavigate } from "react-router-dom";
import { checkUserAuthentication, signsupabase } from "../../supabaseClient";
import { updateregister } from "../../helpers/CRUD/CREATE/CREATESB";
import { errorMessage, successMessage } from "../../helpers/Alerts/alerts";

const Login = () => {
    const [error, setError] = useState();
    const nav = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        signsupabase(email, password);


    }
    return (
        <div className=" h-screen flex justify-center items-center">
            <div className="flex flex-col xl:flex-row">
                <div className="m-auto p-5">
                    <h1 className="text-center text-3xl font-mono text-sky-600 font-bold" onClick={checkUserAuthentication}>
                        ¡Bienvenido! <br></br> Inicia sesión para ingresar
                    </h1>
                    <div className="Imagen h-sc p-10 flex">
                        <img
                            src="https://www.buk.cl/hubfs/CL%20-%20Pillar%20Xtra%20-%20Control%20de%20Asistencia/Control%20de%20asistencia%20conceptos%20relevantes%20y%20beneficios.png"
                            alt="Asistencias Ohye "
                            className="max-h-60 md:max-h-96 lg:max-h-96"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-3">
                            <label htmlFor="user" className="text-slate-600 text-lg font-bold ">Usuario</label>
                            <input type="text" placeholder="Ingresar su codigo..." className="border-b-blue-400 border-b-4 unborded text-center loginp" name="email" id="email" />
                        </div>
                        <div className="p-3">
                            <label htmlFor="password" onClick={updateregister} className="text-slate-600 text-lg font-bold">Contraseña</label>
                            <input type="password" placeholder="Ingresar su contraseña..." className="border-b-blue-400 border-b-4 unborded text-center loginp" name="password" id="password" />
                        </div>

                        <div className="w-100 text-center">
                            <button className="bg-sky-700 m-5 text-xl text-bold text-center bg-cyan-800" type="submit">Iniciar sesión</button>
                        </div>
                        {error && <div className="w-100 text-center bg-red-200 text-red-700">Usuario y contraseña incorrectos</div>}
                    </form>
                </div>
            </div>
        </div>
    );


}
export default Login;