export function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
//get day ddd in spanish from string date yyyy-mm-dd
export function getDay(date) {
    console.log(date);
    // Divide la fecha en año, mes y día
    var parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error('El formato de fecha no es válido');
    }

    // Crea un objeto Date a partir de las partes de la fecha
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Los meses en JavaScript son de 0 a 11
    var day = parseInt(parts[2]);
    var inputDate = new Date(year, month, day);

    // Ajusta la zona horaria a la de Perú
    inputDate.setTime(inputDate.getTime() + 5 * 60 * 60 * 1000); // Perú está en UTC-5

    var options = { weekday: 'long' };
    return inputDate.toLocaleDateString('es-PE', options);
}

//get date from yyyy-mm-dd to dd-mmm-yy in spanish
export function getSpanishDate(date) {
    // Divide la fecha en año, mes y día
    var parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error('El formato de fecha no es válido');
    }

    // Crea un objeto Date a partir de las partes de la fecha
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Los meses en JavaScript son de 0 a 11
    var day = parseInt(parts[2]);
    var inputDate = new Date(year, month, day);

    // Ajusta la zona horaria a la de Perú
    inputDate.setTime(inputDate.getTime() + 5 * 60 * 60 * 1000); // Perú está en UTC-5

    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return inputDate.toLocaleDateString('es-ES', options);
}
