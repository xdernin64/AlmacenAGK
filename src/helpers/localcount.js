import { useEffect, useState } from "react";

function getNumberOfItemsInLocalStorage(name) {
    const storage = window.localStorage;
    const keys = Object.keys(storage).filter(key => key.startsWith(name));
    let count = 0;

    for (let i = 0; i < keys.length; i++) {
        const value = storage.getItem(keys[i]);
        if (value) {
            const parsedValue = JSON.parse(value);
            if (Array.isArray(parsedValue)) {
                count += parsedValue.length;
            }
        }
    }

    return count;
}

export function useLocalStorageCount(name) {
    const [count, setCount] = useState(getNumberOfItemsInLocalStorage(name));

    useEffect(() => {
        const handleStorageChange = () => {
            setCount(getNumberOfItemsInLocalStorage(name));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [name]);

    return count;
}
export function convertirHorasAMinutos(horainput) {
    const [hora, minutos] = horainput.split(':').map(Number);
    const horaNumerica = hora + minutos / 60;
    return Number(horaNumerica.toFixed(2)); // Redondear a 2 decimales
}

export function calcularJornada(horaInicio, horaFin, jobtime, state) {
    if (state === "ASISTENCIA") {
        if (jobtime === "OFICINA" && convertirHorasAMinutos(horaFin) >= 15.30) {
            return 8;
        } else if (jobtime === "CAMPO" && (convertirHorasAMinutos(horaFin) - convertirHorasAMinutos(horaInicio) >= 8)) {
            return 8;
        } else {
            return Number((convertirHorasAMinutos(horaFin) - convertirHorasAMinutos(horaInicio)).toFixed(2)); // Redondear a 2 decimales
        }
    } if (state === "ASISTENCIA FERIADO") {
        return 0;
    }
}

export function horasextras25(salida, jobtime, state) {
    if(state === "ASISTENCIA") {
    const horas = convertirHorasAMinutos(salida);
    if (jobtime === "OFICINA") {
        if (horas > 15.30) {
            if (horas - 15.30 >= 2) {
                return 2;
            } else {
                return Number((horas - 15.30).toFixed(2)); // Redondear a 2 decimales
            }
        } else {
            return 0;
        }
    } else if (jobtime === "CAMPO") {
        if (horas > 14.75) {
            if (horas - 14.75 >= 2) {
                return 2;
            } else {
                return Number((horas - 14.75).toFixed(2)); // Redondear a 2 decimales
            }
        } else {
            return 0;
        }
    }}
    else {
        return 0;
    }
}

export function horasextras35(salida, jobtime,state) {
    if (state === "ASISTENCIA") {
    const horas = convertirHorasAMinutos(salida);
    if (jobtime === "OFICINA") {
        if (horas > 15.30) {
            if (horas - 15.30 > 2) {
                return Number((horas - 15.30 - 2).toFixed(2)); // Redondear a 2 decimales
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } else if (jobtime === "CAMPO") {
        if (horas > 14.75) {
            if (horas - 14.75 > 2) {
                return Number((horas - 14.75 - 2).toFixed(2)); // Redondear a 2 decimales
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }}
    else {
        return 0;
    }   
}
export const Horasdobles = (salida, state) => {

    const horas = convertirHorasAMinutos(salida);

    if (state === "ASISTENCIA") {
        return 0;
    } else if (state === "ASISTENCIA FERIADO") {
        
        if (horas>=14 && horas<=14.75) {
            return 8;
        }else if (horas >= 6) {
            return 11.25;
        } else if (horas < 14.75) {
            return horas-14.75;
        }}
}
        



// 