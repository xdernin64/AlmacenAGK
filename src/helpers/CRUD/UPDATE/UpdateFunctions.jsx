import { collection, doc, updateDoc, onSnapshot, query , Timestamp  } from "firebase/firestore";
import { child, ref, update } from "firebase/database";
import { dbase, dbfirestore } from "../../../firebase";
export const UpdateAreaData = async (props) => {
    //i want to submit props in firebase firestore and firebase realtime database 
    const dataref = doc(dbfirestore, "areas", props.areacod);
    await updateDoc(dataref, props);
    //now update in realtime database
    const dbRef = ref(dbase);
    await update(child(dbRef, `areas/${props.areacod}`), props);
}
export const UpdateSubareaData = async (props) => {
    //i want to submit props in firebase firestore and firebase realtime database 
    const dataref = doc(dbfirestore, `areas/${props.areacod}/subareas/`, props.subareacod);
    await updateDoc(dataref, props);
    //now update in realtime database
    const dbRef = ref(dbase);
    await update(child(dbRef, `subareas/${props.subareacod}`), props);
}
export const UpdateDetailData = async (props, detailname, detailcod) => {
    //i want to submit props in firebase firestore and firebase realtime database 
    const dataref = doc(dbfirestore, `details/${detailname}/general/`, detailcod);
    await updateDoc(dataref, props);
    //now update in realtime database
    const dbRef = ref(dbase);
    await update(child(dbRef, `details/${detailname}/${detailcod}`), props);
}

export const UpdateUserData = async (props, codigo) => {
    // Convertir las fechas en formato "yyyy-mm-dd" a Timestamp
    
    // Enviar las props actualizadas a Firebase
    const dataref = doc(dbfirestore, "users/", codigo);
    await updateDoc(dataref, props);
    // Ahora actualizar en la base de datos en tiempo real
    const dbRef = ref(dbase);
    await update(child(dbRef, `users/${codigo}`), props);
};

