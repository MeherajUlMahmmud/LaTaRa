import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore'; 
import {getStorage} from 'firebase/storage'; 

const firebaseConfig = {
  
  apiKey: "AIzaSyD4JgohAduD8VEKdTnOan791_Q6P_gMgE4",
  authDomain: "latara-e28fe.firebaseapp.com",
  projectId: "latara-e28fe",
  storageBucket: "latara-e28fe.appspot.com",
  messagingSenderId: "20730854642",
  appId: "1:20730854642:web:00fd240d9365d4c00e246b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app); 
export default app;