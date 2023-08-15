import { dbase, dbfirestore } from "../../../firebase";
import { doc, setDoc, where } from "firebase/firestore";
//import { getFirestore, doc, setDoc } from "firebase/firestore";
//import { getDatabase, ref, set } from "firebase/database";
import { ref, set } from "firebase/database";
import { getdata } from "../READ/GetAreasData";

//fun
export const createUserData = async (userData) => {
    try {
        // Promisify the getdata function
        const results = await new Promise((resolve, reject) => {
            getdata(`users`, where('codigo', "==", userData.codigo), (results) => {
                resolve(results);
            });
        });

        console.log(results);

        if (results.length > 0) {
            throw new Error("El usuario ya existe");
        } else {
            if (!userData.uid) {
                await setDoc(doc(dbfirestore, "users", userData.codigo), userData);
                set(ref(dbase, 'users/' + userData.codigo), userData);
            } else {
                await setDoc(doc(dbfirestore, "users", userData.uid), userData);
                set(ref(dbase, 'users/' + userData.uid), userData);
            }
        }
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw new Error("Error, el usuario ya existe");
    }
};

export const CreateAreaData = async (areaData) => {
    await setDoc(doc(dbfirestore, "areas", areaData.areacod), areaData);
    set(ref(dbase, 'areas/' + areaData.areacod), areaData);
};
export const CreateSubareaData = async (subareaData, areacod) => {
    await setDoc(doc(dbfirestore, `areas/${areacod}/subareas/`, subareaData.subareacod), subareaData);
    set(ref(dbase, 'subareas/' + subareaData.subareacod), subareaData);
}

export const createdetailData = async (detailData, detailname, detailcod) => {
    await setDoc(doc(dbfirestore, `details/${detailname}/general/`, detailcod), detailData);
    set(ref(dbase, 'details/' + detailname + '/' + detailcod), detailData);
}