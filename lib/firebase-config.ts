import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzP6NuOsYizHsDIat-JVgKlXTkjBq31aw",
    authDomain: "renzo-newbie.firebaseapp.com",
    databaseURL: "https://renzo-newbie.firebaseio.com",
    projectId: "renzo-newbie",
    storageBucket: "renzo-newbie.appspot.com",
    messagingSenderId: "430521919096",
    appId: "1:430521919096:web:c672b5e08bbacbcab8af8d"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}