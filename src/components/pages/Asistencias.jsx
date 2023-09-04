import query from "devextreme/data/query"
import TableAsistenciaSb from "../organism/tables/AsistenciaTablaSb"

const AsistenciaSb = ({ area, departament, subdepartament, rol }) => {
    console.log("area", area, "departament", departament, "subdepartament", subdepartament, "rol", rol)
    let querysb = {};

    if (rol === "ADMINISTRADOR") {
        querysb = {};
    } else if (rol === "GERENTE") {
        querysb = {
            azdtcod: area
        };
    } else if (rol === "JEFE") {
        querysb = {
            dptdtcod: departament
        };
    } else {
        querysb = {
            sdptdtcod: subdepartament
        };
    }


    return (
        <div className="pagina">
            <h1 className="tittlepage">Asistencias</h1>
            <TableAsistenciaSb wheresb={querysb} ></TableAsistenciaSb>
        </div>
    )

}
export default AsistenciaSb;