
const Login = () => {
    return (
        <div className="max-h-full max-w-full">
            
            <div className="flex h-screen flex-col  xl:flex-row">
                <div className="m-auto p-5">
                    <h1 className="text-center text-3xl font-mono text-sky-600 font-bold">¡Bienvenido! <br></br> Inicia sesión para ingresar</h1>
                    <div className="Imagen h-sc p-10 flex">
                        <img src="https://www.albaibs.es/wp-content/uploads/2020/08/dibujo-almacen-movilidad.png" alt="Alamcen Calidad de agua " />
                    </div>
                    <form>
                        <div className="p-3">
                            <label htmlFor="user" className="text-slate-600 text-lg font-bold">Usuario</label>
                            <input type="text" className="border-b-blue-400 border-b-4 unborded" name="user" id="user" />
                        </div>
                        <div className="p-3">
                            <label htmlFor="password" className="text-slate-600 text-lg font-bold">Contraseña</label>
                            <input type="password" className="border-b-blue-400 border-b-4 unborded" name="password" id="password" />
                        </div>

                        <div className="w-100 text-center">
                            <button className="bg-sky-700 m-5 text-xl text-bold text-center" type="submit">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;