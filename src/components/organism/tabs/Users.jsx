import { Button } from "@material-tailwind/react";
import NewUserModal from "../modals/ModalNewUser";
import { useState } from "react";

const Users = () => {
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }

    return (
        <div>
            <NewUserModal open={open} close={() => setOpen(false) } tipo="add" />
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion de usuarios</h1>
            </div>
            <div>
            <Button color="deep-purple" className="text-gray-800 m-2" onClick={openmodal}> agregar usuario</Button>
            </div>

        </div>
    )

}
export default Users;