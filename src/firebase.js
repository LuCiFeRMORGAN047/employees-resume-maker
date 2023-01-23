
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1ZnMFlxsM0TbpT-m4LYa0QXAwV_qanAw",
  authDomain: "cv-maker-cd303.firebaseapp.com",
  databaseURL: "https://cv-maker-cd303-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cv-maker-cd303",
  storageBucket: "cv-maker-cd303.appspot.com",
  messagingSenderId: "889130698891",
  appId: "1:889130698891:web:7b692d038a9007120a2c8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


