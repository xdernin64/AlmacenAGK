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
