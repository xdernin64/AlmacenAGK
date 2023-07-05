import { useState } from "react";
import NewAreaModal from "../modals/ModalNewJob";
import { Button } from "@material-tailwind/react";
import AccordionTable from "../tables/AreasTables";

const Areas = () => {
    const [open, setOpen] = useState(false);
    const openmodal = () => {
        setOpen(true);
    }
    return (
        <div>
            <NewAreaModal open={open} close={() => setOpen(false)} />
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion de areas</h1>
            </div>
            <AccordionTable></AccordionTable>
            <div>
                <Button color="deep-purple" className="text-gray-800 m-2" onClick={openmodal}> agregar area</Button>
        </div>
        </div>
    )
}

export default Areas