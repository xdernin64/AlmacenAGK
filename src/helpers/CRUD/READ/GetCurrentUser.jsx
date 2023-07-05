import { getDatabase, ref, child, get } from "firebase/database";
import { dbase } from "../../../firebase";



export const getcurrentuser = (uid) => {
    const dbRef = ref(dbase);
    return get(child(dbRef, `users/${uid}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error("No data available");
            }
        });
}

