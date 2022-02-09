// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";

// collection -> Para crear o referenciar una tabla o coleccion de datos
// getFirestore -> Conexion a firestore.
// addDoc -> Para anadir un documento o dato a la talla correspondiente. 
import { getFirestore, collection,
         addDoc, getDocs,
         onSnapshot,deleteDoc,
         doc, getDoc,
         updateDoc
}from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhYoopwUV-Ij3Zc6PjT8f_D0F0ykLWOKs",
  authDomain: "fir-js-crud-7cee8.firebaseapp.com",
  projectId: "fir-js-crud-7cee8",
  storageBucket: "fir-js-crud-7cee8.appspot.com",
  messagingSenderId: "993182314666",
  appId: "1:993182314666:web:b74316b6bf6710dcc320d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Conexion a la base de datos. 
const db = getFirestore();

//Funcion exportada para su consumo en otro archivo
export const saveTask = (title,description)=>{
    //Segundo parametro collection, nombre de coleccion a modificar. 
    addDoc(collection(db,'task'), {title, description})
    // Objeto pasado significa {title:title,description:description}
}

//return implicito
export const getTask = () => getDocs(collection(db,'task')) // Solo pide una vez

//Pide los datos nuevos cada vez que haya. Se llama subcripcion
export const onGetTaks = callback => onSnapshot(collection(db,'task'),callback) 

// Eliminar Datos
export const deleteTask = id => deleteDoc(doc(db,'task',id))

export const getOneTask = id => getDoc(doc(db,'task',id))

// newFields = {title:"algo", description:"algo"}
export const editTask = (id, newFields) => updateDoc(doc(db,'task',id), newFields)