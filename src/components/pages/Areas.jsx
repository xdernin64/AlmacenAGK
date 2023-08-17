import React, { useState, useEffect } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import DetailTables from '../organism/tables/DetailsTables';
import ModalAddDetail from '../organism/modals/ModalAddDetail';


const Areas = () => {
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [detailProps, setDetailProps] = useState([]);
    const [accordionOpen, setAccordionOpen] = useState(0);
    const detailData = [
        {
            id: 1,
            title: "Ubicación",
            labels: ["Codigo Ubicacion", "Nombre Ubicacion", "Descripcion Ubicacion"],
            nameProps: ["codubi", "nameubi", "descubi"],
            dbName: "ubicacion"
        },
        {
            id: 2,
            title: "Ocupación",
            labels: ["Codigo Ocupacion", "Nombre Ocupacion", "Descripcion Ocupacion"],
            nameProps: ["codocu", "nameocu", "descocu"],
            dbName: "ocupacion"
        },
        {
            id: 3,
            title: "Labor",
            labels: ["Codigo Labor", "Nombre Labor", "Descripcion Labor"],
            nameProps: ["codlab", "namelab", "desclab"],
            dbName: "labor"
        },
        {
            id: 4,
            title: "Centro de Coste",
            labels: ["Codigo Centro de Coste", "Nombre Centro de Coste", "Descripcion Centro de Coste"],
            nameProps: ["codcc", "namecc", "desccc"],
            dbName: "centrocoste"
        }
    ];

    const handleEditing = () => {
        setEditing(true);
    };

    const handleDetailProps = (props) => {
        // ... implement your logic here
        setDetailProps(props);
        console.log("Props recibidos:", props);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        console.log("Cambiando contenido del detalle para la sección:", accordionOpen);
        console.log("El valor actual es:", editing);
        // Resto del código...
    }, [accordionOpen]);

    useEffect(() => {
        if (editing) {
            handleOpenModal();
            handleDetailProps(detailProps);
        }
    }, [editing]);

    return (
        <div>
            <div className="w-100 border-b-4  text-center">
                <h1 className="text-2xl font-extrabold">Gestion Detalles</h1>
            </div>
            <div className="parent-container max-w-full overflow-x-auto">
                {detailData.map((detail) => (
                    <Accordion key={detail.id} open={accordionOpen === detail.id}>
                        <AccordionHeader onClick={() => setAccordionOpen(detail.id)}>
                            <div className='flex'>
                                {detail.title}
                                <PlaylistAddCircleIcon
                                    onClick={handleOpenModal}
                                    className="text-red-500 text-xl"
                                />
                            </div>
                        </AccordionHeader>
                        {accordionOpen === detail.id && (
                            <AccordionBody>
                                <div className='pl-5 pr-5'>
                                    <DetailTables
                                        props={handleDetailProps}
                                        editing={handleEditing}
                                        detailname={detail.dbName}
                                        detailnameprops={detail.nameProps}
                                    />
                                </div>
                            </AccordionBody>
                        )}
                    </Accordion>
                ))}
            </div>
            {/* Render your modal here */}
            {openModal && (
                <ModalAddDetail
                    opend={openModal}
                    close={() => {
                        setOpenModal(false);
                        setEditing(false);
                        setDetailProps([]);
                    }}
                    onEdit={editing}
                    PropsLabels={detailData[accordionOpen - 1].labels}
                    NameProps={detailData[accordionOpen - 1].nameProps}
                    Dtittle={detailData[accordionOpen - 1].title}
                    dbname={detailData[accordionOpen - 1].dbName}
                    Props={detailProps}
                />
            )}
        </div>
    );
};

export default Areas;
