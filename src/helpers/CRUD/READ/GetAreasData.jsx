import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { get , onValue, ref } from "firebase/database";
import { dbase, dbfirestore } from "../../../firebase";
export const getareasdata = async () => {
    const areas = [];
    const snapshot = await onSnapshot(doc(dbfirestore, "areas"));
    snapshot.forEach((doc) => {
        areas.push(doc.data());
    });
    return areas;
}
export const getsubareasdata = async (areacod) => {
    const subareas = [];
    const snapshot = await onSnapshot(doc(dbfirestore, `areas/${areacod}`));
    snapshot.forEach((doc) => {
        subareas.push(doc.data());
    });
    return subareas;
}
export const getdata = (rutabd, consulta, callback) => {
    let q = null;
    if (consulta === null) {
        q = query(collection(dbfirestore, rutabd));
    } else {
        q = query(collection(dbfirestore, rutabd), consulta);
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        callback(results);
    });
    return unsubscribe;
};
export const getdatarealtimedatabase = (rutabd, callback) => {
    const starCountRef = ref(dbase, rutabd);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
        }));
        callback(dataArray);
    });
};
export const getonedatarealtimedatabase = (rutabd, id, callback) => {
    const starCountRef = ref(dbase, rutabd);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const dataArray = Object.keys(data)
            .filter((key) => key === id)
            .map((key) => ({
                id: key,
                ...data[key],
            }));
        callback(dataArray);
    });
};


