import { dbfirestore } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const CreateSubareaData = async (subareaData,areacod) => {
    await setDoc(doc(dbfirestore, `areas/${areacod}/subareas/`, subareaData.subareacod), subareaData);
    set(ref(dbase, 'subareas/' + subareaData.subareacod), subareaData);
} 
export const deletedocument = async (rutabd, id) => {
    await deleteDoc(doc(dbfirestore, rutabd, id));
    delete(ref(dbase, rutabd + '/' + id));
}