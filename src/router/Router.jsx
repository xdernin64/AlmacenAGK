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
import PrimaryDataPage from "../components/templates/PrimaryDataPages";
import DetailDataPages from "../components/templates/DetailDataPages";
import { dareazone, dceco, ddepartamentarea, dlocationzone, docupation, dsubdepartamentarea, dwork } from "../components/organism/tables/tableconfig/DetailTablesProps";

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
                    path="/zones"
                    element={state ? <PrimaryDataPage tittle={"Gestión de zonas"} dtname={"zone"} colsnames={[
                        { title: 'Codigo De Zona', field: 'zonecod', editable: 'onAdd' }, // Hacer editable al agregar
                        { title: 'Nombre De zona', field: 'zonename', editable: 'always' }, // Hacer editable siempre
                        { title: 'Descripcion de zona', field: 'zonedesc', editable: 'always' }, // Hacer editable siempre
                    ]} /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/areas"
                    element={state ? <PrimaryDataPage tittle={"Gestión de áreas"} dtname={"area"} colsnames={[
                        { title: 'Codigo De Area', field: 'areacod', editable: 'onAdd' }, // Hacer editable al agregar
                        { title: 'Nombre De Area', field: 'areaname', editable: 'always' }, // Hacer editable siempre
                        { title: 'Descripcion de Area', field: 'areadesc', editable: 'always' }, // Hacer editable siempre
                    ]} /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/locations"
                    element={state ? <PrimaryDataPage tittle={"Gestión de Sedes"} dtname={"location"} colsnames={[
                        { title: 'Codigo De Sede', field: 'locationcod', editable: 'onAdd' }, // Hacer editable al agregar
                        { title: 'Nombre De Sede', field: 'locationname', editable: 'always' }, // Hacer editable siempre
                        { title: 'Descripcion de Sede', field: 'locationdesc', editable: 'always' }, // Hacer editable siempre
                    ]} /> : <Navigate replace to="/login" />}
                />
                <Route
                path="/departaments"
                element={state ? <PrimaryDataPage tittle={"Gestión de Departamentos"} dtname={"departament"} colsnames={[
                    { title: 'Codigo De Departamento', field: 'departamentcod', editable: 'onAdd' }, // Hacer editable al agregar
                    { title: 'Nombre De Departamento', field: 'departamentname', editable: 'always' }, // Hacer editable siempre
                    { title: 'Descripcion de Departamento', field: 'departamentdesc', editable: 'always' }, // Hacer editable siempre
                ]} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/subdepartaments"
                element={state ? <PrimaryDataPage tittle={"Gestión de Sub-departamentos"} dtname={"subdepartament"} colsnames={[
                    { title: 'Codigo De Sub-departamento', field: 'subdepartamentcode', editable: 'onAdd' }, // Hacer editable al agregar
                    { title: 'Nombre De Sub-departamento', field: 'subdepartamentname', editable: 'always' }, // Hacer editable siempre
                    { title: 'Descripcion de Sub-departamento', field: 'subdepartamentdesc', editable: 'always' }, // Hacer editable siempre
                ]} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/occupations"
                element={state ? <PrimaryDataPage tittle={"Gestión de Ocupaciones"} dtname={"occupation"} colsnames={[
                    { title: 'Codigo De Ocupación', field: 'occupationcod', editable: 'onAdd' }, // Hacer editable al agregar
                    { title: 'Nombre De Ocupación', field: 'occupationname', editable: 'always' }, // Hacer editable siempre
                    { title: 'Descripcion de Ocupación', field: 'occupationdesc', editable: 'always' }, // Hacer editable siempre
                ]} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/works"
                element={state ? <PrimaryDataPage tittle={"Gestión de Labores"} dtname={"work"} colsnames={[
                    { title: 'Codigo De Labor', field: 'workcod', editable: 'onAdd' }, // Hacer editable al agregar
                    { title: 'Nombre De Labor', field: 'workname', editable: 'always' }, // Hacer editable siempre
                    { title: 'Descripcion de Labor', field: 'workdesc', editable: 'always' }, // Hacer editable siempre
                ]} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/cecos"
                element={state ? <PrimaryDataPage tittle={"Gestión de Centros de costo"} dtname={"ceco"} colsnames={[
                    { title: 'Codigo De Centro de costo', field: 'cecocod', editable: 'onAdd' }, // Hacer editable al agregar
                    { title: 'Nombre De Centro de costo', field: 'ceconame', editable: 'always' }, // Hacer editable siempre
                    { title: 'Descripcion de Centro de costo', field: 'cecodesc', editable: 'always' }, // Hacer editable siempre
                ]} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/zone-location"
                element={state ? <DetailDataPages config={dlocationzone} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/zone-area"
                element={state ? <DetailDataPages config={dareazone} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/area-departament"
                element={state ? <DetailDataPages config={ddepartamentarea} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/departament-subdepartament"
                element={state ? <DetailDataPages config={dsubdepartamentarea} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/subdepartament-occupation"
                element={state ? <DetailDataPages config={docupation} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/subdepartament-work"
                element={state ? <DetailDataPages config={dwork} /> : <Navigate replace to="/login" />}
            />
            <Route
                path="/subdepartament-ceco"
                element={state ? <DetailDataPages config={dceco} /> : <Navigate replace to="/login" />}
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
                        state && roleName == "ADMINISTRADOR" ? (<Detalles />) : (<Navigate replace to="/home" />)
                    } />
                <Route
                    path="/areas"
                    element={
                        state && roleName == "ADMINISTRADOR" ? (<Areas />) : (<Navigate replace to="/home" />)
                    } />

                {/* Rutas para usuarios */}
                <Route
                    path="/usuario/:userId"
                    element={state && roleName == "ADMINISTRADOR" ? <UserInfo /> : <Navigate replace to="/login" />}
                />
                <Route
                    path="/usuario/:userId/edit"
                    element={
                        state && roleName == "ADMINISTRADOR" ? <UserInfoEdit /> : <Navigate replace to="/login" />
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
