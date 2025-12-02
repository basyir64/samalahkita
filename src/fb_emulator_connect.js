import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  projectId: "samalahkita-44e68", // REQUIRED for emulator to function
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, "127.0.0.1", 8089);
}

export { db };
