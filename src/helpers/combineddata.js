import { green, red, yellow, blue, grey, orange } from '@mui/material/colors';
import { convertirHoraEnDecimal } from '../components/charts/chartshelpers/functionhelpers';

export function mergeDatauseras(data, asistencia) {
    const asistenciaMap = {}; // Objeto de búsqueda para asistencia

    for (const item of asistencia) {
        asistenciaMap[item.cod] = item;
    }

    const result = [];

    for (const item of data) {
        const matchingAsistencia = asistenciaMap[item.cod] || null;

        const resultItem = {
            cod: item.cod,
            name: item.name,
            lastname: item.lastname,
            stateas: matchingAsistencia ? matchingAsistencia.stateas : '',
            intime: matchingAsistencia ? matchingAsistencia.intime : '',
            asdesc: matchingAsistencia ? matchingAsistencia.asdesc : '',
            lcdtcod: matchingAsistencia ? matchingAsistencia.lcdtcod : item.lcdtcod,
            sdptdtcod: matchingAsistencia ? matchingAsistencia.sdptdtcod : item.sdptdtcod,
            ocptdtcod: matchingAsistencia ? matchingAsistencia.ocptdtcod : item.ocptdtcod,
            wdtcod: matchingAsistencia ? matchingAsistencia.wdtcod : item.wdtcod,
            cecodtcod: matchingAsistencia ? matchingAsistencia.cecodtcod : item.cecodtcod
        };

        result.push(resultItem);
    }
    // Manejar elementos de asistencia que no tienen correspondencia en data
    for (const item of asistencia) {
        if (!data.some(d => d.cod === item.cod)) {
            const resultItem = {
                cod: item.cod,
                name: item.user.name,
                lastname: item.user.lastname,
                stateas: item.stateas,
                intime: item.intime,
                asdesc: item.asdesc,
                lcdtcod: item.lcdtcod,
                sdptdtcod: item.sdptdtcod,
                ocptdtcod: item.ocptdtcod,
                wdtcod: item.wdtcod,
                cecodtcod: item.cecodtcod
            };
            result.push(resultItem);
        }
    }
    
    return result;
}
//second 
export function mergeDatauseras2(data, asistencia) {
    const asistenciaMap = {}; // Objeto de búsqueda para asistencia

    for (const item of asistencia) {
        asistenciaMap[item.cod] = item;
    }

    const result = [];

    for (const item of data) {
        const matchingAsistencia = asistenciaMap[item.cod] || null;

        const resultItem = {
            cod: item.cod,
            name: item.name,
            lastname: item.lastname,
            jobtime: item.jobtime,
            stateas: matchingAsistencia ? matchingAsistencia.stateas : '',
            dateas: matchingAsistencia ? matchingAsistencia.dateas : '',
            codas: matchingAsistencia ? matchingAsistencia.codas : '',
            intime: matchingAsistencia ? matchingAsistencia.intime : '',
            outtime: matchingAsistencia ? matchingAsistencia.outtime : '',
            workinghours: matchingAsistencia ? matchingAsistencia.workinghours : '',
            extratime25: matchingAsistencia ? matchingAsistencia.extratime25 : '',
            extratime35: matchingAsistencia ? matchingAsistencia.extratime35 : '',
            doubletime: matchingAsistencia ? matchingAsistencia.doubletime : '',
            discounthours: matchingAsistencia ? matchingAsistencia.discounthours : '',
            asdesc: matchingAsistencia ? matchingAsistencia.asdesc : '',
            lcdtcod: matchingAsistencia ? matchingAsistencia.lcdtcod : item.lcdtcod,
            sdptdtcod: matchingAsistencia ? matchingAsistencia.sdptdtcod : item.sdptdtcod,
            ocptdtcod: matchingAsistencia ? matchingAsistencia.ocptdtcod : item.ocptdtcod,
            wdtcod: matchingAsistencia ? matchingAsistencia.wdtcod : item.wdtcod,
            cecodtcod: matchingAsistencia ? matchingAsistencia.cecodtcod : item.cecodtcod
        };

        result.push(resultItem);
    }
    // Manejar elementos de asistencia que no tienen correspondencia en data
    for (const item of asistencia) {
        if (!data.some(d => d.cod === item.cod)) {
            const resultItem = {
                cod: item.cod,
                codas: item.codas,
                name: item.user.name,
                lastname: item.user.lastname,
                dateas: item.dateas,
                stateas: item.stateas,
                intime: item.intime,
                outtime: item.outtime,
                jobtime: item.jobtime,
                workinghours: item.workinghours,
                extratime25: item.extratime25,
                extratime35: item.extratime35,
                doubletime: item.doubletime,
                discounthours: item.discounthours,
                asdesc: item.asdesc,
                lcdtcod: item.lcdtcod,
                sdptdtcod: item.sdptdtcod,
                ocptdtcod: item.ocptdtcod,
                wdtcod: item.wdtcod,
                cecodtcod: item.cecodtcod
            };
            result.push(resultItem);
        }
    }
    // Ordenar el array result por lastname
    result.sort((a, b) => a.lastname.localeCompare(b.lastname));
    
    return result;
}



export function mergeDatauserextra(data, asistencia) {
    const asistenciaMap = {}; // Objeto de búsqueda para asistencia

    for (const item of asistencia) {
        asistenciaMap[item.cod] = item;
    }

    const result = [];

    for (const item of data) {
        const matchingAsistencia = asistenciaMap[item.cod] || null;

        const resultItem = {
            cod: item.cod,
            name: item.name,
            lastname: item.lastname,
            stateas: matchingAsistencia ? matchingAsistencia.stateas : '',
            intime: matchingAsistencia ? matchingAsistencia.intime : '',
            outtime: matchingAsistencia ? matchingAsistencia.outtime : '',
            doubletime: matchingAsistencia ? matchingAsistencia.doubletime : '',
            asdesc: matchingAsistencia ? matchingAsistencia.asdesc : '',
            lcdtcod: matchingAsistencia ? matchingAsistencia.lcdtcod : item.lcdtcod,
            sdptdtcod: matchingAsistencia ? matchingAsistencia.sdptdtcod : item.sdptdtcod,
            ocptdtcod: matchingAsistencia ? matchingAsistencia.ocptdtcod : item.ocptdtcod,
            wdtcod: matchingAsistencia ? matchingAsistencia.wdtcod : item.wdtcod,
            cecodtcod: matchingAsistencia ? matchingAsistencia.cecodtcod : item.cecodtcod
        };

        result.push(resultItem);
    }
    // Manejar elementos de asistencia que no tienen correspondencia en data
    for (const item of asistencia) {
        if (!data.some(d => d.cod === item.cod)) {
            const resultItem = {
                cod: item.cod,
                name: item.user.name,
                lastname: item.user.lastname,
                stateas: item.stateas,
                intime: item.intime,
                dateas: item.dateas,
                outtime: item.outtime,
                workinghours: item.workinghours,
                extratime25: item.extratime25,
                extratime35: item.extratime35,
                doubletime: item.doubletime,
                discounthours: item.discounthours,
                asdesc: item.asdesc,
                lcdtcod: item.lcdtcod,
                sdptdtcod: item.sdptdtcod,
                ocptdtcod: item.ocptdtcod,
                wdtcod: item.wdtcod,
                cecodtcod: item.cecodtcod,
            };
            result.push(resultItem);
        }
    }

    return result;
}
export const getStatusBackgroundColor = (status) => {
    switch (status) {
        case 'ASISTENCIA':
            return green[500];
        case 'ASISTENCIA FERIADO':
            return green[900];
        case 'DSO':
            return yellow[600];
        case 'DSO FERIADO':
            return yellow[300];
        case 'DXHA':
            return orange[700];
        case 'LICENCIA':
            return blue[100];

        case 'FALTA':
            return red[900];
        default:
            return 'inherit'; // Color predeterminado
    }
};
export const getStatusColor = (status) => {
    switch (status) {
        case 'ASISTENCIA':
            return grey[100];
        case 'ASISTENCIA FERIADO':
            return grey[100];
        case 'DSO':
            return grey[900];
        case 'DXHA':
            return grey[100];
        case 'LICENCIA':
            return grey[800];
        case 'FALTA':
            return grey[100];
        default:
            return grey[500]; // Color predeterminado
    }
}

export function getPropertyByIdAndPropName(data, idValue, idPropName, propName) {
    const item = data.find(item => item[idPropName] === idValue);
    return item ? item[propName] : null;
}
function getMatchingValue(dataArray, resultKey, searchKey1, searchValue1, searchKey2, searchValue2) {
    const match = dataArray.find(item => item[searchKey1] === searchValue1 && item[searchKey2] === searchValue2);
    return match ? match[resultKey] : null;
}
export function getMatchingValue2(dataArray, resultKey, searchKey, searchValue) {
    
    const match = dataArray.find(item => item[searchKey] === searchValue);
    console.log(match[resultKey]);
    return match ? match[resultKey] : "";
}
function ifmatchingexist(dataArray, resultKey, searchKey, searchValue) {
    const match = dataArray.find(item => item[searchKey] === searchValue);
    return match ? match[resultKey] : null;
}
function calculatehours(intime, outtime, stateas, jobtime) {
    let extratime25, extratime35, doubletime, workinghours, discounthours, intimecor, outtimecor;
    intimecor = intime;
    outtimecor = outtime;
   

    if (stateas == 'ASISTENCIA') {
        doubletime = 0;
        discounthours = 0;


        if (jobtime == 'OFICINA') {

            //if intime or outtime is null then do nothing (why
            if (intime == '00:00' & outtime == '00:00') {
                intimecor = '06:00';
                outtimecor = '14:45';
            } else if (intime == '18:00') {
                workinghours = 8;
                extratime25 = 2;
                extratime35 = 1.25;
            } else {
                if (convertirHoraEnDecimal(outtime) <= 15.5) {
                    workinghours = 8;
                    extratime25 = 0;
                    extratime35 = 0;

                } else if (convertirHoraEnDecimal(outtime) > 15.5) {
                    workinghours = 8;
                    if (convertirHoraEnDecimal(outtime) - 15.5 > 2) {
                        extratime25 = parseFloat((2).toFixed(2))
                        extratime35 = parseFloat((convertirHoraEnDecimal(outtime) - 15.5 - 2).toFixed(2))
                    } else {
                        extratime25 = parseFloat((convertirHoraEnDecimal(outtime) - 15.5).toFixed(2))
                        extratime35 = 0
                    }
                }
            }
        } else {


            if (intime == '00:00' & outtime == '00:00') {
                intime = '06:00';
                outtime = '14:45';

            } else if (intime == '18:00') {
                workinghours = 8;
                extratime25 = 2;
                extratime35 = 1.25;

            } else {
                if (convertirHoraEnDecimal(outtime) <= 14.75) {
                    workinghours = 8;
                    extratime25 = 0;
                    extratime35 = 0;

                } else if (convertirHoraEnDecimal(outtime) > 14.75) {

                    workinghours = 8;
                    if (convertirHoraEnDecimal(outtime) - 14.75 > 2) {
                        extratime25 = parseFloat((2).toFixed(2))
                        extratime35 = parseFloat((convertirHoraEnDecimal(outtime) - 14.75 - 2).toFixed(2))
                    } else {
                        extratime25 = parseFloat((convertirHoraEnDecimal(outtime) - 14.75).toFixed(2))
                        extratime35 = 0
                    }
                }
            }
        }
    } else if (stateas == 'ASISTENCIA FERIADO') {
        workinghours = 0;
        extratime25 = 0;
        extratime35 = 0;
        discounthours = 0;

        if (jobtime == 'OFICINA') {
            if (intime == '00:00' & outtime == '00:00') {
                intimecor = '06:00';
                outtimecor = '14:45';
            } else if (intime == '18:00') {
                doubletime = 11.25;
            } else {
                if (convertirHoraEnDecimal(outtime) <= 15.5) {
                    doubletime = parseFloat((8).toFixed(2));
                } else {
                    doubletime = parseFloat((convertirHoraEnDecimal(outtime) - 15.5 + 8).toFixed(2));
                }
            }
        } else {
            if (intime == '00:00' & outtime == '00:00') {
                intimecor = '06:00';
                outtimecor = '14:45';
            } else if (intime == '18:00') {
                doubletime = 11.25;
            } else {
                doubletime = parseFloat((convertirHoraEnDecimal(outtime) - convertirHoraEnDecimal(intime) - 0.75).toFixed(2));
            }
        }
    } else if (stateas == 'DXHA') {
        workinghours = 0;
        extratime25 = 0;
        extratime35 = 0;
        doubletime = 0;
        discounthours = parseFloat((8).toFixed(2));
        intimecor = '00:00';
        outtimecor = '00:00';
        //i want to set inputs insde the class controlhoras disabled
        //add class in the div controlhoras



    } else {
        workinghours = 0;
        extratime25 = 0;
        extratime35 = 0;
        doubletime = 0;
        discounthours = 0;
        intimecor = '00:00';
        outtimecor = '00:00';
    }
    return { workinghours, extratime25, extratime35, doubletime, discounthours, intimecor, outtimecor };


}
export function getifexist(dataArray, searchKey, searchValue) {
    const match = dataArray.find(item => item[searchKey] === searchValue);

    const style = match ? 'bg-green-800 text-gray-100' : 'bg-red-800 text-gray-100';
    const state = Boolean(match);

    return [style, state];
}



export function getifexisttwo(dataArray, searchKey1, searchValue1, searchKey2, searchValue2) {
    // Busca en el array 'dataArray' un objeto donde el valor de la clave 'searchKey1' sea igual a 'searchValue1'
    // y el valor de la clave 'searchKey2' sea igual a 'searchValue2'
    const match = dataArray.find(item => item[searchKey1] === searchValue1 && item[searchKey2] === searchValue2);

    // Si 'match' es verdadero (es decir, se encontró una coincidencia), retorna 'bg-green-800'
    // Si 'match' es falso (es decir, no se encontró una coincidencia), retorna 'bg-red-800'
    return match ? 'bg-green-800 text-gray-100' : 'bg-red-800 text-gray-100';
}


export function transformData(sdptdtcod, exceldata, userdata, occupationdata, workdata, cecodata) {
    const { workinghours, extratime25, extratime35, doubletime, discounthours, intimecor, outtimecor } = calculatehours(exceldata.intime, exceldata.outtime, exceldata.ESTADO, getMatchingValue2(userdata, "jobtime", "cod", exceldata.cod));


    const assistencedata = {
        "codas": exceldata.cod + exceldata.date,
        "cod": exceldata.cod,
        "dateas": exceldata.date,
        "sdptdtcod": sdptdtcod,
        'lcdtcod': exceldata.lcdtcod,
        "ocptdtcod": getMatchingValue(occupationdata, "ocptdtcod", "occupationcod", exceldata.occupationcod, "sdptdtcod", sdptdtcod),
        "cecodtcod": getMatchingValue(cecodata, "cecodtcod", "cecocod", exceldata.cecocod, "sdptdtcod", sdptdtcod),
        "stateas": exceldata.ESTADO,
        "intime": intimecor,
        "outtime": outtimecor,
        "asdesc": "",
        "wdtcod": getMatchingValue(workdata, "wdtcod", "workcod", exceldata["workcod"], "sdptdtcod", sdptdtcod),
        "extratime25": extratime25,
        "doubletime": doubletime,  
        "extratime35": extratime35,
        "workinghours": workinghours,
        "discounthours": discounthours,
        "asdesc":exceldata.NOTA,
        "jobtime": getMatchingValue2(userdata, "jobtime", "cod", exceldata.cod)
    };

    return assistencedata;
}

