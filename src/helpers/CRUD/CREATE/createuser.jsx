import app from "../../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

export const createUserData = async (userData) => {
    try {
        // Guardar en Firestore
        const firestore = getFirestore(app);
        const userFirestoreRef = doc(firestore, "usuarios", userData.uid);
        await setDoc(userFirestoreRef, userData);
        console.log("Datos de usuario creados exitosamente en Firestore.");

        // Guardar en Firebase Realtime Database
        const database = getDatabase(app);
        const userDatabaseRef = ref(database, `usuarios/${userData.uid}`);
        await set(userDatabaseRef, userData);
        console.log("Datos de usuario creados exitosamente en Firebase Realtime Database.");
    } catch (error) {
        console.error("Error al crear los datos de usuario:", error);
    }
};
