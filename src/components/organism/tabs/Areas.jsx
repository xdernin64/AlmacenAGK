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
        <div className="">
            <NewAreaModal open={open} close={() => setOpen(false)} />
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion de Gerencias</h1>
            </div>
            <div className="parent-container max-w-full overflow-x-auto">
                <AccordionTable></AccordionTable></div>
            <div>
                <Button color="deep-purple" className="text-gray-800 m-2" onClick={openmodal}> Agregar Gerencias</Button>
            </div>
        </div>
    )
}

export default Areas