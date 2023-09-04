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
        const password =  e.target.password.value;

        
        signsupabase(email, password);

        
    }
    return (
        <div className="max-h-full max-w-full">

            <div className="flex h-screen flex-col  xl:flex-row">
                <div className="m-auto p-5">
                    <h1 className="text-center text-3xl font-mono text-sky-600 font-bold" onClick={checkUserAuthentication}>¡Bienvenido! <br></br> Inicia sesión para ingresar</h1>
                    <div className="Imagen h-sc p-10 flex">
                        <img src="https://www.albaibs.es/wp-content/uploads/2020/08/dibujo-almacen-movilidad.png" alt="Alamcen Calidad de agua " />
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
                            <button className="bg-sky-700 m-5 text-xl text-bold text-center" type="submit">Iniciar sesión</button>
                        </div>
                        {error && <div className="w-100 text-center bg-red-200 text-red-700">Usuario y contraseña incorrectos</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;