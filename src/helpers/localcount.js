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
