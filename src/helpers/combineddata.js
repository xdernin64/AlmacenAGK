import { green, red, yellow, blue, grey,orange } from '@mui/material/colors';

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
            jobtime: item.jobtime ,
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
                stateas: item.stateas,
                intime: item.intime,
                outtime: item.outtime,
                jobtime: item.jobtime,
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
            return 'inherit'; // Color predeterminado
    }
}