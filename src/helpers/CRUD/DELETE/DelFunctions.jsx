import { remove, ref } from "firebase/database";
import { dbase, dbfirestore } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import swal from "sweetalert";
import { successMessage } from "../../Alerts/alerts";
export const deleteSubareaData = async (areaCode, subareaCode) => {
    try {
        await deleteDoc(doc(dbfirestore, `areas/${areaCode}/subareas/`, subareaCode));
        await remove(ref(dbase, "subareas/" + subareaCode));
        swal("Success!", "Data successfully deleted!", "success");
    } catch (error) {
        console.error("Error deleting data: ", error);
        swal("Error!", "Error deleting data!", "error");
    }
};
//delete departament (SUBAREA IN FIREBASE AND FIRESTORE )
export const deleteAreaData = async (areaCode, subareaList) => {
    try {
        await Promise.all(subareaList.map(async (subarea) => {
            await deleteSubareaData(areaCode, subarea.subareacod);
        }));
        await deleteDoc(doc(dbfirestore, "areas", areaCode));
        await remove(ref(dbase, "areas/" + areaCode));
    } catch (error) {
        console.error("Error deleting data: ", error);
        swal("Error!", "Error deleting data!", "error");
    }
};
export const deleteDetailData = async (detailname, detailcode) => {
    console.log(detailname, detailcode);
    try {
        await deleteDoc(doc(dbfirestore, `details/${detailname}/general`, detailcode));
        await remove(ref(dbase, `details/${detailname}/` + detailcode));
        
    } catch (error) {
        console.error("Error deleting data: ", error);
        swal("Error!", "Error deleting data!", "error");
    }
}
