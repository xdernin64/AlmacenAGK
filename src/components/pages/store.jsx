
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
            <h1 className="tittlepage">Articulos</h1>
            <Button
                variant="contained"
                className="m-2"
                onClick={openmodal}
            >
                Nuevo Articulo
            </Button>
            <NewArt open={open}
                close={() => setOpen(false)}
                customf={() => setRefreshtable(true)}
            />
            <div>

                <div id="tabla">
                    {!refreshtable ? (<Tabla table="Inventario" columnas="COD, NAME, UM, ARTICLE_DESC,URL"
                        tablecols={columnsarticle} customdel={delarticle}
                        customupd={updatearticle} colid="COD" modalcod="COD" order="NAME"
                        initstate={
                            {
                                showColumnFilters: false,
                                columnVisibility: { URL: false },
                                density: 'compact'
                            }
                        }
                    />):(<div>Actualizando tabla</div>)}


                </div>

            </div>
        </div>
    );
}
export default Store;
