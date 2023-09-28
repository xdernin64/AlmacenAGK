export const dlocationzone = {
    tittle: "Asignacion de Sedes por zona",
    dbtable: "detaillocationzone",
    dbsl1: "zone",
    dbsl2: "location",
    titlearray: ["Codigo de Asignacion","Codigo zona", "Codigo Sede",  "Descipcion asignacion"],
    fieldarray: ["lcdtcod","zonecod", "locationcod", "lcdtdesc"],
    selectname: [ "zonename","locationname"]
};
export const dareazone = {
    tittle: "Asignacion de Gerencias por zona",
    dbtable: "detailareazone",
    dbsl1: "zone",
    dbsl2: "area",
    titlearray: ["Codigo de Asignacion","Codigo zona", "Codigo Gerencia",  "Descipcion asignacion"],
    fieldarray: ["azcod","zonecod", "areacod", "azdesc"],
    selectname: [ "zonename","areaname"]
};
export const ddepartamentarea = {
    tittle: "Asignacion de Áreas por Gerencia",
    dbtable: "departamentdetail",
    dbsl1: "detailareazone",
    dbsl2: "departament",
    titlearray: ["Codigo de Asignacion","Codigo Gerencia", "Codigo Área",  "Descipcion asignacion"],
    fieldarray: ["dptdtcod","azcod", "departamentcod", "dptdtdesc"],
    selectname: [ "azdesc","departamentname"]
};
export const dsubdepartamentarea = {
    tittle: "Asignacion de Sub-Áreas por Áreas",
    dbtable: "subdepartamentdetail",
    dbsl1: "departamentdetail",
    dbsl2: "subdepartament",
    titlearray: ["Codigo de Asignacion","Codigo Área", "Codigo Sub-Áreas",  "Descipcion asignacion"],
    fieldarray: ["sdptdtcod","dptdtcod", "subdepartamentcode", "sdptdtdesc"],
    selectname: [ "dptdtdesc","subdepartamentname"]
};
export const docupation = {
    tittle: "Asignacion de Ocupaciones por Sub-Áreas",
    dbtable: "occupationdetail",
    dbsl1: "subdepartamentdetail",
    dbsl2: "occupation",
    titlearray: ["Codigo de Asignacion","Codigo Sub-Áreas", "Codigo ocupacion",  "Descipcion asignacion"],
    fieldarray: ["ocptdtcod","sdptdtcod", "occupationcod", "ocptdtdesc"],
    selectname: [ "sdptdtdesc","occupationname"]
};
export const dwork = {
    tittle: "Asignacion de labores por Sub-Áreas",
    dbtable: "workdetail",
    dbsl1: "subdepartamentdetail",
    dbsl2: "work",
    titlearray: ["Codigo de Asignacion","Codigo Sub-Área", "Codigo labor",  "Descipcion asignacion"],
    fieldarray: ["wdtcod","sdptdtcod", "workcod", "wdtdesc"],
    selectname: [ "sdptdtdesc","workname"]
};
export const dceco = {
    tittle: "Asignacion de Cecos por Sub-Área",
    dbtable: "cecodetail",
    dbsl1: "subdepartamentdetail",
    dbsl2: "ceco",
    titlearray: ["Codigo de Asignacion","Codigo Sub-Área", "Codigo ceco",  "Descipcion asignacion"],
    fieldarray: ["cecodtcod","sdptdtcod", "cecocod", "cecodtdesc"],
    selectname: [ "sdptdtdesc","ceconame"]
};

