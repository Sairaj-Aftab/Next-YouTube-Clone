// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAGbW_8J9Rhm1jHrxjfU6q3Z8NTonyEDA",
  authDomain: "full-stack--mern.firebaseapp.com",
  projectId: "full-stack--mern",
  storageBucket: "full-stack--mern.appspot.com",
  messagingSenderId: "247023464519",
  appId: "1:247023464519:web:8f7cc0e1956e2b58890162",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);
