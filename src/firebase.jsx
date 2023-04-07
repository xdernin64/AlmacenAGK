// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,signOut } from "firebase/auth";
import { fbapikey, fbappId, fbauthDomain, fbdatabaseURL, fbmessagingSenderId, fbprojectId, fbstorageBucket } from "./constants/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const Authstate = () => {
    return auth.currentUser;
}
export const logout = () =>{
    auth.signOut();
}