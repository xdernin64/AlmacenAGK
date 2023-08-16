import { Button } from "@material-tailwind/react";
import NewUserModal from "../modals/ModalNewUser";
import { useState } from "react";
import UsersTable from "../tables/UsersTables";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Users = () => {
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }

    return (
        <div className="pagina max-[770px]:mb-24">
            <NewUserModal open={open} close={() => setOpen(false) } tipo="add" />
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion de usuarios</h1>
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
export default Users;