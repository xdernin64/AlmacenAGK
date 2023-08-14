import React, { useState } from 'react'
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
    const openmodal = (labels, nprops, title, dbname) => {
        setDetaillabels(labels);
        setDetailnameprops(nprops);
        setDetailtitle(title);
        setOpen(true);
        setDbname(dbname);

    }
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
        const [acordionopen, setAcordionopen] = useState(0);
        const handleOpen = (value) => setAcordionopen(acordionopen == value ? 0 : value);
        return (
            <>
                <Accordion open={acordionopen == 1} icon={<Icon id={1} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(1)}>
                        <div className="flex">
                            Ubicaciones
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal(
                                        ["Codigo Ubicacion", "Nombre Ubicacion", "Descripcion Ubicacion"],
                                        ["codubi", "nameubi", "descubi"],
                                        "Agregar Ubicacion", "ubicacion"
                                    )
                                }
                                className="text-red-500 text-xl"
                            />
                        </div>
                    </AccordionHeader>
                    {acordionopen == 1 &&
                        <AccordionBody>
                            <div className='pl-5 pr-5'><DetailTables detailname={"ubicacion"} detailnameprops={["codubi", "nameubi", "descubi"]} /></div>
                        </AccordionBody>}
                </Accordion>
                <Accordion open={acordionopen == 2} icon={<Icon id={2} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        <div>
                            Ocupación
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal(
                                        ["Codigo Ocupacion", "Nombre Ocupacion", "Descripcion Ocupacion"],
                                        ["codocu", "nameocu", "descocu"],
                                        "Agregar Ocupacion", "ocupacion"
                                    )
                                }
                                className="text-red-500 text-xl"
                            />
                        </div>
                    </AccordionHeader>
                    {acordionopen == 2 && <AccordionBody>
                            <div className='pl-5 pr-5'><DetailTables detailname={"ocupacion"} detailnameprops={["codocu", "nameocu", "descocu"]} /></div>
                        </AccordionBody>}
                </Accordion>
                <Accordion open={acordionopen == 3} icon={<Icon id={3} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        <div>
                            Labor
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal(
                                        ["Codigo Labor", "Nombre Labor", "Descripcion Labor"],
                                        ["codlab", "namelab", "desclab"],
                                        "Agregar Labor", "labor"
                                    )
                                }
                                className="text-red-500 text-xl"
                            />
                        </div>
                    </AccordionHeader>
                    {acordionopen == 3 && <AccordionBody>
                            <div className='pl-5 pr-5'><DetailTables detailname={"labor"} detailnameprops={["codlab", "namelab", "desclab"]} /></div>
                        </AccordionBody>}
                </Accordion>
                <Accordion open={acordionopen == 4} icon={<Icon id={4} open={acordionopen} />}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        <div>
                            Centros de coste
                            <PlaylistAddCircleIcon
                                onClick={() =>
                                    openmodal(
                                        ["Codigo Centro de Coste", "Nombre Centro de Coste", "Descripcion Centro de Coste"],
                                        ["codcc", "namecc", "desccc"],
                                        "Agregar Centro de Coste", "centrocoste"
                                    )
                                }
                                className="text-red-500 text-xl"
                            /></div>
                    </AccordionHeader>
                    {acordionopen == 4 && <AccordionBody>
                            <div className='pl-5 pr-5'><DetailTables detailname={"centrocoste"} detailnameprops={["codcc", "namecc", "desccc"]} /></div>
                        </AccordionBody>}
                </Accordion>
            </>
        );
    };



    return (
        <div>
            <ModalAddDetail open={open}
                close={() => {
                    setOpen(false)
                    setTimeout(() => {
                        setEditing(false);
                        setDetaillabels([]);
                        setDetailnameprops([]);
                        setDetailtitle([]);
                        setDbname([]);
                    }, 500);
                }

                } onEdit={false} PropsLabels={detaillabels} NameProps={detailnameprops} Dtittle={detailtitle} dbname={dbname} />

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