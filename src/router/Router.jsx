import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error404 from "../components/pages/error404";
import App from "../components/templates/app";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import Profile from "../components/pages/profile";
import Store from "../components/pages/store";
import Orders from "../components/pages/orders";
import UserAreas from "../components/pages/UserAreas";
import UserInfoEdit from "../components/templates/UserInfo";
import UserInfo from "../components/templates/UserInfoDetail";
import Usuarios from "../components/pages/Usuarios";
import Detalles from "../components/pages/Detalles";
import Areas from "../components/pages/Areas";
import RegisterSb from "../components/pages/Registersb";

const Routers = ({ state, roleName }) => {
    return (
        <BrowserRouter>
            <App state={state} />
            <Routes>
                <Route
                    path="/home"
                    element={state ? <Home /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/asistencia"
                    element={state ? <Store /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/profile"
                    element={state ? <Profile /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/horas-extras"
                    element={state ? <Orders /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/login"
                    element={state ? <Navigate replace to="/" /> : <Login />}
                />
                {/* Restringir el acceso a la ruta /usuarios solo para usuarios con rol de administrador */}
                <Route
                    path="/users"
                    element={
                        state ? (
                            <Usuarios />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        state ? (
                            <RegisterSb />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route
                    path="/details"
                    element={
                        state && roleName=="ADMINISTRADOR" ? (<Detalles />):(<Navigate replace to="/home" />)
                    } />
                <Route
                    path="/areas"
                    element={
                        state && roleName=="ADMINISTRADOR" ? (<Areas />):(<Navigate replace to="/home" />)
                    } />
                
                {/* Rutas para usuarios */}
                <Route
                    path="/usuario/:userId"
                    element={state && roleName=="ADMINISTRADOR" ? <UserInfo /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/usuario/:userId/edit"
                    element={
                        state && roleName=="ADMINISTRADOR" ? <UserInfoEdit /> : <Navigate replace to="/login" />
                    }
                />

                <Route
                    path="/"
                    element={state ? <Home /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="*"
                    element={
                        state ? (
                            <Error404 />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
export default Routers;
