import { NavLink } from "react-router-dom";

const QrAistence = ({ area, departament, subdepartament, rol }) => {
    return (
        <div>
        <h1>QrAsistence</h1>
        <NavLink to="/addjornales">Agregar Asistencia</NavLink>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nombre</td>
                    <td>Fecha</td>
                    <td>Hora</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        </div>
    );
}
export default QrAistence;