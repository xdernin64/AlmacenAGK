
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaShippingFast, FaUserAlt } from 'react-icons/fa';
import { AiOutlineDropbox } from 'react-icons/ai';
import { Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
const DeskMenu = () => {
    //get the local storage length and update the state
    return (
        <ul className="grid grid-flow-col text-white justify-end w-full m-auto text-center text-lg font-bold   ">
            <NavLink to="/"><li className="option p-5 text-center m-auto">
                <span className="link">Inicio</span>
            </li>
            </NavLink>
            <NavLink to="/asistencia"><li className="option p-5">
                <span className="link">Asistencias</span>
            </li></NavLink>
            <NavLink to="/horas-extras"><li className="option p-5">
                <span className="link">Horas extras</span>
            </li></NavLink>
            <NavLink to="/Usuarios"><li className="option p-5">
                <Badge variant="dot" color="warning">
                <span className="link">Usuarios</span>
                </Badge>
            </li>
            </NavLink>
            <NavLink to="/profile"><li className="option p-5">
                <span className="link">Perfil</span>
            </li></NavLink>
        </ul>
    );
}
export default DeskMenu;