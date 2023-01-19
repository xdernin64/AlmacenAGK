import { Link } from "react-router-dom";

const MainMenu = () => {
    return (
        <div className=" w-full flex flex-row">
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/store">Almacen</Link>
            </li>
            <li>
            <Link to="/requests">Pedidos</Link>
            </li>
            <li>
            <Link to="/profile">Perfil</Link>
            </li>
        </ul>
        </div>
    );
}
export default MainMenu;