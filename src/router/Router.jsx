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

const Routers = ({ state }) => {
    return (

        <BrowserRouter>
            <App state={state} />
            <Routes>

                <Route path="/home" element={state ? (<Home />) : (<Navigate replace to="/login" />)} />
                <Route path="/asistencia" element={state ? (<Store />) : (<Navigate replace to="/login" />)} />
                <Route path="/profile" element={state ? (<Profile />) : (<Navigate replace to="/login" />)} />
                <Route path="/horas-extras" element={state ? (<Orders />) : (<Navigate replace to="/login" />)} />
                <Route path="/login" element={state ? (<Navigate replace to="/" />) : (<Login />)} />
                <Route path="/usuarios" element={state ? (<UserAreas />) : (<Navigate replace to="/login" />)} />
                {/* Rutas para usuarios */}
                <Route path="/usuario/:userId" element={state ? (<UserInfo />) : (<Navigate replace to="/login" />)} />
                <Route path="/usuario/:userId/edit" element={state ? (<UserInfoEdit />) : (<Navigate replace to="/login" />)} />
                

                <Route path="/" element={state ? (<Home />) : (<Navigate replace to="/login" />)} />
                <Route path="*" element={state ? (<Error404 />) : (<Navigate replace to="/login" />)} />
            </Routes>

        </BrowserRouter>

    )
}
export default Routers;