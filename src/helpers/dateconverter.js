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

    