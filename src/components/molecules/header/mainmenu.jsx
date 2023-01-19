import { Link } from "react-router-dom";

const MainMenu = () => {
    return (
        <div className="w-full flex-end text-white">

        
        <ul className=" w-full flex ">
            <li className="p-5">
            <Link to="/">Home</Link>
            </li>
            <li className="p-5">
            <Link to="/store">Almacen</Link>
            </li>
            <li className="p-5">
            <Link to="/requests">Pedidos</Link>
            </li>
            <li className="p-5">
            <Link to="/profile">Perfil</Link>
            </li>
        </ul>
        </div>
    );
}
export default MainMenu;