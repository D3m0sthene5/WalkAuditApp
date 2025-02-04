// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvLqDUH09DEGsUqMqI9E16V7P_p4eK14Y",
  authDomain: "walkauditapp.firebaseapp.com",
  projectId: "walkauditapp",
  storageBucket: "walkauditapp.appspot.com",
  messagingSenderId: "334240357340",
  appId: "1:334240357340:web:9caf461ae452d48c5fcd19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
