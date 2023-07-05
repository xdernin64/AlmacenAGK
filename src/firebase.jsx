// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,signOut } from "firebase/auth";
import { fbapikey, fbappId, fbauthDomain, fbdatabaseURL, fbmessagingSenderId, fbprojectId, fbstorageBucket } from "./constants/env";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(fbapikey, fbauthDomain, fbdatabaseURL, fbprojectId, fbstorageBucket, fbmessagingSenderId, fbappId, fbmessagingSenderId);
const firebaseConfig = {
    apiKey: fbapikey,
    authDomain: fbauthDomain,
    databaseURL: fbdatabaseURL,
    projectId: fbprojectId,
    storageBucket: fbstorageBucket,
    messagingSenderId: fbmessagingSenderId,
    appId: fbappId,
    measurementId: fbmessagingSenderId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Authstate = () => {
    return auth.currentUser;
}
export const dbfirestore = getFirestore(app);
export const dbase = getDatabase();
export const logout = () =>{
    auth.signOut();
}