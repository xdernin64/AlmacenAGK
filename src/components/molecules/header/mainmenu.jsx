
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBoxes, FaShippingFast, FaUserAlt } from 'react-icons/fa';
import { AiOutlineDropbox } from 'react-icons/ai';
const MainMenu = () => {
    return (

        <ul className="lista w-full text-white flex justify-end text-lg font-bold   ">
            <NavLink to="/"><li className="option p-5">
                <FaHome className="icon" /> <span className="link">Home</span>
            </li></NavLink>
            <NavLink to="/stocks"><li className="option p-5">
                <FaBoxes className="icon" /> <span className="link">Almacen</span>
            </li></NavLink>
            <NavLink to="/orders"><li className="option p-5">
                <FaShippingFast className="icon" /> <span className="link">Pedidos</span>
            </li></NavLink>
            <NavLink to="/profile"><li className="option p-5">
                <FaUserAlt className="icon" /> <span className="link">Perfil</span>
            </li></NavLink>
            <NavLink to="/pre-order"><li className="option p-5">
                    <AiOutlineDropbox className="icon" /> <span className="link">Pre-Orden</span>
                </li>
                </NavLink>
        </ul>
    );
}
export default MainMenu;