import { Button } from "@material-tailwind/react";
import { useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UsersTable from "../organism/tables/UsersTables";
import NewUserModal from "../organism/modals/ModalNewUser";
import UserTableSb from "../organism/tables/UsersTableSb";

const Usuarios = () => {

    return (
        <div className="pagina">
            
            <div className="w-100 border-b-4  text-center">
                <h1 className="tittlepage">Gestion de usuarios</h1>
            </div>
            <div>
                <UserTableSb dbtable={"user"} dbsl1={"detaillocationzone"} dbsl2={"subdepartamentdetail"} titlearray={["Codigo","Apellidos","Nombres","dni","Genero","Sede","Subdepartamento","Estado"]} fieldarray={["cod","lastname","name","dni","gender","lcdtcod","sdptdtcod","state"]} selectname={["lcdtdesc","sdptdtdesc"]}></UserTableSb>
            </div>
            <div className="w-full">
                
            </div>
            

        </div>
    )

}
export default Usuarios;