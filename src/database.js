import {getFirestore} from 'firebase/firestore'


import { initializeApp } from "firebase/app";


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
const db =getFirestore(app)
export  default db;
