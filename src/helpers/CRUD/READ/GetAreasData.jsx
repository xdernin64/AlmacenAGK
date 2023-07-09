import { collection, getDocs, query } from "firebase/firestore";
import { dbfirestore } from "../../../firebase";

export const getareasdata = async () => {
    const areas = [];
    const snapshot = await getDocs(collection(dbfirestore, "areas"));
    snapshot.forEach((doc) => {
        areas.push(doc.data());
    });
    return areas;
}
export const getsubareasdata = async (areacod) => {
    const subareas = [];
    const snapshot = await getDocs(collection(dbfirestore, `areas/${areacod}` ));
    snapshot.forEach((doc) => {
        subareas.push(doc.data());
    });
    return subareas;
}
export const getdata = async (rutabd , consulta) => {
    var q = null;
    if (consulta === null)
    {
        q = query(collection(dbfirestore, rutabd));
    }
    else
    {
        q = query(collection(dbfirestore, rutabd), consulta);
    }
    

            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
            return results;
    /*



    
    const areas = [];
    const snapshot = await getDocs(collection(dbfirestore, "areas"));
    snapshot.forEach((doc) => {
        areas.push(doc.data());
    });
    return areas;*/
}