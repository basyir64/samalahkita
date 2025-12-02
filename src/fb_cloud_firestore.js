import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCNtjQ6Kg4XEom8j6Nblm4kY4EckF_VUUY",
  authDomain: "samalahkita-44e68.firebaseapp.com",
  projectId: "samalahkita-44e68",
  storageBucket: "samalahkita-44e68.firebasestorage.app",
  messagingSenderId: "18041323696",
  appId: "1:18041323696:web:79ec8281b03b3f3cf27b75",
  measurementId: "G-9XFX7CZJPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);