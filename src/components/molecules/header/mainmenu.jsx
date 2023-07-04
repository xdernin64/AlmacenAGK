
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaShippingFast, FaUserAlt } from 'react-icons/fa';
import { AiOutlineDropbox } from 'react-icons/ai';
import { Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
const MainMenu = () => {
    //get the local storage length and update the state
    return (
        <ul className="lista grid grid-flow-col text-white max-[770px]:grid-cols-5 justify-end w-full m-auto text-center text-lg font-bold   ">
            <NavLink to="/"><li className="option p-5 text-center m-auto">
                <FaHome className="icon" /> <span className="link">Inicio</span>
            </li>
            </NavLink>
            <NavLink to="/asistencia"><li className="option p-5">
                <FaBoxes className="icon" /> <span className="link">Asistencias</span>
            </li></NavLink>
            <NavLink to="/horas-extras"><li className="option p-5">
                <FaShippingFast className="icon" /> <span className="link">Horas extras</span>
            </li></NavLink>
            <NavLink to="/Usuarios"><li className="option p-5">
                <Badge variant="dot" color="warning">
                    <AiOutlineDropbox className="icon" /> <span className="link">Usuarios</span>
                </Badge>
            </li>
            </NavLink>
            <NavLink to="/profile"><li className="option p-5">
                <FaUserAlt className="icon" /> <span className="link">Perfil</span>
            </li></NavLink>
        </ul>
    );
}
export default MainMenu;