export const getQuincena = () => {
    const day = new Date().getDate();
    if (day >= 25 || day <= 10) {
        return 1;
    } else {
        return 2;
    }
}
// Función para convertir fecha
export function convertirFecha(fechaString) {
    // Objeto con nombres de meses en español
    const meses = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
    ];
    // Parsea la fecha en formato "yyyy-mm-dd"
    const partesFecha = fechaString.split("-");
    const año = partesFecha[0];
    const mesNum = parseInt(partesFecha[1]);
    const dia = partesFecha[2];

    // Convierte el mes a su representación abreviada en español
    const mesAbreviado = meses[mesNum - 1];

    // Formatea la fecha en "dd mmm" en español
    const fechaFormateada = `${dia} ${mesAbreviado}`;

    return fechaFormateada;
}
export function countFaltasBySubdepartament(data) {
    const countBySubdepartament = {};

    data.forEach(item => {
        const subdepartamentName = item.subdepartamentdetail?.subdepartament?.subdepartamentname;
        const stateas = item.stateas;

        if (subdepartamentName && stateas === "FALTA") {
            countBySubdepartament[subdepartamentName] = (countBySubdepartament[subdepartamentName] || 0) + 1;
        }
    });

    const result = Object.entries(countBySubdepartament).map(([name, value]) => ({ name, value }));

    return result;
}
export function transformDataForRecharts(data, sdptdtcodFilter) {
    const filteredData = data.filter(item => {
        // Filtrar por sdptdtcod si sdptdtcodFilter no es nulo
        if (sdptdtcodFilter) {
            const sdptdtcod = item.sdptdtcod;
            return sdptdtcod === sdptdtcodFilter;
        }
        return true; // No aplicar filtro si sdptdtcodFilter es nulo
    });
    const result = filteredData.reduce((acc, item) => {
        const date = item.dateas;
        const stateas = item.stateas;
        if (stateas === "FALTA") {
            if (!acc[date]) {
                acc[date] = { name: date, uv: 0, pv: 0, amt: 0, missingPersons: [] };
            }
            acc[date].uv++;
            acc[date].missingPersons.push(item.user.name + " " + item.user.lastname); // Agregar nombre de la persona que falta
        }
        return acc;
    }, {});
    const sortedData = Object.values(result).sort((a, b) => {
        // Ordenar por fecha
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA - dateB;
    });

    return sortedData;
}
//count by state as 
export function countByStateAs(data, sdptdtcodFilter) {
    const filteredData = sdptdtcodFilter
        ? data.filter(item => item.sdptdtcod === sdptdtcodFilter)
        : data;
    const countByStateAs = {};
    filteredData.forEach(item => {
        const stateAs = item.stateas;
        if (stateAs) {
            countByStateAs[stateAs] = (countByStateAs[stateAs] || 0) + 1;
        }
    });
    const result = Object.entries(countByStateAs).map(([name, value]) => ({ name, value }));
    return result;
}
//DATA FOR BARCHAR 
export function transformDataForBarChart(data, x, values, sdptdtcodFilter) {
    const filteredData = data.filter(item => {
        // Filtrar por sdptdtcod si sdptdtcodFilter no es nulo
        if (sdptdtcodFilter) {
            const sdptdtcod = item.sdptdtcod;
            return sdptdtcod === sdptdtcodFilter;
        }
        return true; // No aplicar filtro si sdptdtcodFilter es nulo
    });
    const groupedData = {};
    filteredData.forEach(item => {
        const xValue = item[x];
        const value = item[values];
        if (xValue && value) {
            if (!groupedData[xValue]) {
                groupedData[xValue] = {};
            }
            // Asegúrate de que las categorías se formateen adecuadamente
            const category = value.replace(/\s+/g, ''); // Elimina espacios en blanco
            groupedData[xValue][category] = (groupedData[xValue][category] || 0) + 1;
        }
    });

    // Agrega categorías faltantes con un valor de 0
    const allCategories = ["ASISTENCIA", "FALTA", "DSO", "DXHA", "LICENCIA", "ASISTENCIA FERIADO", "DSO FERIADO"];
    Object.keys(groupedData).forEach(key => {
        allCategories.forEach(category => {
            if (groupedData[key][category] === undefined) {
                groupedData[key][category] = 0;
            }
        });
    });
    const transformedData = [];
    Object.keys(groupedData).forEach(key => {
        const entry = { date: key, ...groupedData[key] };
        transformedData.push(entry);
    });
    // Ordenar por fecha
    transformedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(transformedData);
    return transformedData;
}
export function hoursdata(data, subdepartamentname) {
    // Filtrar por subdepartamentname si subdepartamentname no es null
    const filteredData = subdepartamentname
        ? data.filter(item => item.sdptdtcod === subdepartamentname)
        : data;

    const userTotals = {};

    filteredData.forEach(item => {
        const userName = item.user.name + " " + item.user.lastname;
        const extratime25 = parseFloat(item.extratime25 || 0);
        const extratime35 = parseFloat(item.extratime35 || 0);
        const discounthours = parseFloat(item.discounthours || 0);

        if (!userTotals[userName]) {
            userTotals[userName] = {
                name: userName,
                totalHours: 0,
                extratime25: 0,
                extratime35: 0,
                doubletime: 0,
                discounthours: 0
            };
        }

        userTotals[userName].extratime25 += extratime25;
        userTotals[userName].extratime35 += extratime35;
        userTotals[userName].discounthours += discounthours;
        userTotals[userName].totalHours += extratime25 + extratime35 - discounthours;
        userTotals[userName].doubletime += parseFloat(item.doubletime || 0);

    });

    // Convertir el objeto en un arreglo
    const userTotalsArray = Object.values(userTotals);

    // Ordenar de mayor a menor según el total de horas
    userTotalsArray.sort((a, b) => b.totalHours - a.totalHours);

    return userTotalsArray;
}

export function convertirHoraEnDecimal(hora) {
    const [horas, minutos] = hora.split(":");
    return parseFloat(horas) + parseFloat(minutos) / 60;
}


export function flattenArray(arr) {
    const result = [];

    arr.forEach(item => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
            // If the item is an object and not an array, flatten it
            Object.keys(item).forEach(key => {
                result.push(item[key]);
            });
        } else {
            // If the item is not an object, push it directly to the result array
            result.push(item);
        }
    });

    return result;
}
export function sumarDias(fecha, dias) {
    // Convertir la fecha a un objeto Date
    const fechaObj = new Date(fecha);

    // Sumar o restar los días
    fechaObj.setDate(fechaObj.getDate() + dias);

    // Formatear la fecha a "yyyy-mm-dd"
    const fechaFormateada = fechaObj.getFullYear() + '-' + (fechaObj.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaObj.getDate().toString().padStart(2, '0');

    // Devolver la fecha formateada
    return fechaFormateada;
}
