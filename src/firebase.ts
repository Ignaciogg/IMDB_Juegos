import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnuQaAvoM_Mx7E9Xg0g4DmuQfzBROhK70",
  authDomain: "imdb-juegos-bdd.firebaseapp.com",
  projectId: "imdb-juegos-bdd",
  storageBucket: "imdb-juegos-bdd.firebasestorage.app", 
  messagingSenderId: "277159907842",
  appId: "1:277159907842:web:11d87eb1b12b2abf160d1b",
  measurementId: "G-79B59C96RW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); 

export { storage };
