import TableSalidasSb from "../organism/tables/SalidasTabla";

const ExtraTime = ({ area, departament, subdepartament, rol }) => {
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
            <h1>ExtraTime</h1>

            <TableSalidasSb wheresb={querysb}></TableSalidasSb>
        </div>)
}
export default ExtraTime;