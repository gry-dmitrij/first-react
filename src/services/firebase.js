import { initializeApp } from "firebase/app";
import {signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1dvPTqcx4ix9al9craqy5flywnWsSz90",
    authDomain: "first-react-2f2ff.firebaseapp.com",
    databaseURL: "https://first-react-2f2ff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "first-react-2f2ff",
    storageBucket: "first-react-2f2ff.appspot.com",
    messagingSenderId: "1015065204936",
    appId: "1:1015065204936:web:c384845f2834ebe3a7adfd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
}

export const login = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
}

export const signOut = async () => {
    await firebaseSignOut(auth);
}
