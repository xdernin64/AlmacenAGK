import { useState } from "react";

const AddAssistence = () => {
    const [userlist, setUserlist] = useState([]);
const [details ,    setDetails] = useState(
    {encargado: "",
    fecha: "",
    hora: "",
    labor: "",
    ubicacion: ""}
    )
    const handleInputChange = (event) => {
        setDetails({
            ...details,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="pagina">
            <h1 className="tittlepage" >Agegar Jornal</h1>
            <select className="m-2">
                <option value="1">Subarea1</option>
                <option value="2">Subarea2</option>
            </select>
            <form className="m-2 propiedades">
                <div className="flex mt-0.5">
                    <label className="content-center bg-blue-gray-900 text-gray-300 p-2 rounded-s-2xl w-32" htmlFor="encargado" >Encargado</label>
                    <input name="encargado" type="text" placeholder="Codigo" onChange={handleInputChange} /></div>
                <div className="flex mt-0.5">
                    <label className="content-center bg-blue-gray-900 text-gray-300 p-2 rounded-s-2xl w-32" htmlFor="fecha" >Fecha</label>
                    <input name="fecha" type="date" placeholder="Fecha" onChange={handleInputChange} />
                </div>
                <div className="flex mt-0.5">
                    <label className="content-center bg-blue-gray-900 text-gray-300 p-2 rounded-s-2xl w-32" htmlFor="hora" >Hora</label>
                    <input type="time" placeholder="Hora" name="hora" onChange={handleInputChange} /></div>
                <div className="flex mt-0.5">
                    <label className="content-center bg-blue-gray-900 text-gray-300 p-2 rounded-s-2xl w-32" htmlFor="labor" >Labor</label>
                    <input type="text" placeholder="Labor" name="labor" onChange={handleInputChange} />
                </div>
                <div className="flex mt-0.5">
                    <label className="content-center bg-blue-gray-900 text-gray-300 p-2 rounded-s-2xl w-32" htmlFor="ubicacion" >Ubicacion</label>
                    <input type="text" placeholder="Ubicacion" name="ubicacion" onChange={handleInputChange} /></div>
                <button className="bg-blue-800 m-2">Guardar</button>
            </form>
            <div>
                <form className="md:w-3/6 usuario">
                    <div className="flex">
                        <button className="bg-black hidden">Agregar por Qr</button>
                        <label className="content-center bg-green-900 text-gray-300 p-2 rounded-s-md " htmlFor="codigo" >Codigo</label>
                        <input type="text" />
                        <input type="submit" value="+" className="bg-green-800 w-10 text-white " />
                    </div></form>

            </div>
            <div className="overflow-auto">
                <table className="">
                    <thead>
                        <tr>
                            <th >Codigo</th>
                            <th >Nombre</th>
                            <th >Apellido</th>
                            <th >Labor</th>
                            <th >Hora</th>
                            <th >Fecha</th>
                            <th >Ubicacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userlist.length === 0 ? (
                            <tr className="text-center">
                                <td className="center" colSpan="100">No hay asistencias</td>
                            </tr>
                        ) : (
                            userlist.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.labor}</td>
                                    <td>{user.hour}</td>
                                    <td>{user.date}</td>
                                    <td>{user.ubication}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table></div>

            <button className="bg-blue-600">Agregar Jornales</button>

        </div>
    )
}
export default AddAssistence;