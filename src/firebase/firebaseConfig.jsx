import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBE92KZnHYNszTcPQAOWsN6f9kPUGB2Vq8",
  authDomain: "luxecart-9f8fa.firebaseapp.com",
  projectId: "luxecart-9f8fa",
  storageBucket: "luxecart-9f8fa.firebasestorage.app",
  messagingSenderId: "222060467066",
  appId: "1:222060467066:web:d540253b1080f5f07d3cc3",
  measurementId: "G-3TJFHEC8SW"
};
  
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
