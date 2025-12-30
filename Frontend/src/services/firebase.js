// 1. Saare imports sabse upar honi chahiye
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Upar move kiya
import { getAuth } from "firebase/auth";           // Upar move kiya

// 2. Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNtMyBhWlkm1mBl2s3jgAW3dG9o_VhMGs",
  authDomain: "swachh-sarthi-15547.firebaseapp.com",
  databaseURL: "https://swachh-sarthi-15547-default-rtdb.firebaseio.com",
  projectId: "swachh-sarthi-15547",
  storageBucket: "swachh-sarthi-15547.firebasestorage.app",
  messagingSenderId: "989575521738",
  appId: "1:989575521738:web:daeb667daf4a07dcea1b33",
  measurementId: "G-ZXPYNEL08P"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize and Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);