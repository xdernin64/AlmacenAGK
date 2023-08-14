import React, { useState, useEffect } from 'react'
import { Accordion, AccordionBody, AccordionHeader, Button } from "@material-tailwind/react"

import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import ModalAddDetail from '../modals/ModalAddDetail';
import DetailTables from '../tables/DetailsTables';

const Gestion = () => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [detaillabels, setDetaillabels] = useState([]);
    const [detailnameprops, setDetailnameprops] = useState([]);
    const [detailtitle, setDetailtitle] = useState([]);
    const [dbname, setDbname] = useState([]);
    const [acordionopen, setAcordionopen] = useState(0);
    //////////////////////////////////////////////////////////////
    const handleediting = () => {
        setEditing(true);
        console.log(editing);
    }
    const openmodal = () => {
        setOpen(true);
    }
    useEffect(() => {
        console.log("Cambiando contenido del detalle para la sección:", acordionopen);
        console.log("El valor actual es:", editing);
        // Resto del código...
    }, [acordionopen]);
    useEffect(() => {
        if (acordionopen == 1) {
            setDetaillabels(["Codigo Ubicacion", "Nombre Ubicacion", "Descripcion Ubicacion"]);
            setDetailnameprops(["codubi", "nameubi", "descubi"]);
            setDetailtitle(" Ubicación");
            setDbname("ubicacion");
        }
        if (acordionopen == 2) {
            setDetaillabels(["Codigo Ocupacion", "Nombre Ocupacion", "Descripcion Ocupacion"]);
            setDetailnameprops(["codocu", "nameocu", "descocu"]);
            setDetailtitle(" Ocupación");
            setDbname("ocupacion");
        }
        if (acordionopen == 3) {
            setDetaillabels(["Codigo Labor", "Nombre Labor", "Descripcion Labor"]);
            setDetailnameprops(["codlab", "namelab", "desclab"]);
            setDetailtitle(" Labor");
            setDbname("labor");
        }
        if (acordionopen == 4) {
            setDetaillabels(["Codigo Centro de Coste", "Nombre Centro de Coste", "Descripcion Centro de Coste"]);
            setDetailnameprops(["codcc", "namecc", "desccc"]);
            setDetailtitle(" Centro de Coste");
            setDbname("centrocoste");
        }
    }, [acordionopen]);


    useEffect(() => {
        if (editing)
            openmodal();
    }, [editing]);

    //function to open and closed icon
    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }
    const AcordionData = () => {
        const handleOpen = (value) => setAcordionopen(acordionopen == value ? 0 : value);
        console.log("El valor actual es:", acordionopen);
        return (
            <>
                <Accordion open={acordionopen == 1} icon={<Icon id={1} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(1)}>
                        <div className='flex'>
                            Ubicaciones
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal()
                                }
                                className="text-red-500 text-xl"
                            /></div>
                    </AccordionHeader>
                    {acordionopen == 1 &&
                        <AccordionBody>
                            <div className='pl-5 pr-5'><DetailTables editing={handleediting} detailname={"ubicacion"} detailnameprops={["codubi", "nameubi", "descubi"]} /></div>
                        </AccordionBody>}
                </Accordion>

                <Accordion open={acordionopen == 2} icon={<Icon id={2} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        <div className='flex'>
                            Ocupación
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal()
                                }
                                className="text-red-500 text-xl"
                            />
                        </div>
                    </AccordionHeader>
                    {acordionopen == 2 && <AccordionBody>
                        <div className='pl-5 pr-5'><DetailTables editing={handleediting} detailname={"ocupacion"} detailnameprops={["codocu", "nameocu", "descocu"]} /></div>
                    </AccordionBody>}
                </Accordion>

                <Accordion open={acordionopen == 3} icon={<Icon id={3} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        <div>
                            Labor
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal()
                                }
                                className="text-red-500 text-xl"
                            />
                        </div>
                    </AccordionHeader>
                    {acordionopen == 3 && <AccordionBody>
                        <div className='pl-5 pr-5'><DetailTables editing={handleediting} detailname={"labor"} detailnameprops={["codlab", "namelab", "desclab"]} /></div>
                    </AccordionBody>}
                </Accordion>

                <Accordion open={acordionopen == 4} icon={<Icon id={4} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        <div>
                            Centros de coste
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal()
                                }
                                className="text-red-500 text-xl"
                            /></div>
                    </AccordionHeader>
                    {acordionopen == 4 && <AccordionBody>
                        <div className='pl-5 pr-5'><DetailTables editing={handleediting} detailname={"centrocoste"} detailnameprops={["codcc", "namecc", "desccc"]} /></div>
                    </AccordionBody>}
                </Accordion>
            </>
        );
    };

    return (
        <div>
            <ModalAddDetail
                open={open}
                close={() => {
                    setOpen(false);
                    setEditing(false);
                }}
                onEdit={editing}
                PropsLabels={detaillabels}
                NameProps={detailnameprops}
                Dtittle={detailtitle}
                dbname={dbname}
            />

            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold ">Gestion Detalles</h1>
            </div>
            <div className="parent-container max-w-full overflow-x-auto">
                <AcordionData></AcordionData>
            </div>
        </div>
    )

}

export default Gestion;