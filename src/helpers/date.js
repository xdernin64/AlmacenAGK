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
    var day = new Date(date);
    var options = { weekday: 'long' };
    return day.toLocaleDateString('es-ES', options);
}
//get date from yyyy-mm-dd to dd-mmm-yy in spanish
export function getSpanishDate(date) {
    var day = new Date(date);
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return day.toLocaleDateString('es-ES', options);
}