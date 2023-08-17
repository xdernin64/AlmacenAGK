import { Button } from "@material-tailwind/react";
import { useState } from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UsersTable from "../organism/tables/UsersTables";
import NewUserModal from "../organism/modals/ModalNewUser";

const Usuarios = () => {
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }

    return (
        <div className="pagina max-[770px]:mb-24">
            <NewUserModal open={open} close={() => setOpen(false) } tipo="add" />
            <div className="w-100 border-b-4  text-center">
                <h1 className="tittlepage">Gestion de usuarios</h1>
            </div>
            <div>
            <Button  className="text-gray-800 m-2 bg-gray-200 flex justify-end p-2" onClick={openmodal}> <GroupAddIcon></GroupAddIcon></Button>
            </div>
            <div className="w-full">
                <UsersTable></UsersTable>
            </div>
            

        </div>
    )

}
export default Usuarios;