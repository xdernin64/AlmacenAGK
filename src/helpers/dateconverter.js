//function to convert date to string yyyy-mm-dd
export const dateToString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
        day < 10 ? `0${day}` : `${day}`
    }`;
    };
    // Function to convert yyyy-mm-dd to dd/mm/yy
    export const convertDateFormat = (dateString) => {
        if (!dateString) {
            return "Sin Registro";
        }

        const [year, month, day] = dateString.split('-');
        const formattedDate = `${day}/${month}/${year.slice(-2)}`;
        return formattedDate;
    };
    export function excelDateToJSDate(serial) {
        var utc_days  = Math.floor(serial - 25569);
        var utc_value = utc_days * 86400;                                        
        var date_info = new Date(utc_value * 1000);
    
        var year = date_info.getUTCFullYear();
        var month = date_info.getUTCMonth() + 1; // Los meses en JavaScript comienzan desde 0
        var day = date_info.getUTCDate();
    
        // Asegurarse de que el mes y el día siempre tengan dos dígitos
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
    
        return year + '-' + month + '-' + day;
    }
    export function decimalToTime(decimal) {
        var hours = Math.floor(decimal * 24);
        var minutes = Math.floor((decimal * 24 - hours) * 60);
        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    }