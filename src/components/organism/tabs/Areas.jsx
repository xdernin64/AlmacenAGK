import { useState } from "react";
import NewAreaModal from "../modals/ModalNewArea";
import { Button } from "@material-tailwind/react";
import AccordionTable from "../tables/AreasTables";
import { useEffect } from "react";

const Areas = (

) => {
    const [modif, setModif] = useState(false);
    const [areaprops, setAreaprops] = useState([]);
    const [open, setOpen] = useState(false);
    const handleModif = () => {
        setModif(true);
    }
    const handleprops = (props) => {
        setAreaprops(props);
    }
    const openmodal = () => {
        setOpen(true);
    }
    useEffect(() => {
        console.log("El valor actual es:", modif);
        if (modif)
            openmodal();
    }, [modif]);
    useEffect(() => {
        console.log("El valor actual es:", areaprops);
    }, [areaprops]);

    return (
        <div className="">
            <NewAreaModal open={open} close={() => {
                setTimeout(() => {
                    setModif(false);
                    setAreaprops([]);
                }, 100);
                setOpen(false)

            }} editing={modif}  propdata={areaprops}/>
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion de Gerencias</h1>
            </div>
            <div className="parent-container max-w-full overflow-x-auto">
                <AccordionTable modif={handleModif} aprops={handleprops} ></AccordionTable></div>
            <div>
                <Button color="deep-purple" className="text-gray-800 m-2" onClick={openmodal} > Agregar Gerencias</Button>
            </div>
        </div>
    )
}

export default Areas