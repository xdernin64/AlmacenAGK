
import { Button } from "@mui/material";
import { columnsarticle } from "../../helpers/colums/columns";
import { delarticle, updatearticle } from "../../helpers/CRUD/delarticle";
import Tabla from "../organism/inventario";
import NewArt from "../organism/modals/modalNewProduct";
import { useState } from "react";
import { useEffect } from "react";

const Store = () => {
    const [open, setOpen] = useState(false);
    const [refreshtable, setRefreshtable] = useState(false);

    useEffect(() => {
        setRefreshtable(false);
    }, [refreshtable])
    //funtion to rewrite  div tabla


    const openmodal = () => {
        setOpen(true);
    }
    return (
        <div className="pagina max-[770px]:mb-24">
            
        </div>
    );
}
export default Store;
