import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore se for usá-lo
import { getAuth } from "firebase/auth"; // Importa Authentication se for usá-lo

const firebaseConfig = {
  apiKey: "AIzaSyDeqOFJbnC9OWQvdk1zHzu5O6J_R6SFdhI",
  authDomain: "bibliotecaanunciar.firebaseapp.com",
  projectId: "bibliotecaanunciar",
  storageBucket: "bibliotecaanunciar.appspot.com",
  messagingSenderId: "1045580809334",
  appId: "1:1045580809334:web:cd0e3d2c83eadfc3b7cb57"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
