//function to convert date to string yyyy-mm-dd
export const dateToString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
        day < 10 ? `0${day}` : `${day}`
    }`;
    };
    