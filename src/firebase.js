// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrMRHlCtiiO5KBphlkSuPys7jMSF880o4",
  authDomain: "clima-8ff36.firebaseapp.com",
  projectId: "clima-8ff36",
  storageBucket: "clima-8ff36.appspot.com",
  messagingSenderId: "756547132256",
  appId: "1:756547132256:web:fc79d9f99aeba4b204dc05"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)