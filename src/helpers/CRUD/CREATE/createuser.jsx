import { dbase } from "../../../firebase";
//import { getFirestore, doc, setDoc } from "firebase/firestore";
//import { getDatabase, ref, set } from "firebase/database";
import { ref, set } from "firebase/database";


export const createUserData = async (userData) => {
    //check if exist uid inside user data
    if (!userData.uid) 
    {
        set(ref(dbase, 'users/' + userData.codigo), userData);
    }
    else
    {
        set(ref(dbase, 'users/' + userData.uid), userData);
    }
    
};
