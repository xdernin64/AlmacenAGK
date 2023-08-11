import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { dbfirestore } from "../../../firebase";
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

