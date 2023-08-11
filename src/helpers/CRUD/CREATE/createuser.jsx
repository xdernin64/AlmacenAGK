import { dbase, dbfirestore } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
//import { getFirestore, doc, setDoc } from "firebase/firestore";
//import { getDatabase, ref, set } from "firebase/database";
import { ref, set } from "firebase/database";

//fun
export const createUserData = async (userData) => {
    //check if exist uid inside user data
    if (!userData.uid) 
    {
        await setDoc(doc(dbfirestore, "users", userData.codigo), userData);
        set(ref(dbase, 'users/' + userData.codigo), userData);
    }
    else
    {
        await setDoc(doc(dbfirestore, "users", userData.uid), userData);
        set(ref(dbase, 'users/' + userData.uid), userData);
    }
    
};
export const CreateAreaData = async (areaData) => {
    await setDoc(doc(dbfirestore, "areas", areaData.areacod), areaData);
    set(ref(dbase, 'areas/' + areaData.areacod), areaData);
};
export const CreateSubareaData = async (subareaData,areacod) => {
    await setDoc(doc(dbfirestore, `areas/${areacod}/subareas/`, subareaData.subareacod), subareaData);
    set(ref(dbase, 'subareas/' + subareaData.subareacod), subareaData);
} 

