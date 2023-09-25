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
export function transformDataForRecharts(data) {
    const result = data.reduce((acc, item) => {
        const date = item.dateas;
        const subdepartamentName = item.subdepartamentdetail?.subdepartament?.subdepartamentname;
        const stateas = item.stateas;

        if (subdepartamentName && stateas === "FALTA") {
            if (!acc[date]) {
                acc[date] = { name: date, uv: 0, pv: 0, amt: 0, missingPersons: [] };
            }
            acc[date].uv++;
            acc[date].missingPersons.push(item.user.name + " " + item.user.lastname); // Agregar nombre de la persona que falta
        }

        return acc;
    }, {});

    return Object.values(result);
}

//count by state as 
export function countByStateAs(data) {
    const countByStateAs = {};

    data.forEach(item => {
        const stateAs = item.stateas;

        if (stateAs) {
            countByStateAs[stateAs] = (countByStateAs[stateAs] || 0) + 1;
        }
    });

    const result = Object.entries(countByStateAs).map(([name, value]) => ({ name, value }));

    return result;
}
//DATA FOR BARCHAR 
export function transformDataForBarChart(data, x, values) {
    const groupedData = {};

    data.forEach(item => {
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

    console.log(transformedData);
    return transformedData;
}

