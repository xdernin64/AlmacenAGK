import { remove ,ref } from "firebase/database";
import { dbase, dbfirestore } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import swal from "sweetalert";
/*
export const CreateSubareaData = async (subareaData, areacod) => {
    await setDoc(doc(dbfirestore, `areas/${areacod}/subareas/`, subareaData.subareacod), subareaData);
    set(ref(dbase, 'subareas/' + subareaData.subareacod), subareaData);
}
export const deletedocument = async (rutabd, id) => {
    await deleteDoc(doc(dbfirestore, rutabd, id));
    delete (ref(dbase, rutabd + '/' + id));
}
*/
export const deleteAreaData = async (areaCode) => {
    try {
        await deleteDoc(doc(dbfirestore, "areas", areaCode));
        await remove(ref(dbase, "areas/" + areaCode));
        swal("Success!", "Data successfully deleted!", "success");
    } catch (error) {
        console.error("Error deleting data: ", error);
        swal("Error!", "Error deleting data!", "error");
    }
};