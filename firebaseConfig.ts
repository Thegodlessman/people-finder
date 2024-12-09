// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgmoSvBUxrSx9cavlWGnixRcuszYEh_7s",
    authDomain: "movie-project-moviles.firebaseapp.com",
    projectId: "movie-project-moviles",
    storageBucket: "movie-project-moviles.firebasestorage.app",
    messagingSenderId: "366825920255",
    appId: "1:366825920255:web:638942713cc229facddeca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);