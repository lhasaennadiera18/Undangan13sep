import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGZq9geyykgj0x5xG0ENNVov4rx96QD94",
  authDomain: "undangan-lasan-maya.firebaseapp.com",
  projectId: "undangan-lasan-maya",
  storageBucket: "undangan-lasan-maya.firebasestorage.app",
  messagingSenderId: "1078237935420",
  appId: "1:1078237935420:web:639339d8c56ac19a705039",
  measurementId: "G-XQSE3XLK7K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };