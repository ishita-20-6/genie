import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDqxAh7pdIK-Q9PksGklHPYEi4DYVzBjUU",
    authDomain: "genie-app-f0e8a.firebaseapp.com",
    projectId: "genie-app-f0e8a",
    storageBucket: "genie-app-f0e8a.firebasestorage.app",
    messagingSenderId: "455201711626",
    appId: "1:455201711626:web:74fe4bebe88ed93ffa21f3",
    measurementId: "G-KCLX1GGZBQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
export default app;