
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaShippingFast, FaUserAlt,FaBuilding } from 'react-icons/fa';
import { AiOutlineDropbox } from 'react-icons/ai';
import { Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import StyleIcon from '@mui/icons-material/Style';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

export function MenuDefault() {
    return (
        <div className='option p-5'>

            <Menu >
                <MenuHandler>
                    <div><FaBuilding className="icon" />
                    <div className="cursor-pointer link"> Gestionar </div></div>
                </MenuHandler>
                <MenuList className="bg-blue-gray-800 ">
                    <MenuItem><NavLink to="/users">Usuarios</NavLink></MenuItem>
                    <MenuItem><NavLink to="/details">Detalles</NavLink></MenuItem>
                    <MenuItem><NavLink to="/areas">Gerencias</NavLink></MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
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
            </li></NavLink><ul>
                <MenuDefault></MenuDefault>
            </ul>
            <NavLink to="/register"><li className="option p-5">
                <FaUserAlt className="icon" /> <span className="link">Registrar</span>
            </li></NavLink>
            <NavLink to="/profile"><li className="option p-5">
                <FaUserAlt className="icon" /> <span className="link">Perfil</span>
            </li></NavLink>
        </ul>
    );
}
export default MainMenu;