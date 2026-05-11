import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Usamos Firestore para los pedidos

const firebaseConfig = {
  apiKey: "AIzaSyAVJ6c7YmhX4CvUrhzveot-jR-9w_1im8A",
  authDomain: "lubriplus-piea.firebaseapp.com",
  projectId: "lubriplus-piea",
  storageBucket: "lubriplus-piea.firebasestorage.app",
  messagingSenderId: "71548385380",
  appId: "1:71548385380:web:8921124188419f33ff0771",
  measurementId: "G-X6Y2NZESG8"
};

// Inicializamos la App
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos 'db' para que Home.jsx pueda usarla
export const db = getFirestore(app);