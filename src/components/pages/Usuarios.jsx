import { Button } from "@material-tailwind/react";
import { useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UsersTable from "../organism/tables/UsersTables";
import NewUserModal from "../organism/modals/ModalNewUser";
import UserTableSb from "../organism/tables/UsersTableSb";

const Usuarios = ({ area, departament, subdepartament, rol }) => {
    console.log("area", area, "departament", departament, "subdepartament", subdepartament, "rol", rol)
    let querysb = {};

    if (rol === "ADMINISTRADOR") {
        querysb = {};
    } else if (rol === "GERENTE") {
        querysb = {
            azdtcod: area
        };
    } else if (rol === "JEFE") {
        querysb = {
            dptdtcod: departament
        };
    } else {
        querysb = {
            sdptdtcod: subdepartament
        };
    }
    return (
        <div className="pagina">

            <div className="w-100 border-b-4  text-center">
                <h1 className="tittlepage">Gestion de usuarios</h1>
            </div>
            <div>
                <UserTableSb rol={rol} wheresb={querysb} dbtable={"user"} dbsl1={"detaillocationzone"} dbsl2={"subdepartamentdetail"} titlearray={["Codigo", "Apellidos", "Nombres", "dni", "Genero", "Tipo de horario", "Sede", "Subdepartamento", "Estado"]} fieldarray={["cod", "lastname", "name", "dni", "gender", "jobtime", "lcdtcod", "sdptdtcod", "state"]} selectname={["lcdtdesc", "sdptdtdesc"]}></UserTableSb>
            </div>
            <div className="w-full">

            </div>


        </div>
    )

}
export default Usuarios;