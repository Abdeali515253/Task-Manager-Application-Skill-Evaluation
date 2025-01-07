// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHzDlK4zMFMpRBR-8_x5CUlJL_goUzGzc",
    authDomain: "task-manager-skill-evaluation.firebaseapp.com",
    projectId: "task-manager-skill-evaluation",
    storageBucket: "task-manager-skill-evaluation.firebasestorage.app",
    messagingSenderId: "705149604376",
    appId: "1:705149604376:web:9ffa603103fdf23c3de96d",
    measurementId: "G-BZ4PH7KK1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const db = getFirestore(app);
