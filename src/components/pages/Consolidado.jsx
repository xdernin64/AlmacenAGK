import ConsolidadoTable from "../organism/tables/ConsolidadoTable";

const Consolidado = ({ area, departament, subdepartament, rol })=>{
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
            <h1 className="tittlepage">Consolidado</h1>
            <ConsolidadoTable wheresb={querysb}></ConsolidadoTable>
        </div>
    )

}
export default Consolidado;