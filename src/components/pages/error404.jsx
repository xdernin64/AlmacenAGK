import { Link, NavLink } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="flex background404 bg-slate-800 p-10    ">
            <div className="m-auto text-center">
                <h1 className="text-6xl font-mono text-zinc-100">ERROR 404</h1>
                <img src="https://cdn1.iconfinder.com/data/icons/robotics-astute-vol-1/512/Broken_Robot-512.png" alt="Error404picture" />
                <h2 className="text-4xl font-mono text-zinc-300">Página no encontrada</h2>
                <div className="m-10 boton-regresar">   
                    <Link className="bg-slate-200 text-bold text-xl rounded-xl p-5" to={"/"}>Ir a la página principal</Link>
                </div>
                
            </div>
        </div>
    );
}
export default Error404; 