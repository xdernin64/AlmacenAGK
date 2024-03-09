import { useState } from "react";
import { Switch, FormControlLabel, Chip } from "@mui/material";
import TableAsistenciaSb from "../organism/tables/AsistenciaTablaSb";
import RtAsistence from "./RtAsistence";
import { InfoRounded } from "@material-ui/icons";

import ReactDOMServer from 'react-dom/server';
import { infomeMessage } from "../../helpers/Alerts/alerts";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
function PopoverCustomAnimation() {
    return (
        <Popover
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
            placement="bottom"
        >
            <PopoverHandler>
                <Button  className="bg-transparent text-black border-none shadow-none p-0 m-0"><InfoRounded/></Button>
            </PopoverHandler>
            <PopoverContent className="bg-green-500 text-white">
                <div>
                <div className="w-full text-center font-bold">¡Nueva tabla de asistencias!</div> 
                <div>
                Ahora en tiempo Real y con calculadora de Horas extras. <br />
                para editar una asistencia solo debes hacer 
                <kbd className="ml-2 mr-2 p-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"> Ctrl + click </kbd>
                en la asistencia que deseas editar.</div> </div>
            </PopoverContent>
        </Popover>
    );
}
const AsistenciaSb = ({ area, departament, subdepartament, rol }) => {
    const [checked, setChecked] = useState(false);
    let querysb = {};

    if (rol === "ADMINISTRADOR") {
        querysb = {};
    } else if (rol === "GERENTE") {
        querysb = {
            azdtcod: area,
        };
    } else if (rol === "JEFE") {
        querysb = {
            dptdtcod: departament,
        };
    } else {
        querysb = {
            sdptdtcod: subdepartament,
        };
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    return (
        <div className="pagina">
            <h1 className="tittlepage">Asistencias</h1>
            <FormControlLabel
                sx={{ display: rol != "ADMINISTRADOR" && "none"}}
                control={
                    <Switch
                        
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                }
                label={
                    <div>
                        {checked ? <Chip label="New version" size="small" color="success" /> : <Chip label="New version" size="small"  sx={{backgroundColor:"gray", color:"#e3e3e3"}} /> }
                        

                    </div>
                }
            />
            

            <PopoverCustomAnimation />
            <>
                <Link to="/asistencia/import">
                    <button className="btn btn-primary bg-green-700">Importar excel</button>
                </Link>
            </>
            {checked ? <TableAsistenciaSb rol={rol} wheresb={querysb} /> : <RtAsistence rol={rol} wheresb={querysb} />  }

        </div>
    );
};

export default AsistenciaSb;