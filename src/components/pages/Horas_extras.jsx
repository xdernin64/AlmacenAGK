import TableSalidasSb from "../organism/tables/SalidasTabla";

const ExtraTime = ({ area, departament, subdepartament, rol }) => {
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
            <h1 className="tittlepage">Horas extras</h1>

            <TableSalidasSb wheresb={querysb} rol={rol}></TableSalidasSb>
        </div>)
}
export default ExtraTime;